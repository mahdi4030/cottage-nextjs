// import { send, createError, sendError } from "h3";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const supabase = createServerActionClient<Database>({ cookies: cookies });
    const body = await request.json();
    const { provider, userId, accountNumber } = body;

    const baseUrl = process.env.UTILITY_CONNECT_URL;
    const apiKey = process.env.PRIVATE_API_SECRET_KEY;

    const url = `${baseUrl}/${provider}/get-account-billing-summaries`;
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                userId,
                accountNumber,
            }),
        });
        if (res.status === 200) {
            const bills = await res.json();

            const { data: occupancyRecord, error: occupancyError } = await supabase
                .from("Occupancy")
                .select("electricAccountID(id)")
                .eq("cottageUserID", userId)
                .is("isActive", true)
                .maybeSingle();
            if (occupancyError) {
                return NextResponse.json({
                    statusMessage: "Fetching occupancy error",
                    message: occupancyError.message,
                }, {status: 404});
                // sendError(
                //     event,
                //     createError({
                //         statusMessage: "Fetching occupancy error",
                //         message: occupancyError.message,
                //     }),
                // );
            }

            const billsArray = bills.map((bill) => {
                const endDate = new Date(bill.readDate);
                const formattedEndDate = endDate.toISOString().split("T")[0];
                const startDate = new Date(endDate);
                startDate.setDate(startDate.getDate() - bill.numDays);
                const formattedStartDate = startDate.toISOString().split("T")[0];
                const amount = bill.totalCharge * 100;
                return {
                    electricAccountID: occupancyRecord.electricAccountID.id,
                    totalAmountDue: amount,
                    totalUsage: bill.usage,
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                    // electricInvoice: 1,
                };
            });

            const { error: upsertError } = await supabase.from("ElectricBill").upsert(billsArray, { onConflict: "electricAccountID, startDate" });
            if (upsertError) {
                return NextResponse.json({
                    statusMessage: "Postgres Upsert Error  - Failed to sync to DB with error " + upsertError.message,
                    // message: upsertError.message,
                }, {status: 202});
                // sendError(
                //     event,
                //     createError({
                //         statusMessage: "Postgres Upsert Error  - Failed to sync to DB with error " + upsertError.message,
                //         // message: upsertError.message,
                //     }),
                // );
            }
            return NextResponse.json({}, {status: 202});
            // event.node.res.statusCode = 202;
            // event.node.res.end();
        } else {
            return NextResponse.json({
                statusMessage: "Failed"
            }, {status: 404})
            // sendError(
            //     event,
            //     createError({
            //         statusMessage: "Failed",
            //     }),
            // );
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error });
    }
};
