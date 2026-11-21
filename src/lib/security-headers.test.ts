import { describe, expect, it } from "vitest";
import headersFile from "../../public/_headers?raw";
import { SECURITY_HEADERS } from "./security-headers";

/** _headers から指定したパスパターンのヘッダーを取り出す */
const parseHeadersFile = (pattern: string): Record<string, string> => {
	const headers: Record<string, string> = {};
	let inBlock = false;
	for (const line of headersFile.split("\n")) {
		if (line.trim() === "") continue;
		if (!line.startsWith(" ")) {
			inBlock = line.trim() === pattern;
			continue;
		}
		if (!inBlock) continue;
		const index = line.indexOf(":");
		headers[line.slice(0, index).trim()] = line.slice(index + 1).trim();
	}
	return headers;
};

describe("SECURITY_HEADERS", () => {
	it("public/_headers の /* と一致する", () => {
		expect(parseHeadersFile("/*")).toEqual(SECURITY_HEADERS);
	});
});
