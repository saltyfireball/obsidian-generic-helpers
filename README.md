# Generic Helpers

An [Obsidian](https://obsidian.md) plugin that collects small, useful commands that don't justify their own dedicated plugin. The current build adds increase/decrease heading commands; more helpers will be added over time.

## Features

- **Decrease heading** -- removes one `#` from the heading on the current line (or every line in the selection). `### Foo` -> `## Foo` -> `# Foo` -> `Foo`. Non-heading lines are left alone.
- **Increase heading** -- adds one `#` to the start of the line. `Foo` -> `# Foo` -> `## Foo` -> `### Foo`, capped at `######` (Markdown's maximum heading depth).
- **Copy link to heading** -- copies an Obsidian wikilink to the heading (or block id) the cursor is under, formatted as `[[path/to/note#Heading|note]]`. If the cursor's line ends with a `^block-id`, the link targets that block instead of the nearest heading.
- Works on the cursor's line by default; the heading commands also operate on the full selection when one is active.
- Lightweight with no external dependencies.

## How to Use

1. Place the cursor on a line, or select multiple lines.
2. Open the command palette (Ctrl/Cmd+P) and run **Decrease heading**, **Increase heading**, or **Copy link to heading**.
3. Optional: bind hotkeys for these commands under **Settings > Hotkeys**.

When a selection spans multiple lines, the heading commands run against every line in the selection. **Decrease heading** skips non-heading lines; **Increase heading** turns non-heading lines into level-1 headings.

**Copy link to heading** walks upward from the cursor to the nearest heading and copies a wikilink in the form `[[path/to/note#Heading|note]]` to the clipboard. If the cursor's line ends with `^block-id`, the link targets that block instead.

## Installation

### Obsidian Community Plugin (pending)

This plugin has been submitted for review to the Obsidian community plugin directory. Once approved, you will be able to install it directly from **Settings > Community plugins > Browse** by searching for "Generic Helpers".

### Using BRAT

You can install this plugin right now using the [BRAT](https://github.com/TfTHacker/obsidian42-brat) plugin:

1. Install BRAT from **Settings > Community plugins > Browse** (search for "BRAT" by TfTHacker)
2. Open the BRAT settings
3. Under the **Beta plugins** section, click **Add beta plugin**

   ![BRAT beta plugin list](assets/brat_example_beta_plugin_list.png)

4. In the overlay, enter this plugin's repository: `https://github.com/saltyfireball/obsidian-generic-helpers` (or just `saltyfireball/obsidian-generic-helpers`)

   ![BRAT add beta plugin](assets/brat_example_beta_modal.png)

5. Leave the version set to latest

   ![BRAT beta plugin filled](assets/brat_example_beta_modal_filled.png)

6. Click **Add plugin**

### Manual

1. Download the latest release from the [Releases](https://github.com/saltyfireball/obsidian-generic-helpers/releases) page
2. Copy `main.js` and `manifest.json` into your vault's `.obsidian/plugins/sfb-generic-helpers/` directory
3. Enable the plugin in **Settings > Community plugins**

## Settings

The plugin currently has no user-configurable settings. The settings tab lists each available helper and shows a short description of what it does so you can find them quickly without leaving Obsidian.

## License

[MIT](LICENSE)
