import type { Element } from "@astrojs/starlight/expressive-code/hast";

import { visit } from 'unist-util-visit';
import { h } from 'hastscript';


export function RehypeFigurePlugin(options: Record<string, any>) {
	return (tree: any) => {
		// unwrap the images inside the paragraph
		visit(tree, { tagName: "p" }, (node, index, parent) => {
			if (!hasOnlyImages(node)) {
				return;
			}

			parent.children.splice(index, 1, ...node.children);

			return index;
		});

		// wrap images in figure
		visit(tree, (node) => isImageWithAlt(node as Element), (node, index, parent) => {
			if (isImageWithCaption(parent) || isImageLink(parent)) {
				return;
			}

			const figure = createFigure(node, options);

			node.tagName = figure.tagName;
			node.children = figure.children;
			node.properties = figure.properties;
		});
	};
}

function hasOnlyImages({ children }: Element) {
	return children.every((child) => child.type === "element" && (child.tagName === "img"));
}

function isImageWithAlt({ tagName, properties }: Element) {
	return tagName === "img" && Boolean(properties.alt) && Boolean(properties.src);
}

function isImageWithCaption({ tagName, children }: Element) {
	return tagName === "figure" && children.some((child) => child.type === "element" && child.tagName === "figcaption");
}

function isImageLink({ tagName }: Record<string, any>) {
	return tagName === "a";
}

function createFigure({ properties }: Element, options: { className?: string }) {
	// const props = options.className ? { class: options.className } : {};
	// console.log(props);
  return h("figure", { class: "rehype-figure" }, [
		h("img", { ...properties }),
		h("figcaption", String(properties.alt))
	]);
}
