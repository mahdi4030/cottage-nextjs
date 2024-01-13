import { SupabaseClient } from "@supabase/supabase-js";
import { ServerConfig } from "@/server/config";
import { greenButtonHandlers } from "./parsers";

export async function greenButtonAdmin({ supabase, provider }: { supabase: SupabaseClient; provider: keyof ServerConfig }) {
	const { getClientAccessToken, handleBulkRequestDownload } = greenButtonHandlers(provider);
	const accessToken = await getClientAccessToken();

	const downloadAndSaveBulkData = async (url: string) => {
		try {
			const entries = await handleBulkRequestDownload({
				url,
				accessToken,
			});
			const { data: rows } = await supabase
				.from("GreenButtonMeterReadings")
				.select("GreenButtonOAuth (electricAccountID (propertyID (id)))")
				.in(
					"meterReadingId",
					entries.map((entry) => entry.meterReadingId),
				)
				.throwOnError();
			const parsedEntries = entries
				.flatMap((entry) => {
					const propertyID: number = rows.find((row) => row.meterReadingId === entry.meterReadingId)?.GreenButtonOAuth?.electricAccountID
						?.propertyID?.id;
					if (!propertyID) {
						return null;
					}
					return entry.data.map((intervalBlock) => ({
						reading: Math.round(intervalBlock.value * 1000), // converted to int
						readingAt: intervalBlock.timestamp,
						duration: intervalBlock.duration,
						propertyID: propertyID,
					}));
				})
				.filter(Boolean);
			await supabase
				.from("MeterReadings")
				.upsert(parsedEntries, {
					ignoreDuplicates: true,
					onConflict: "unit,readingAt",
					returning: "minimal",
				})
				.throwOnError();
			await supabase
				.from("GreenButtonBulkDownload")
				.update({
					status: "DONE",
				})
				.eq("url", url)
				.throwOnError();
			return parsedEntries.length;
		} catch (err) {
			await supabase
				.from("GreenButtonBulkDownload")
				.update({
					status: "FAILED",
					message: err.message,
				})
				.eq("url", url)
				.throwOnError();
			throw err;
		}
	};

	return {
		downloadAndSaveBulkData,
	};
}
