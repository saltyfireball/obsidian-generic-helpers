import { App, PluginSettingTab, Setting } from "obsidian";
import type GenericHelpersPlugin from "./main";

export class GenericHelpersSettingTab extends PluginSettingTab {
	plugin: GenericHelpersPlugin;

	constructor(app: App, plugin: GenericHelpersPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl).setName("About").setHeading();
		const aboutDesc = containerEl.createEl("div", {
			cls: "setting-item-description",
		});
		aboutDesc.createEl("p", {
			text:
				"A grab-bag of small commands that don't justify their own dedicated plugin. " +
				"Each helper is added as a command in the command palette and can be bound to a hotkey under Settings > Hotkeys.",
		});

		new Setting(containerEl).setName("Available helpers").setHeading();

		new Setting(containerEl)
			.setName("Decrease heading")
			.setDesc(
				"Removes one '#' from the heading on the current line (or every line in the selection). " +
				"Walks ### -> ## -> # -> plain text. Lines that are not headings are left alone.",
			);

		new Setting(containerEl)
			.setName("Increase heading")
			.setDesc(
				"Adds one '#' to the start of the current line (or every line in the selection). " +
				"Walks plain text -> # -> ## -> ### up to ###### (Markdown's deepest level). " +
				"Lines already at level 6 are left alone.",
			);

		new Setting(containerEl)
			.setName("Copy link to heading")
			.setDesc(
				"Copies an Obsidian wikilink to the heading the cursor is currently under, formatted as " +
				"[[path/to/note#Heading|note]]. If the cursor's line ends with a block id (^abc), the link " +
				"targets that block instead of the nearest heading. Falls back to a plain note link when " +
				"no heading or block is found.",
			);

		new Setting(containerEl).setName("How to use").setHeading();
		const howDesc = containerEl.createEl("div", {
			cls: "setting-item-description",
		});

		const list = howDesc.createEl("ol");
		list.createEl("li", {
			text: "Place the cursor on a line, or select multiple lines.",
		});
		list.createEl("li", {
			text: 'Open the command palette (Ctrl/Cmd+P) and run "Decrease heading" or "Increase heading".',
		});
		list.createEl("li", {
			text: "Optionally bind a hotkey for either command in the hotkeys tab of settings.",
		});

		howDesc.createEl("p", {
			text:
				"When a selection spans multiple lines, the command applies to every line that has a heading prefix " +
				"(or every line if increasing). Non-heading lines are skipped by Decrease, and gain a '# ' prefix when using Increase.",
		});
	}
}
