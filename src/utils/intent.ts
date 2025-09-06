// Fixed indent.ts (renamed from intent.ts)
import type { Command, Editor } from '@tiptap/core';
import { isList } from '@tiptap/core';
import { TextSelection, AllSelection, Transaction } from '@tiptap/pm/state';
import { clamp } from './shared';

export const enum IndentProps {
  max = 7,
  min = 0,
  more = 1,
  less = -1,
}

function updateIndentLevel(
  tr: Transaction,
  delta: number,
  types: string[],
  editor: Editor
): Transaction {
  const { doc, selection } = tr;

  if (!doc || !selection) return tr;

  if (
    !(selection instanceof TextSelection || selection instanceof AllSelection)
  ) {
    return tr;
  }

  const { from, to } = selection;

  doc.nodesBetween(from, to, (node, pos) => {
    const nodeType = node.type;

    if (types.includes(nodeType.name)) {
      tr = setNodeIndentMarkup(tr, pos, delta);
      return false; // Don't recurse into children
    } else if (isList(node.type.name, editor.extensionManager.extensions)) {
      return false; // Don't handle lists, let list extension handle them
    }
    return true; // Continue traversing
  });

  return tr;
}

function setNodeIndentMarkup(
  tr: Transaction,
  pos: number,
  delta: number
): Transaction {
  if (!tr.doc) return tr;

  const node = tr.doc.nodeAt(pos);
  if (!node) return tr;

  const minIndent = IndentProps.min;
  const maxIndent = IndentProps.max;

  const currentIndent = node.attrs.indent || 0;
  const newIndent = clamp(currentIndent + delta, minIndent, maxIndent);

  // If indent level hasn't changed, don't modify
  if (newIndent === currentIndent) return tr;

  const nodeAttrs = {
    ...node.attrs,
    indent: newIndent,
  };

  return tr.setNodeMarkup(pos, node.type, nodeAttrs, node.marks);
}

export function createIndentCommand({
  delta,
  types,
}: {
  delta: number;
  types: string[];
}): Command {
  return ({ state, dispatch, editor }) => {
    const { selection } = state;
    let { tr } = state;
    
    // Set selection to ensure we're working with current selection
    tr = tr.setSelection(selection);
    tr = updateIndentLevel(tr, delta, types, editor);

    // Only dispatch if document actually changed
    if (tr.docChanged) {
      dispatch?.(tr);
      return true;
    }

    return false;
  };
}