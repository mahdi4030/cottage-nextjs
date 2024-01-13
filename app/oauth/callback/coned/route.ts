// import { createError, sendError } from "h3";
import serverConfig from "@/server/config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/db";

export async function POST(request: Request) {
    // const config = useRuntimeConfig();
    const body = await request.json();
    const user = body.user;
    const greenButton = body.greenButton;
    const electricCompany = body.electricCompany;
    const serviceKey = electricCompany !== "" ? electricCompany : cookies().get("electricCompany");
    const HEADERS = {
        "ocp-apim-subscription-key": serverConfig[serviceKey].SUBSCRIPTION_KEY,
    };
    const authRequestBody = {
        grantType: "authorization_code",
        clientId: serverConfig[serviceKey].CLIENT_ID,
        clientSecret: serverConfig[serviceKey].CLIENT_SECRET,
        authCode: body.code,
        redirectUri: process.env.SITE_URL + "/oauth/coned/handback",
    };
    let authToken;
    try {
        authToken = await (await fetch(serverConfig[serviceKey].GBC_URL + "/oauth/v1/Token", {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(authRequestBody),
        })).json();
    } catch (err) {
        console.error(err);
        return NextResponse.json({
            statusMessage: "Could not fetch the Auth Token from Con Ed GBC URL",
            data: { extra: { cookies, ...body, ...user } },
        }, { status: 404 })
        // sendError(
        // 	event,
        // 	createError({
        // 		statusMessage: "Could not fetch the Auth Token from Con Ed GBC URL",
        // 		data: { extra: { cookies, ...body, ...user } },
        // 	}),
        // );
    }
    const subscriptionID = authToken.resourceURI.substring(authToken.resourceURI.lastIndexOf("/") + 1);
    const startDate = greenButton.startDate !== "" ? greenButton.startDate : cookies().get("greenButtonStartDate");
    const endDate = greenButton.endDate !== "" ? greenButton.endDate : cookies().get("greenButtonEndDate");
    const oauthData = {
        provider: serviceKey,
        accessToken: authToken.access_token,
        refreshToken: authToken.refresh_token,
        // id: user.id,
        cottageUserID: user.id,
        scopes: authToken.scope,
        subscriptionID,
        startDate,
        endDate,
    };
    // let oauthData = {
    //   provider: "Con Edison",
    //   accessToken: "<ACCESS_TOKEN> UPDATED AGAIN!!!",
    //   refreshToken: "<REFRESH_TOKEN>",
    //   id: user.id,
    //   scopes: "<SCOPE>",
    //   subscriptionID: "<SUBSCRIPTION_ID>",
    //   startDate: greenButton.startDate,
    //   endDate: greenButton.endDate,
    // };
    const supabase = createServerActionClient<Database>({cookies: cookies});
    const { data, error } = await supabase.from("GreenButtonOAuth").insert(oauthData).select();
    if (error) {
        console.error(error);
        return NextResponse.json({
            statusMessage: "Failed connection to Supabase and could not fetch initial docs",
            data: { extra: { cookies, body } },
        }, {status: 404});
        // sendError(
        //     event,
        //     createError({
        //         statusMessage: "Failed connection to Supabase and could not fetch initial docs",
        //         data: { extra: { cookies, body } },
        //     }),
        // );
    }
    // return { accessToken: "<ACCESS_TOKEN>", subscriptionID: "<SUBSCRIPTION_ID" };
    return NextResponse.json({ accessToken: authToken.access_token, subscriptionID });
};
