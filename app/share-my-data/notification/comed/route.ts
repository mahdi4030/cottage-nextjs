import { NextResponse } from "next/server";
import { greenButtonAdmin } from "@/utils/greenButtonIntegration/admin";
import { parseBulkRequest } from "@/utils/greenButtonIntegration/parsers";

export async function POST(request: Request) {
	// TODO: secure this endpoint, like restrict the IP addresses or check headers
	const provider = "COMED";

	// const supabase = serverSupabaseServiceRole(event);
	const body = await request.json();
	return NextResponse.json({ data: "OK!!" });
};
