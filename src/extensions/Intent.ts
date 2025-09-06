// Updated Indent Extension to match your SCSS styling
import { Extension } from '@tiptap/core';
// import type { Editor } from '@tiptap/core';
import { createIndentCommand, IndentProps } from '@/utils/intent';

export interface IndentOptions {
  types: string[];
  minIndent: number;
  maxIndent: number;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    indent: {
      /**
       * Set the indent attribute
       */
      indent: () => ReturnType;
      /**
       * Set the outdent attribute
       */
      outdent: () => ReturnType;
    };
  }
}

const Indent = Extension.create<IndentOptions>({
  name: 'indent',

  addOptions() {
    return {
      types: ['paragraph', 'heading', 'blockquote'],
      minIndent: IndentProps.min,
      maxIndent: IndentProps.max,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: 0,
            parseHTML: (element) => {
              const indentAttr = element.getAttribute('data-indent');
              return (indentAttr ? parseInt(indentAttr, 10) : 0) || 0;
            },
            renderHTML: (attributes) => {
              if (!attributes.indent || attributes.indent === 0) {
                return {};
              }
              // Only add the data-indent attribute - CSS will handle the styling
              return { 
                'data-indent': attributes.indent,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      indent: () =>
        createIndentCommand({
          delta: IndentProps.more,
          types: this.options.types,
        }),
      outdent: () =>
        createIndentCommand({
          delta: IndentProps.less,
          types: this.options.types,
        }),
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-]': () => this.editor.commands.indent(),
      'Mod-[': () => this.editor.commands.outdent(),
      'Tab': ({ editor }) => {
        const { state } = editor;
        const { selection } = state;
        const { $from } = selection;
        
        const nodeType = $from.parent.type.name;
        if (this.options.types.includes(nodeType)) {
          return editor.commands.indent();
        }
        return false;
      },
      'Shift-Tab': ({ editor }) => {
        const { state } = editor;
        const { selection } = state;
        const { $from } = selection;
        
        const nodeType = $from.parent.type.name;
        if (this.options.types.includes(nodeType)) {
          return editor.commands.outdent();
        }
        return false;
      },
    };
  },
});

export default Indent;