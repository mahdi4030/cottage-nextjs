import serverConfig from "@/server/config";
import { XMLParser } from "fast-xml-parser";
// import fetch from "node-fetch";

async function parseXml(value: string) {
	const parser = new XMLParser({
		ignoreAttributes: false,
		numberParseOptions: {
			leadingZeros: false, // don't parse leading zeroes (for postal codes)
			hex: false,
		},
	});
	return parser.parse(value);
}

function ensureArray<T>(obj: T | T[]) {
	// xml parser turns lists with 1 item into objs instead of arrays
	if (!obj) {
		return [];
	}
	if (Array.isArray(obj)) {
		return obj;
	}
	return [obj];
}

function formatEntries(json: any) {
	const entries = ensureArray(json?.feed?.entry);
	if (!entries?.length) {
		throw new Error("Invalid data - no entries");
	}
	return entries;
}

export async function parseBulkRequest(body: string) {
	const parsedBody = await parseXml(body);
	const entries = formatEntries(parsedBody);
	const urls = entries.map((entry) => entry?.content?.["espi:batchList"]?.["espi:resources"] as string).filter(Boolean);
	return urls;
}

export function greenButtonHandlers(provider: keyof typeof serverConfig) {
	const providerConfig = serverConfig[provider];
	const headers = {
		"ocp-apim-subscription-key": providerConfig.SUBSCRIPTION_KEY,
	};
	const baseUrl = providerConfig.GBC_URL;
	const clientId = providerConfig.CLIENT_ID;
	const clientSecret = providerConfig.CLIENT_SECRET;

	async function getAccessToken(options: { subscriptionId: string; refreshToken: string }) {
		const authRes: any = await fetch(`${baseUrl}/oauth/v1/Token`, {
			method: "POST",
			headers: {
				...headers,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				grantType: "refresh_token",
				clientId: providerConfig.CLIENT_ID,
				clientSecret: providerConfig.CLIENT_SECRET,
				...options,
			}),
		}).then((res) => res.json());

		const accessToken: string = authRes.access_token;
		if (!accessToken) {
			throw new Error("Invalid credentials - no access token");
		}

		return accessToken;
	}

	async function getClientAccessToken() {
		const authRes: any = await fetch(`${baseUrl}/oauth/v1/Token`, {
			method: "POST",
			headers: {
				...headers,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				grantType: "client_credentials",
				clientId,
				clientSecret,
				Scope: "FB=3_35_47",
			}),
		}).then((res) => res.json());

		const accessToken: string = authRes.access_token;
		if (!accessToken) {
			throw new Error("Invalid credentials - no access token");
		}

		return accessToken;
	}
	async function getRetailCustomerData(options: { accessToken: string; subscriptionId: string }) {
		const entries = await fetch(`${baseUrl}/resource/Customer/${options.subscriptionId}`, {
			headers: {
				...headers,
				Authorization: `Bearer ${options.accessToken}`,
			},
		})
			.then((res) => res.text())
			.then(parseXml)
			.then(formatEntries);

		// multiple entries but same content
		const content = entries?.[0]?.content;
		const customerData = content?.["cust:retailCustomer"];
		if (typeof customerData !== "object") {
			throw new Error("Invalid data - no customer data");
		}
		const mainAddress = customerData["cust:mainAddress"];
		const cleanData = {
			accountNumber: customerData["cust:accountNumber"]?.toString(),
			addressStreet: mainAddress?.["cust:streetDetail"],
			addressCity: mainAddress?.["cust:cityDetail"],
			addressState: mainAddress?.["cust:stateDetail"],
			addressPostalCode: mainAddress?.["cust:postalCode"]?.toString(),
		};
		if (!cleanData.accountNumber) {
			throw new Error("Account number missing");
		}

		return cleanData;
	}

	async function getUsagePoints(options: { accessToken: string; subscriptionId: string }) {
		const entries = await fetch(`${baseUrl}/resource/Subscription/${options.subscriptionId}/UsagePoint`, {
			headers: {
				...headers,
				Authorization: `Bearer ${options.accessToken}`,
			},
		})
			.then((res) => res.text())
			.then(parseXml)
			.then(formatEntries);

		type UsagePoint = { usagePointId: string; serviceCategoryKind: number };
		const usagePoints: UsagePoint[] = [];
		for (const entry of entries) {
			const link = (entry?.link?.[1]?.["@_href"] as string) || "";
			const usagePointId = link.match(/UsagePoint\/(\d*)$/)?.[1];
			if (typeof usagePointId !== "string") {
				continue;
			}
			const serviceCategoryKind = entry?.content?.["espi:usagePoint"]?.["espi:ServiceCategory"]?.["espi:kind"];
			if (typeof serviceCategoryKind !== "number") {
				continue;
			}
			if (![0, 1].includes(serviceCategoryKind)) {
				// 0 = electricity, 1 = gas
				continue;
			}
			usagePoints.push({
				usagePointId,
				serviceCategoryKind,
			});
		}

		if (!usagePoints.length) {
			throw new Error("No usage points found");
		}

		return usagePoints;
	}

	async function getMeterReading(options: { accessToken: string; subscriptionId: string; usagePointId: string }) {
		const entries = await fetch(`${baseUrl}/resource/Subscription/${options.subscriptionId}/UsagePoint/${options.usagePointId}/MeterReading`, {
			headers: {
				...headers,
				Authorization: `Bearer ${options.accessToken}`,
			},
		})
			.then((res) => res.text())
			.then(parseXml)
			.then(formatEntries);
		const entry = entries[0];

		if (!entry) {
			throw new Error("Invalid data - entry for meter reading");
		}
		const meterReadingLink: string = entry?.link?.[1]?.["@_href"];
		const meterReadingId = meterReadingLink?.match(/MeterReading\/(.*)$/)?.[1];
		if (!meterReadingId) {
			throw new Error("Invalid meter reading link format");
		}

		return meterReadingId;
	}

	async function handleBulkRequestDownload(options: { url: string; accessToken: string }) {
		const entries = await fetch(options.url, {
			headers: {
				...headers,
				Authorization: `Bearer ${options.accessToken}`,
			},
		})
			.then((res) => res.text())
			.then(parseXml)
			.then(formatEntries);
		const intervalBlocks: {
			meterReadingId: string;
			data: ReturnType<typeof parseIntervalBlocks>;
		}[] = [];

		let entryCounter = 0;
		for (const entry of entries) {
			if (entry.title["#text"] !== "Interval Block Data") {
				console.error("invalid bulk request - only interval blocks supported");
				continue;
			}
			const meterReadingId = entry?.link?.[1]?.["@_href"]?.match(/MeterReading\/(.*?)\//)?.[1] as string;
			if (!meterReadingId) {
				continue;
			}
			entryCounter += 1;
			if (entryCounter % 2 === 1) {
				// only 2nd, 4th, ... entries are kwh
				continue;
			}
			intervalBlocks.push({
				meterReadingId,
				data: parseIntervalBlocks(entry),
			});
		}
		return intervalBlocks;
	}

	function parseIntervalBlocks(entry: any) {
		const intervalBlocks: any[] = ensureArray(entry?.content?.["espi:intervalBlocks"]?.["espi:intervalBlock"]);

		const data: {
			timestamp: Date;
			duration: number;
			value: number;
		}[] = [];
		for (const intervalBlock of intervalBlocks) {
			const intervals = ensureArray(intervalBlock?.["espi:intervalReading"]);
			for (const interval of intervals) {
				data.push({
					timestamp: new Date(interval["espi:timePeriod"]["espi:start"] * 1000),
					duration: interval["espi:timePeriod"]["espi:duration"],
					value: interval["espi:value"],
				});
			}
		}
		return data;
	}

	// NOTE: data limit of around ~22 days?
	async function getHistoricUsageData(options: {
		accessToken: string;
		subscriptionId: string;
		usagePointId: string;
		meterReadingId: string;
		publishedMin: Date;
		publishedMax: Date;
	}) {
		const publishedMin = options.publishedMin.toISOString().split("T")[0];
		const publishedMax = options.publishedMax.toISOString().split("T")[0];
		const entries = await fetch(
			`${baseUrl}/resource/Subscription/${options.subscriptionId}/UsagePoint/${options.usagePointId}/MeterReading/${options.meterReadingId}/IntervalBlock?publishedMin=${publishedMin}&publishedMax=${publishedMax}`,
			{
				headers: {
					...headers,
					Authorization: `Bearer ${options.accessToken}`,
				},
			},
		)
			.then((res) => res.text())
			.then(parseXml)
			.then(formatEntries);
		const entry = entries[1]; // 1st item is KVARH, 2nd is KWH
		return parseIntervalBlocks(entry);
	}

	async function getRealTimeUsageData(options: { accessToken: string; subscriptionId: string; usagePointId: string; meterReadingId: string }) {
		// TODO: empty with current test dataset
		const entries = await fetch(
			`${baseUrl}/resource/RealTime/Subscription/${options.subscriptionId}/UsagePoint/${options.usagePointId}/MeterReading/${options.meterReadingId}/IntervalBlock`,
			{
				headers: {
					...headers,
					Authorization: `Bearer ${options.accessToken}`,
				},
			},
		)
			.then((res) => res.text())
			.then(parseXml)
			.then(formatEntries);
		const entry = entries[1]; // 1st item is KVARH, 2nd is KWH
		return parseIntervalBlocks(entry);
	}

	async function getBillingSummaries(options: {
		accessToken: string;
		subscriptionId: string;
		usagePointId: string;
		publishedMin: Date;
		publishedMax: Date;
	}) {
		const publishedMin = options.publishedMin.toISOString().split("T")[0];
		const publishedMax = options.publishedMax.toISOString().split("T")[0];
		const entries = await fetch(
			`${baseUrl}/resource/Subscription/${options.subscriptionId}/UsagePoint/${options.usagePointId}/ElectricPowerUsageSummary?publishedMin=${publishedMin}&publishedMax=${publishedMax}`,
			{
				headers: {
					...headers,
					Authorization: `Bearer ${options.accessToken}`,
				},
			},
		)
			.then((res) => res.text())
			.then(parseXml)
			.then(formatEntries);

		return entries.map((entry) => {
			const usageSummary = entry?.content?.["espi:UsageSummary"];
			if (!usageSummary) {
				throw new Error("No usage summary found");
			}
			return {
				billingSummaryId: entry.link?.[1]?.["@_href"]?.match(/electricPowerUsageSummaryId=(.*)$/)?.[1] as string,
				startDate: new Date(usageSummary["espi:billingPeriod"]["espi:start"] * 1000),
				endDate: new Date(usageSummary["espi:billToDate"]),
				statusTimestamp: new Date(usageSummary["espi:statusTimeStamp"]),
				consumption: (usageSummary["espi:electricConsumption"] || 0) as number,
				billedAmount: (usageSummary["espi:electricBilledAmount"] || 0) as number,
				currency: (usageSummary["espi:currency"] || 0) as number,
				serviceClass: usageSummary["espi:serviceClass"]?.toString() as string,
				qualityOfReading: (usageSummary["espi:qualityOfReading"] || 0) as number,
				icapTag: (usageSummary["espi:ICAPtag"] || 0) as number,
			};
		});
	}

	return {
		getAccessToken,
		getClientAccessToken,
		getRetailCustomerData,
		getUsagePoints,
		getMeterReading,
		getBillingSummaries,
		getRealTimeUsageData,
		getHistoricUsageData,
		handleBulkRequestDownload,
	};
}
