import { MailerSend, EmailParams, Recipient } from "mailersend";
import templates from "@/server/config/mailersend-templates.json";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const body = await request.json();
	const { data, to, template } = body;

	const mailerSend = new MailerSend({
		apiKey: process.env.MAILER_SEND_API_KEY,
	});

	const recipients = [new Recipient(to.email, to.name)];
	const bcc = [new Recipient(to.BCC, to.BCCName)];

	const personalization = [
		{
			email: to.email,
			data: body.data,
		},
	];

	const emailParams = new EmailParams().setTemplateId(templates[template]).setBcc(bcc).setTo(recipients).setPersonalization(personalization);

	try {
		const res = await mailerSend.email.send(emailParams);
        return NextResponse.json(res.body);
	} catch (error) {
		console.error("ERROR SENDING EMAIL", error);
		return NextResponse.json({ error });
	}
};
