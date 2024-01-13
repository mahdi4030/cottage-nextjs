import { Database } from "@/types/db";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
// import { createError, sendError } from "h3";
import { cookies } from "next/headers";
import serverConfig from "@/server/config";
import { ElectricStatus } from "@/types/enums";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const body = await request.json();
	const user = body.user;
	const greenButton = body.greenButton;
	const electricCompany = body.electricCompany;

	const supabase = createServerActionClient<Database>({ cookies: cookies });
	const serviceKey = electricCompany !== "" ? electricCompany : cookies().get("electricCompany");

	const authRequestBodyDetails = {
		grant_type: "authorization_code",
		code: body.code,
		redirect_uri: process.env.SITE_URL + "/oauth/comed/handback",
	};

	const bodyContent = Object.keys(authRequestBodyDetails)
		.map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(authRequestBodyDetails[key]))
		.join("&");
	let authToken;
	try {
		authToken = await (await fetch(serverConfig[serviceKey].GBC_URL + "/authorization/oauth/gbc/auth-token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
				Authorization: serverConfig[serviceKey].AUTHORIZATION,
			},
			body: bodyContent,
		})).json();
	} catch (err) {
		return NextResponse.json({
			statusMessage: "Could not fetch the Auth Token from Con Ed GBC URL",
			data: { extra: { cookies, ...body, ...user } },
		}, { status: 404 });
		// sendError(
		// 	event,
		// 	createError({
		// 		statusMessage: "Could not fetch the Auth Token from Con Ed GBC URL",
		// 		data: { extra: { cookies, ...body, ...user } },
		// 	}),
		// );
	}

	const { data: accountData } = await supabase
		.from("ElectricAccount")
		.select("id, accountNumber")
		.match({
			cottageUserID: user.id,
			electricCompanyID: serviceKey,
		})
		.limit(1)
		.throwOnError()
		.maybeSingle();

	if (accountData) {
		// update
		await supabase
			.from("ElectricAccount")
			.update({
				status: ElectricStatus.ACTIVE,
				isAccountLinkedWithUtility: true,
			})
			.eq("cottageUserID", user.id)
			.throwOnError();
	}

	const subscriptionID = authToken.resourceURI.substring(authToken.resourceURI.lastIndexOf("/") + 1);
	const oauthData = {
		provider: serviceKey,
		accessToken: authToken.access_token,
		refreshToken: authToken.refresh_token,
		// id: user.id,
		cottageUserID: user.id,
		scopes: authToken.scope,
		subscriptionID,
		electricAccountID: accountData.id,
	};

	const { data, error } = await supabase.from("GreenButtonOAuth").insert(oauthData);
	if (error) {
		console.error(error);
		return NextResponse.json({
			statusMessage: "Failed connection to Supabase and could not fetch initial docs",
			data: { extra: { cookies, body } },
		}, {status: 404});
		// sendError(
		// 	event,
		// 	createError({
		// 		statusMessage: "Failed connection to Supabase and could not fetch initial docs",
		// 		data: { extra: { cookies, body } },
		// 	}),
		// );
	}

	// return { accessToken: "<ACCESS_TOKEN>", subscriptionID: "<SUBSCRIPTION_ID" };
	return NextResponse.json({ accessToken: authToken.access_token, subscriptionID });
};
