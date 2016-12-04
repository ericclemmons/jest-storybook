export default function stripIndent(string) {
	const match = string.match(/^[ \t]*(?=\S)/gm);

	if (!match) {
		return string;
	}

	const indent = Math.min(...match.map((x) => x.length));
	const re = new RegExp(`^[ \\t]{${indent}}`, "gm");

	const leftAligned = indent > 0 ? string.replace(re, "") : string;

	return leftAligned.trimLeft().trimRight();
}
