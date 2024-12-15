import type { Element, Parent } from '@astrojs/starlight/expressive-code/hast';

import { visit } from 'unist-util-visit';
import { h } from 'hastscript';

export function RehypeFigurePlugin(options: Record<string, unknown>) {
  return (tree: Parent) => {
    // unwrap the images inside the paragraph
    visit(tree, { tagName: 'p' }, (node, index, parent) => {
      if (parent === undefined || index === undefined || !hasOnlyImages(node)) {
        return;
      }

      parent.children.splice(index, 1, ...node.children);

      return index;
    });

    // wrap images in figure
    visit(tree, node => isImageWithAlt(node as Element), (node, index, parent) => {
      if (!parent || isImageWithCaption(parent as Element) || isImageLink(parent)) {
        return;
      }
      const typedNode = node as Element;

      const figure = createFigure(typedNode, options);

      typedNode.tagName = figure.tagName;
      typedNode.children = figure.children;
      typedNode.properties = figure.properties;
    });
  };
}

function hasOnlyImages({ children }: Element) {
  return children.every(child => child.type === 'element' && (child.tagName === 'img'));
}

function isImageWithAlt({ tagName, properties }: Element) {
  return tagName === 'img' && Boolean(properties.alt) && Boolean(properties.src);
}

function isImageWithCaption({ tagName, children }: Element) {
  return tagName === 'figure' && children.some(child => child.type === 'element' && child.tagName === 'figcaption');
}

function isImageLink({ tagName }: Record<string, unknown>) {
  return tagName === 'a';
}

function createFigure({ properties }: Element) {
  return h('figure', { class: 'rehype-figure' }, [
    h('img', { ...properties }),
    h('figcaption', String(properties.alt)),
  ]);
}
