/** 年と月だけで比べた満年数（日は無視する） */
export function getDiffYear(before: Date, after: Date) {
	const months =
		(after.getUTCFullYear() - before.getUTCFullYear()) * 12 +
		(after.getUTCMonth() - before.getUTCMonth());
	return Math.floor(months / 12);
}
