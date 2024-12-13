import { visit } from 'unist-util-visit';
//@ts-expect-error
import { h } from 'hastscript';

export function RehypeFigurePlugin(option: Record<string, any>) {
  const className = (option && option.className) || "rehype-figure"

  function buildFigure({ properties }: any) {
    const figure = h("figure", { class: className }, [
      h("img", { ...properties }),
      properties.alt && properties.alt.trim().length > 0
        ? h("figcaption", properties.alt)
        : "",
    ])
    return figure
  }

  return function (tree: any) {
    visit(tree, { tagName: "p" }, (node, index) => {
      const images = node.children
        .filter((child: any) => child.tagName === "img")
        .map((img: any) => buildFigure(img))
      if (images.length === 0) return
      console.log(JSON.stringify(images));
      tree.children[index!] =
        images.length === 1
          ? images[0]
          : h(
              "div",
              { class: `${className}-container` },
              images
            )
    })
  }
}
