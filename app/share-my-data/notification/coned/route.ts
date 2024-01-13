import { Database } from "@/types/db";
import { greenButtonAdmin } from "@/utils/greenButtonIntegration/admin";
import { parseBulkRequest } from "@/utils/greenButtonIntegration/parsers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST (request: Request) {
	// TODO: secure this endpoint, like restrict the IP addresses or check headers
	const provider = "CON_EDISON";

	const supabase = createServerActionClient<Database>({cookies: cookies});
	const body = await request.json();
	const urls = await parseBulkRequest(body);
	const { data } = await supabase
		.from("GreenButtonBulkDownload")
		.insert(
			urls.map((url) => ({
				provider,
				url,
				status: "PENDING",
			})),
		)
		.throwOnError();

	// attempt to parse realtime data
	const greenButton = await greenButtonAdmin({ supabase, provider });
	for (const url of urls) {
		await greenButton.downloadAndSaveBulkData(url);
	}
	// return data;
    return NextResponse.json(data);
};
