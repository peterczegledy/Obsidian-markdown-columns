import {
    Plugin,
    MarkdownPostProcessorContext,
    MarkdownRenderer,
    MarkdownRenderChild
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

                for (const columnText of columns) {
                    const column =
                        container.createDiv({
                            cls: "markdown-column"
                        });

                    const component = new MarkdownRenderChild(column);

                    await MarkdownRenderer.render(
                        this.app,
                        columnText,
                        column,
                        ctx.sourcePath,
                        component
                    );

                    ctx.addChild(component);
                }
            }
        );
    }

    onunload() {

    }
}