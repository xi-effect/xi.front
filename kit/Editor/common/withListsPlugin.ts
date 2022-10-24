/* eslint-disable no-unused-vars */
import { Element, Node } from 'slate';
import { ListType, withLists } from '@prezly/slate-lists';

export enum Type {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  FILE = 'file',
  TEXT = 'text',
  QUOTE = 'quote',
  IMAGE = 'image',
  VIDEO = 'video',
  DIVIDER = 'divider',
  LIST_ITEM = 'list-item',
  ORDERED_LIST = 'ordered-list',
  UNORDERED_LIST = 'unordered-list',
  LIST_ITEM_TEXT = 'list-item-text',
}

export const withListsPlugin = withLists({
  isConvertibleToListTextNode(node: Node) {
    return Element.isElementType(node, Type.TEXT);
  },
  isDefaultTextNode(node: Node) {
    return Element.isElementType(node, Type.TEXT);
  },
  isListNode(node: Node, type?: ListType) {
    if (type) {
      const nodeType = type === ListType.ORDERED ? Type.ORDERED_LIST : Type.UNORDERED_LIST;
      return Element.isElementType(node, nodeType);
    }
    return (
      Element.isElementType(node, Type.ORDERED_LIST) ||
      Element.isElementType(node, Type.UNORDERED_LIST)
    );
  },
  isListItemNode(node: Node) {
    return Element.isElementType(node, Type.LIST_ITEM);
  },
  isListItemTextNode(node: Node) {
    return Element.isElementType(node, Type.LIST_ITEM_TEXT);
  },
  createDefaultTextNode(props = {}) {
    return { children: [{ text: '' }], ...props, type: Type.TEXT };
  },
  createListNode(type: ListType = ListType.UNORDERED, props = {}) {
    const nodeType = type === ListType.ORDERED ? Type.ORDERED_LIST : Type.UNORDERED_LIST;
    return { children: [{ text: '' }], ...props, type: nodeType };
  },
  createListItemNode(props = {}) {
    return { children: [{ text: '' }], ...props, type: Type.LIST_ITEM };
  },
  createListItemTextNode(props = {}) {
    return { children: [{ text: '' }], ...props, type: Type.LIST_ITEM_TEXT };
  },
});
