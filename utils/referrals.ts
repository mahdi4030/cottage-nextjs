// import crypto from "crypto";
import { customAlphabet } from "nanoid";

/**
 * Generates a cryptographically secure, 4 character alphanumeric (all uppercase string)
 * @returns string: the random referral string
 */
export function generateReferralString(): string {
	const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 5);
	return nanoid();
	//   return crypto.webcrypto.getRandomValues(new Uint32Array(1))[0].toString(36).substring(1, 5);
}
