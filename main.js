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
            for (const columnText of columns) {
                const column = container.createDiv({
                    cls: "markdown-column"
                });
                const component = new obsidian.MarkdownRenderChild(column);
                await obsidian.MarkdownRenderer.render(this.app, columnText, column, ctx.sourcePath, component);
                ctx.addChild(component);
            }
        });
    }
    onunload() {
    }
}

module.exports = MarkdownColumnsPlugin;
