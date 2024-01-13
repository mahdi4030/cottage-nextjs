export function validateEmail(email: string): boolean {
	const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	if (email.match(mailFormat)) {
		return true;
	} else {
		return false;
	}
}

export function validateCardNumber(number: string): boolean {
	const regex = new RegExp("^[0-9]{16}$");
	if (!regex.test(number)) return false;
	return luhnCheck(number);
}

// Checksum algorithm - validates that the card is a valid card and no misinputs
function luhnCheck(val: string): boolean {
	let sum = 0;
	for (let i = 0; i < val.length; i++) {
		let intVal = parseInt(val.substring(i, 1));
		if (i % 2 == 0) {
			intVal *= 2;
			if (intVal > 9) {
				intVal = 1 + (intVal % 10);
			}
		}
		sum += intVal;
	}
	return sum % 10 == 0;
}
