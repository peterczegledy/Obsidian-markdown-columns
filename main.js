'use strict';

var obsidian = require('obsidian');

class MarkdownColumnsPlugin extends obsidian.Plugin {
    async onload() {
        this.registerMarkdownCodeBlockProcessor("columns", async (source, el, ctx) => {
            const columns = source.split(":::")
                .map(x => x.trim())
                .filter(x => x.length > 0);
            const container = el.createDiv({
                cls: "markdown-columns-container"
            });
            for (let i = 0; i < columns.length; i++) {
                const column = container.createDiv({
                    cls: "markdown-column"
                });
                await obsidian.MarkdownRenderer.render(this.app, columns[i], column, ctx.sourcePath, new obsidian.Component());
            }
        });
    }
    onunload() {
    }
}

module.exports = MarkdownColumnsPlugin;
