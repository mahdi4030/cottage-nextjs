import { Database } from "@/types/db";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request, {params}: {params: {userID: string}}) {
	const userID = params.userID;
	try {
        const supabase = createServerActionClient<Database>({cookies: cookies});
		const { data, error: referral_error } = await supabase.rpc("get_referrals", { userid: userID });
		if (referral_error) throw referral_error;
        return NextResponse.json(data);
	} catch (referral_error) {
        return NextResponse.json({ referral_error });
	}
};
