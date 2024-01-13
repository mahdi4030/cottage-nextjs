import { Database } from "@/types/db";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request, {params}: {params: {referrerCode: string}}) {
	const referrerCode = params.referrerCode;

	try {
        const supabase = createServerActionClient<Database>({cookies: cookies});
		const { data, error } = await supabase.from("Resident").select("id, firstName").eq("referralCode", referrerCode).limit(1).single();
		if (error) {
			// return sendError(event, createError({ statusMessage: "No user found" }));
            return NextResponse.json({ statusMessage: "No user found" }, {
                status: 404
            });
		}
        return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ error });
	}
};
