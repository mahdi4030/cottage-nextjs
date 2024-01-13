// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
	const body = await request.json();

	const { name, email, address } = body;

	try {
		const customer = await stripe.customers.create({
			name,
			email,
		});
		return NextResponse.json({ customer });
	} catch (error) {
        return NextResponse.json({ error });
	}
};
