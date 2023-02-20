import moment from "moment";
/**
 * Styles for discord message timestamps.
 */
export enum TimestampStyle {
	NONE = "",
	RELATIVE = "r",
}
/**
 * converts a timestamp data to an discord supported timestamp
 *
 * @param {number} ts The timestamp to convert.
 * @param {TimestampStyle} style Style of the timestamp.
 * @returns {string} The timestamp that was created.
 */
export function toUNIXTimestamp(ts: number, style: TimestampStyle = TimestampStyle.NONE): string {
	if (style === TimestampStyle.NONE) return `<t:${ts.toString().substring(0, 10)}>`;
	return `<t:${ts.toString().substring(0, 10)}:${style}>`;
}
/**
 * Converts a date object to readable string using moment.
 *
 * @param {Date} date The date to convert.
 * @returns {string} The newly created date string
 */
export function formatDate(date: Date): string {
	return moment(date).format("dddd, MMMM Do YYYY, h:mm a");
}
