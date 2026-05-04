import type { Editor, MarkdownView } from "obsidian";
import { Notice } from "obsidian";

const HEADING_RE = /^(#{1,6})\s+(.*\S)\s*$/;
const BLOCK_ID_RE = /\^([A-Za-z0-9-]+)\s*$/;

export interface HeadingLinkTarget {
	type: "heading" | "block";
	value: string;
}

/**
 * Find the link target for a cursor position.
 *
 * If the cursor's line ends with a `^block-id`, use that.
 * Otherwise walk upward to find the nearest heading and use its text
 * (preserving any inline markdown like `**bold**`).
 */
export function findLinkTarget(editor: Editor, cursorLine: number): HeadingLinkTarget | null {
	const currentLine = editor.getLine(cursorLine);
	const blockMatch = BLOCK_ID_RE.exec(currentLine);
	if (blockMatch) {
		return { type: "block", value: blockMatch[1] };
	}

	for (let line = cursorLine; line >= 0; line--) {
		const text = editor.getLine(line);
		const headingMatch = HEADING_RE.exec(text);
		if (headingMatch) {
			return { type: "heading", value: headingMatch[2] };
		}
	}

	return null;
}

export function buildLink(filePath: string, basename: string, target: HeadingLinkTarget | null): string {
	const pathWithoutExt = filePath.replace(/\.md$/i, "");
	if (!target) {
		return `[[${pathWithoutExt}|${basename}]]`;
	}
	const fragment = target.type === "block" ? `^${target.value}` : target.value;
	return `[[${pathWithoutExt}#${fragment}|${basename}]]`;
}

export async function copyHeadingLink(view: MarkdownView): Promise<void> {
	const file = view.file;
	if (!file) {
		new Notice("No file associated with the active view.");
		return;
	}

	const editor = view.editor;
	const cursor = editor.getCursor();
	const target = findLinkTarget(editor, cursor.line);
	const link = buildLink(file.path, file.basename, target);

	try {
		await navigator.clipboard.writeText(link);
		const label = target
			? target.type === "block"
				? `block ^${target.value}`
				: `heading "${target.value}"`
			: "file";
		new Notice(`Copied link to ${label}`);
	} catch (e: unknown) {
		const msg = e instanceof Error ? e.message : "clipboard write failed";
		new Notice(`Could not copy link: ${msg}`);
	}
}
