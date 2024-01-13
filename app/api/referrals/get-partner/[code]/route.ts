import { Database } from "@/types/db";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request, {params}: {params: {code: string}}) {
	const code = params.code;

	try {
        const supabase = createServerActionClient<Database>({cookies: cookies});
		const { data, error } = await supabase
			.from("ReferralPartner")
			.select("id, name, imgURL, CottageUsers ! id (id, referralCode)")
			.eq("code", code)
			.maybeSingle();
		if (error) {
			console.error(error);
			// return sendError(event, createError({ statusMessage: "No partner found" }));
            // return NextResponse.
            return NextResponse.json({
                statusMessage: "No partner found"
            }, {
                status: 404
            })
		}
		if (data) {
            return NextResponse.json({
				name: data.name,
				imgURL: data.imgURL,
				referralCode: data.CottageUsers?.referralCode,
			})
		}
		return null;
	} catch (error) {
        return NextResponse.json({ error })
	}
};
