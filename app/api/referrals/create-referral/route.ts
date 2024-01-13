import { Database } from "@/types/db";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const body = await request.json();
	const { referrerCode, userID } = body;

	try {
		const supabase = createServerActionClient<Database>({cookies: cookies});
		const { data: referralPartner, error: referralError } = await supabase
			.from("CottageUsers")
			.select("id")
			.eq("referralCode", referrerCode)
			.maybeSingle();
		if (referralError) {
			console.error(referralError);
			// return sendError(event, createError({ statusMessage: "No referral user found" }));
            return NextResponse.json({ statusMessage: "No referral user found" }, {
                status: 404
            });
		}
		if (referralPartner) {
			const referralData = {
				referredBy: referralPartner.id,
				referred: userID,
				referralStatus: "pending",
			};
			const { data, error } = await supabase.from("Referrals").insert(referralData);
			if (error) {
				console.error("Error inserting referral:", error.message);
				// return sendError(event, createError({ statusMessage: error.message }));
                return NextResponse.json({ statusMessage: error.message }, {
                    status: 404
                })
			} else {
				console.error("Referral inserted successfully:", data);
				// send success response using h3
                return NextResponse.json({ data: "Referral created successfully" });
			}
		}
        return NextResponse.json({ statusMessage: "No referral user found" }, {
            status: 404
        });
	} catch (error) {
        return NextResponse.json({ error });
	}
};
