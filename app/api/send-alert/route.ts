// import { createError, sendError } from "h3";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	// const config = useRuntimeConfig();
	const body = await request.json();
	const { message, channel } = body;

	const baseUrl = process.env.UTILITY_CONNECT_URL;
	const apiKey = process.env.PRIVATE_API_SECRET_KEY;

	const url = `${baseUrl}/utils/slack/notify`;

	try {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				secret: apiKey,
				message,
				channel,
			}),
		});
		if (res.status === 200) {
			// return await res.json();
            return NextResponse.json(await res.json());
		} else {
            return NextResponse.json({statusMessage: "Failed to send alert to channel."}, {status: 404})
			// sendError(
			// 	event,
			// 	createError({
			// 		statusMessage: "Failed to send alert to channel.",
			// 	}),
			// );
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error });
	}
};
