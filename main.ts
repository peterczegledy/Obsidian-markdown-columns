import {
    Plugin,
    MarkdownPostProcessorContext,
    MarkdownRenderer,
    Component
} from "obsidian";


export default class MarkdownColumnsPlugin extends Plugin {
    async onload() {
        this.registerMarkdownCodeBlockProcessor(
            "columns",
            async (
                source: string,
                el: HTMLElement,
                ctx: MarkdownPostProcessorContext
            ) => {

                const columns =
                    source.split(":::")
                    .map(x => x.trim())
                    .filter(x => x.length > 0);

                const container =
                    el.createDiv({
                        cls: "markdown-columns-container"
                    });

                for (let i = 0; i < columns.length; i++) {
                    const column =
                        container.createDiv({
                            cls: "markdown-column"
                        });
                    await MarkdownRenderer.render(
                        this.app,
                        columns[i],
                        column,
                        ctx.sourcePath,
                        new Component()
                    );
                }
            }
        );
    }

    onunload() {

    }
}