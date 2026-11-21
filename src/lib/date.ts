export function getDiffYear(before: Date, after: Date) {
	const diffMs = after.getTime() - before.getTime();
	return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));
}
