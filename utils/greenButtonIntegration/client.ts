import { SupabaseClient } from "@supabase/supabase-js";
import { greenButtonHandlers } from "./parsers";
import { withGreenButtonSyncLogger } from "./helpers";
import { ServerConfig } from "@/server/config";
import { ElectricAccountFor, ElectricStatus } from "@/types/enums";

export async function greenButtonClient({
	supabase,
	greenButtonOAuthId,
	subscriptionId,
	refreshToken,
	provider,
}: {
	supabase: SupabaseClient;
	greenButtonOAuthId: number;
	subscriptionId: string;
	refreshToken: string;
	provider: keyof ServerConfig;
}) {
	const { getAccessToken, getRetailCustomerData, getHistoricUsageData, getBillingSummaries, getUsagePoints, getMeterReading } =
		greenButtonHandlers(provider);
	const accessToken = await getAccessToken({ subscriptionId, refreshToken });

	const syncCustomerData = async (userId: string) => {
		return await withGreenButtonSyncLogger(
			{
				greenButtonOAuthId,
				supabase,
				operation: "customer data",
			},
			async () => {
				const customerData = await getRetailCustomerData({
					accessToken,
					subscriptionId,
				});

				const { data: accountData } = await supabase
					.from("ElectricAccount")
					.select("id, accountNumber")
					.match({
						cottageUserID: userId,
						electricCompanyID: provider,
					})
					.limit(1)
					.throwOnError()
					.maybeSingle();

				if (accountData) {
					// update
					await supabase
						.from("ElectricAccount")
						.update({
							accountNumber: customerData.accountNumber,
							isActive: true,
							status: ElectricStatus.ACTIVE,
							isAccountLinkedWithUtility: true,
						})
						.eq("cottageUserID", userId)
						.throwOnError();

					await supabase
						.from("GreenButtonOAuth")
						.update({
							electricAccountID: accountData.id,
						})
						.eq("id", greenButtonOAuthId)
						.throwOnError();
				} else {
					const { data: newRow } = await supabase
						.from("ElectricAccount")
						.insert({
							electricCompanyID: provider,
							cottageUserID: userId,
							accountNumber: customerData.accountNumber,
							isActive: true,
							status: ElectricStatus.ACTIVE,
							isAccountLinkedWithUtility: true,
						})
						.throwOnError()
						.select()
						.single();
					await supabase
						.from("GreenButtonOAuth")
						.update({
							electricAccountID: newRow.id,
						})
						.eq("id", greenButtonOAuthId)
						.throwOnError();
				}
				return customerData;
			},
		);
	};

	const syncBillingSummaries = async (initOptions?: { usagePointId?: string; startDate?: Date | string; endDate?: Date | string }) => {
		const { usagePointId, startDate, endDate } = initOptions || {};
		const startOfDay = new Date();
		startOfDay.setHours(0, 0, 0, 0);
		const sixMonthsAgo = new Date(startOfDay);
		sixMonthsAgo.setMonth(startOfDay.getMonth() - 6);

		let publishedMin = sixMonthsAgo;
		if (startDate) {
			publishedMin = new Date(startDate);
		}
		let publishedMax = startOfDay;
		if (endDate) {
			publishedMax = new Date(endDate);
		}

		return await withGreenButtonSyncLogger(
			{
				greenButtonOAuthId,
				supabase,
				operation: "billing summaries",
				description: `${publishedMin.toISOString().split("T")[0]} to ${publishedMax.toISOString().split("T")[0]}`,
			},
			async () => {
				let { data: meterReadings } = await supabase.from("GreenButtonMeterReading").select("*").match({ greenButtonOAuthId }).throwOnError();
				if (!meterReadings?.length) {
					meterReadings = await syncMeterReadings();
				}

				if (usagePointId) {
					meterReadings = meterReadings.filter((meterReading) => meterReading.usagePointId === usagePointId);
					if (!meterReadings.length) {
						throw new Error(`Usage point ${usagePointId} does not exist on your account`);
					}
				}

				const { data: electricAccountData } = await supabase
					.from("GreenButtonOAuth")
					.select(
						`
        *,
        ElectricAccount!inner(
					id
				)
        `,
					)
					.match({
						id: greenButtonOAuthId,
						"ElectricAccount.isActive": true,
					})
					.throwOnError()
					.limit(1)
					.maybeSingle();

				const electricAccountId = electricAccountData?.ElectricAccount?.[0]?.id;
				if (!electricAccountId) {
					throw new Error("User does not have an active electric account");
				}

				const billingSummaries = await Promise.all(
					meterReadings.map(async (meterReading) => {
						const billingSummaries = await getBillingSummaries({
							accessToken,
							subscriptionId,
							usagePointId: meterReading.usagePointId,
							publishedMin,
							publishedMax,
						});
						return await Promise.all(
							billingSummaries.map(async (billingSummary) => {
								const { data: matched } = await supabase
									.from("ElectricBill")
									.select("id")
									.match({
										electricAccountID: electricAccountId,
										startDate: billingSummary.startDate.toISOString(),
										endDate: billingSummary.endDate.toISOString(),
									})
									.throwOnError()
									.maybeSingle();
								if (!matched) {
									await supabase
										.from("ElectricBill")
										.insert({
											electricAccountID: electricAccountId,
											totalAmountDue: billingSummary.billedAmount,
											totalUsage: billingSummary.consumption,
											startDate: billingSummary.startDate,
											endDate: billingSummary.endDate,
											isPartial: false,
										})
										.throwOnError();
								}
								return billingSummary;
							}),
						);
					}),
				);
				return billingSummaries;
			},
		);
	};

	const syncMeterReadings = async () => {
		return await withGreenButtonSyncLogger(
			{
				greenButtonOAuthId,
				supabase,
				operation: "meter readings",
			},
			async () => {
				const usagePoints = await getUsagePoints({
					accessToken,
					subscriptionId,
				});

				const meterReadings = await Promise.all(
					usagePoints.map(async ({ usagePointId, serviceCategoryKind }) => {
						const meterReadingId = await getMeterReading({
							subscriptionId,
							accessToken,
							usagePointId,
						});
						const { data: existing } = await supabase
							.from("GreenButtonMeterReading")
							.select("*")
							.match({
								greenButtonOAuthId,
								meterReadingId,
							})
							.throwOnError()
							.maybeSingle();
						if (!existing) {
							const { data } = await supabase
								.from("GreenButtonMeterReading")
								.insert({
									greenButtonOAuthId,
									usagePointId,
									meterReadingId,
									serviceCategoryKind,
								})
								.throwOnError()
								.select()
								.single();
							return data;
						} else {
							return existing;
						}
					}),
				);
				return meterReadings;
			},
		);
	};

	const syncHistoricData = async ({
		usagePointId,
		meterReadingId,
		serviceCategoryKind = 0,
	}: {
		usagePointId: string;
		meterReadingId: string;
		serviceCategoryKind?: number;
	}) => {
		let tableName = "";
		if (serviceCategoryKind === 0) {
			tableName = "MeterReadings";
		} else if (serviceCategoryKind === 1) {
			tableName = "GasMeterReadings";
		} else {
			throw new Error(`Unsupported service category kind ${serviceCategoryKind}`);
		}

		const { data } = await supabase
			.from("GreenButtonOAuth")
			.select("electricAccountID (propertyID (id))")
			.eq("id", greenButtonOAuthId)
			.throwOnError()
			.maybeSingle();

		const propertyID = data?.electricAccountID?.propertyID?.id;
		if (!propertyID) {
			throw new Error("Account is not linked to a propertyID");
		}

		// 1 year ago
		const startDate = new Date();
		startDate.setUTCFullYear(startDate.getUTCFullYear() - 1);
		const endDate = new Date();
		endDate.setDate(endDate.getDate() - 2); // 2 days ago
		return await withGreenButtonSyncLogger(
			{
				greenButtonOAuthId,
				supabase,
				operation: "historic data",
				description: `${startDate.toISOString().split("T")[0]} - ${endDate.toISOString().split("T")[0]}`,
			},
			async () => {
				const publishedMin = startDate;
				let done = false;
				const promises: Promise<any>[] = [];
				while (!done) {
					let publishedMax = new Date(publishedMin);
					// 15-day date range
					publishedMax.setDate(publishedMax.getDate() + 15);
					if (publishedMax >= endDate) {
						// round down max to end date
						publishedMax = endDate;
						done = true;
					}
					// non blocking
					promises.push(
						getHistoricUsageData({
							accessToken,
							usagePointId,
							subscriptionId,
							meterReadingId,
							publishedMin: new Date(publishedMin), // ensure new object
							publishedMax: new Date(publishedMax),
						}).then(async (historicData) => {
							const entries = historicData.map((intervalBlock) => ({
								property: propertyID,
								duration: intervalBlock.duration,
								reading: Math.round(intervalBlock.value * 1000),
								readingAt: intervalBlock.timestamp,
							}));
							await supabase
								.from(tableName)
								.upsert(entries, {
									ignoreDuplicates: true,
									onConflict: "property,readingAt",
								})
								.throwOnError();
						}),
					);
					// next timeframe - plus 16 days
					publishedMin.setDate(publishedMin.getDate() + 16);
					// wait 1s before starting next req
					await new Promise((resolve) => setTimeout(() => resolve(true), 1000));
				}
				await Promise.all(promises);
			},
		);
	};

	return {
		syncCustomerData,
		syncMeterReadings,
		syncBillingSummaries,
		syncHistoricData,
	};
}
