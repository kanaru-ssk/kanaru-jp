import { describe, expect, it } from "vitest";
import { getDiffYear } from "./date";

describe("getDiffYear", () => {
	const start = new Date("2021-02");

	it.each([
		["2021-02-01", 0],
		["2022-01-31", 0],
		["2022-02-01", 1],
		["2026-01-31", 4],
		["2026-02-01", 5],
		["2026-11-21", 5],
	])("%s → %i", (date, years) => {
		expect(getDiffYear(start, new Date(date))).toBe(years);
	});
});
