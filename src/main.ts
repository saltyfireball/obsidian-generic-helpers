import { MarkdownView, Plugin } from "obsidian";
import { copyHeadingLink } from "./copy-heading-link";
import { applyHeadingChange } from "./heading";
import { GenericHelpersSettingTab } from "./settings-tab";
import { DEFAULT_SETTINGS, GenericHelpersSettings } from "./types";

export default class GenericHelpersPlugin extends Plugin {
	settings!: GenericHelpersSettings;

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: "decrease-heading",
			name: "Decrease heading",
			editorCallback: (editor) => {
				applyHeadingChange(editor, "decrease");
			},
		});

		this.addCommand({
			id: "increase-heading",
			name: "Increase heading",
			editorCallback: (editor) => {
				applyHeadingChange(editor, "increase");
			},
		});

		this.addCommand({
			id: "copy-link-to-heading",
			name: "Copy link to heading",
			checkCallback: (checking) => {
				const view = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (!view || !view.file) return false;
				if (!checking) void copyHeadingLink(view);
				return true;
			},
		});

		this.addSettingTab(new GenericHelpersSettingTab(this.app, this));
	}

	async loadSettings() {
		const data = (await this.loadData()) as Partial<GenericHelpersSettings> | null;
		this.settings = { ...DEFAULT_SETTINGS, ...(data ?? {}) };
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
