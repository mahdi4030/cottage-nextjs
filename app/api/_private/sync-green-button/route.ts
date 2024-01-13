import { NextResponse } from 'next/server'
import { greenButtonClient } from "@/utils/greenButtonIntegration/client";
import { getGreenButtonOAuthFromEvent } from "@/utils/greenButtonIntegration/helpers";
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/db';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    const body = await request.json();
	// const body = await readBody<{
	// 	provider: keyof ServerConfig;
	// 	operations: string[];
	// 	secret?: string;
	// 	greenButtonOAuthId?: number;
	// 	subscriptionId?: string;
	// 	refreshToken?: string;
	// 	userId?: string;
	// }>(event);

	if (body.secret !== (process.env.PRIVATE_API_SECRET_KEY || "SECRET")) {
		if (body.secret) {
			throw new Error("Invalid secret key");
		}
		// fallback to user if no secret
		const { data, error } = await getGreenButtonOAuthFromEvent(request, body.provider, cookies);
		if (error) {
			throw error;
		}
		if (data) {
			body.greenButtonOAuthId = data.greenButtonOAuthId;
			body.userId = data.userId;
			body.subscriptionId = data.subscriptionId;
			body.refreshToken = data.refreshToken;
		}
	}

	// const supabase = serverSupabaseServiceRole(event);
    const supabase = createServerActionClient<Database>({cookies: cookies});

	const { greenButtonOAuthId, userId, refreshToken, subscriptionId, operations, provider } = body;

	const greenButton = await greenButtonClient({
		supabase,
		subscriptionId,
		refreshToken,
		greenButtonOAuthId,
		provider,
	});
	if (operations.includes("meter readings")) {
		await greenButton.syncMeterReadings();
	}
	if (operations.includes("customer data")) {
		await greenButton.syncCustomerData(userId);
	}
	if (operations.includes("billing summaries")) {
		await greenButton.syncBillingSummaries();
	}
	if (operations.includes("historic data")) {
        const supabase = createServerActionClient<Database>({ cookies })
		const { data: meterReadings } = await supabase
			.from("GreenButtonMeterReading")
			.select("*")
			.eq("greenButtonOAuthId", greenButtonOAuthId)
			.throwOnError();
		for (const { meterReadingId, usagePointId, serviceCategoryKind } of meterReadings) {
			await greenButton.syncHistoricData({
				meterReadingId,
				usagePointId,
				serviceCategoryKind,
			});
		}
	}
    return NextResponse.json("OK");
};
