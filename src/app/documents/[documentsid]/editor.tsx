"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import {
  TextStyle,
  FontFamily,
  FontSize,
  Color,
  BackgroundColor,
} from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";
import ImageResize from "tiptap-extension-resize-image";
import { useEditorStore } from "@/store/use-editor-store";
import Indent from "@/extensions/Intent";
import TextAlign from "@tiptap/extension-text-align";
import { FontSizeExtension } from "@/extensions/font-size";
import { LineHeightExtension } from "@/extensions/line-height";
const EditorPage = () => {
  const { setEditor } = useEditorStore();

  const editor = useEditor({
    onCreate: ({ editor }) => {
      setEditor(editor);
    },

    onDestroy: () => {
      setEditor(null);
    },
    onUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onSelectionUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onTransaction: ({ editor }) => {
      setEditor(editor);
    },
    onFocus: ({ editor }) => {
      setEditor(editor);
    },
    onBlur: ({ editor }) => {
      setEditor(editor);
    },
    onContentError: ({ editor }) => {
      setEditor(editor);
    },

    editorProps: {
      attributes: {
        style: "padding-left: 56px; padding-right: 56px;",
        class:
          "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    extensions: [
      StarterKit,
      LineHeightExtension.configure({
        types: ["heading", "paragraph"],
        defaultLineHeight: "normal"
      }),
      FontSizeExtension,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      TableKit.configure({
        table: { resizable: true },
      }),
      ImageResize.configure({
        inline: true,
      }),
      Image,
      Indent.configure({
        types: ["paragraph", "heading", "blockquote"],
      }),
      TextStyle,
      FontFamily,
      FontSize,
      Color,
      BackgroundColor,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: `
        <p>Adjusting font sizes can greatly affect the readability of your text, making it easier for users to engage with your content.</p>
        <p>When designing a website, it's crucial to balance large headings and smaller body text for a clean, organized layout.</p>
        <p>When setting font sizes, it's important to consider accessibility, ensuring that text is readable for users with different visual impairments.</p>
        <p><span style="font-size: 10px">Too small</span> a font size can strain the eyes, while <span style="font-size: 40px">too large</span> can disrupt the flow of the design.</p>
        <p>When designing for mobile, font sizes should be adjusted to maintain readability on smaller screens.</p>
      `,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });
  return (
    <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:px-0 print:bg-white print:overflow-visible">
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default EditorPage;
