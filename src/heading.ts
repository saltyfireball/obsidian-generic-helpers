import type { Editor, EditorPosition } from "obsidian";
import { MAX_HEADING_LEVEL } from "./types";

export type HeadingDirection = "increase" | "decrease";

const HEADING_PREFIX_RE = /^(#{1,6})(\s+)/;

export function transformHeadingLine(line: string, direction: HeadingDirection): string {
	const match = HEADING_PREFIX_RE.exec(line);

	if (direction === "increase") {
		if (!match) {
			if (line.length === 0) return "# ";
			return `# ${line}`;
		}
		const hashes = match[1];
		const level = hashes.length;
		if (level >= MAX_HEADING_LEVEL) return line;
		return `#${line}`;
	}

	// decrease
	if (!match) return line;
	const hashes = match[1];
	const spacing = match[2];
	const level = hashes.length;
	const rest = line.slice(hashes.length + spacing.length);
	if (level <= 1) return rest;
	return line.slice(1);
}

export function applyHeadingChange(editor: Editor, direction: HeadingDirection): void {
	const selections = editor.listSelections();
	if (selections.length === 0) return;

	for (const sel of selections) {
		const startLine = Math.min(sel.anchor.line, sel.head.line);
		const endLine = Math.max(sel.anchor.line, sel.head.line);

		for (let line = startLine; line <= endLine; line++) {
			const original = editor.getLine(line);
			const updated = transformHeadingLine(original, direction);
			if (updated === original) continue;

			const from: EditorPosition = { line, ch: 0 };
			const to: EditorPosition = { line, ch: original.length };
			editor.replaceRange(updated, from, to);
		}
	}
}
