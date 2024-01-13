import moment from "moment-timezone";

moment.tz.setDefault("America/New_York");

export function parseToMoment(occupancy) {
	occupancy.endDate = moment(occupancy.endDate, "YYYY-MM-DD");
	occupancy.startDate = moment(occupancy.startDate, "YYYY-MM-DD");
	return occupancy;
}

// Trims the occupancy dates to ensure that it does not exceed the start and end dates specified in the params
// i.e. for an occunpancy starting from January 1 and ending February 30, if start is January 5 and end is March 4,
// the dates will be trimmed to January 5 to February 30. For contiuning occupancies, i.e. the end date is null,
// the end date for that occupancy will be the end date supplied in the args.
export function trimDates(occupancy, start: moment.Moment, end: moment.Moment) {
	// Operates under the assumption that bills can have an ending that is null for continuing occupancies
	occupancy.endDate = occupancy.endDate > end || !occupancy.endDate.isValid() ? end : occupancy.endDate;
	occupancy.startDate = occupancy.startDate < start ? start : occupancy.startDate;
	return occupancy;
}

// Get the span between the start and end dates of an occupancy.
export function getDuration(occupancy) {
	occupancy.coveredDates = Math.abs(occupancy.startDate.diff(occupancy.endDate, "days"));
	return occupancy;
}

export function listOccupancyGaps(occupancies, start: moment.Moment, end: moment.Moment): OccupancyGap[] {
	const gaps: OccupancyGap[] = [] as OccupancyGap[];

	// Get gaps before the start of the occupancies and the start of the billing period
	const sortedArray = occupancies.sort((a, b) => a.startDate.valueOf() - b.startDate.valueOf());

	if (start < sortedArray[0].startDate) {
		gaps.push({
			start: start,
			end: sortedArray[0].startDate.subtract(1, "d"),
		} as OccupancyGap);
	}

	// Get gaps between occupancies
	for (let i = 1; i < sortedArray.length; i++) {
		if (sortedArray[i - 1].endDate < sortedArray[i].startDate.subtract(1, "d")) {
			gaps.push({
				start: sortedArray[i - 1].endDate.add(1, "d"),
				end: sortedArray[i].startDate.subtract(1, "d"),
			} as OccupancyGap);
		}
	}

	// Get gaps past the tail end of the occupancies and the end of the billing period
	if (end > sortedArray[sortedArray.length - 1].endDate) {
		gaps.push({
			start: sortedArray[sortedArray.length - 1].endDate.add(1, "d"),
			end: end,
		} as OccupancyGap);
	}

	return gaps;
}

export function fillOccupancyGaps(gaps: OccupancyGap[], propertyOwner: string, unit: number) {
	// Stub - fills in gaps in occupancy with the property owner and their information
}

type OccupancyGap = {
	start: moment.Moment;
	end: moment.Moment;
};
