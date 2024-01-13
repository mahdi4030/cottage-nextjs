/**
 * Converts a valid Date String to the month and year display format
 * i.e. 2022-10-11 becomes October 2022
 * @param dateString
 * @returns
 */
export function monthAndYear(dateString: string): string | void {
	const date = new Date(dateString);
	if (date.toString() !== "Invalid Date") {
		return date.toLocaleString("default", {
			month: "short",
			year: "numeric",
		});
	}
}

export function dayAndMonthAndYear(dateString: string): string | void {
	const date = new Date(dateString.replace(/-/g, "/"));
	if (date.toString() !== "Invalid Date") {
		return date.toLocaleString("default", {
			day: "numeric",
			month: "short",
			year: "numeric",
		});
	}
}
