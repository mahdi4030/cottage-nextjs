import { Database } from "@/types/db";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import moment from "moment-timezone";
import { cookies } from "next/headers";

import { fillOccupancyGaps, getDuration, parseToMoment, trimDates } from "@/utils/occupancy";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const body = await request.json();
	const {
		utilityElectricAccount,
		totalAmountDue,
		totalUsage,
		startDate,
		endDate,
		supplyDetails,
		deliveryDetails,
		supplyTotal,
		deliveryTotal,
		taxesAndFeesTotal,
	} = body;

	const splitElectricBills = [];

	const billStart = moment(startDate, "YYYY-MM-DD", true);
	const billEnd = moment(endDate, "YYYY-MM-DD", true);
	const billCoverage = Math.abs(billStart.diff(billEnd, "days"));
	let unoccupiedDates = 0;

	try {
		// if any of the following fields are null
		if ([utilityElectricAccount, totalAmountDue, totalUsage, startDate, endDate].some((x) => !x)) {
			throw "missing parameters";
		}

		const supabase = createServerActionClient<Database>({ cookies: cookies });

		const { data: electricAccounts } = await supabase.from("ElectricAccount").select("id").eq("utilityElectricAccount", utilityElectricAccount);

		const electricAccountIds = electricAccounts.map((x) => x.id);

		const { data: utilityElectricBill, error: rawBillInsertError } = await supabase
			.from("UtilityElectricBill")
			.insert({
				rawElectricBill: body,
				UtilityElectricAccount: utilityElectricAccount,
			})
			.select()
			.limit(1)
			.single();

		if (rawBillInsertError) throw rawBillInsertError;

		let { data: occupancies } = await supabase
			.from("Occupancy")
			.select(
				`
        *,
        Unit (
          *,
          Building (
            *
          )
        )
      `,
			)
			.in("electricAccount", electricAccountIds)
			.or(`endDate.gte.${startDate},endDate.is.null`)
			.lte("startDate", endDate);

		occupancies = occupancies.map((x) => getDuration(trimDates(parseToMoment(x), billStart, billEnd)));

		const totalCoveredDates = occupancies.reduce((total, x) => {
			return total + x.coveredDates;
		}, 0);

		unoccupiedDates = billCoverage - totalCoveredDates;

		for (const occupancy of occupancies) {
			const ratio = occupancy.coveredDates / totalCoveredDates;
			splitElectricBills.push({
				electricAccount: occupancy.electricAccount,
				totalAmountDue: Math.ceil(totalAmountDue * ratio),
				totalUsage: Math.ceil(totalUsage * ratio),
				startDate: occupancy.startDate,
				endDate: occupancy.endDate,
				isPartial: occupancies.length > 1,
				splittingMethod: "datePercentage",
				rawBill: utilityElectricBill.id,
				userID: occupancy.occupant,
			});
		}

		const { data: insertedBills, error: insertError } = await supabase.from("ElectricBill").insert(splitElectricBills);

		if (insertError) throw insertError;

		// calculate bill entries and how to insert them
		return NextResponse.json(insertedBills);
	} catch (error) {
		return NextResponse.json({ error });
	}
});
