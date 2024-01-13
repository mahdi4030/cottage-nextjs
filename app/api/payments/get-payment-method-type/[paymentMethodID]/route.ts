// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request: Request, {params}: {params: {paymentMethodID: string}}) {
	const paymentMethodID = params.paymentMethodID;

	try {
		const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodID);
		const { type } = paymentMethod;
        return NextResponse.json(type);
	} catch (error) {
        return NextResponse.json({ error });
	}
};
