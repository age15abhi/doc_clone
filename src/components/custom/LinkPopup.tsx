import { useEditorStore, useLinkPopupStore } from "@/store/use-editor-store";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const LinkPopup = () => {
  const { editor } = useEditorStore();
  const { isOpen, setOpen } = useLinkPopupStore();
  const [linkPos, setLinkPos] = useState<{ top: number; left: number } | null>(null);
  const [href, setHref] = useState<string>("");
  const [text, setText] = useState<string>("");

  // Position the popover at the current selection
  useEffect(() => {
    if (!editor || !isOpen) return;
    const { view } = editor;
    const { from } = editor.state.selection;
    const start = view.coordsAtPos(from);
    setLinkPos({ top: start.top, left: start.left });
    // Get current link mark if present
    const currentHref = editor.getAttributes("link").href || "";
    setHref(currentHref);
    // Get current text selection
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to
    );
    setText(selectedText);
  }, [editor, isOpen]);

  if (!editor || !isOpen || !linkPos) return null;

  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <span />
      </PopoverTrigger>
      <PopoverContent
        style={{
          position: "absolute",
          top: linkPos.top + 25,
          left: linkPos.left,
        }}
        className="p-4 rounded-md shadow-md bg-white flex flex-col gap-3 w-72"
      >
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Text</label>
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            className="w-full border rounded px-2 py-1 text-sm"
            placeholder="Link text"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">URL</label>
          <input
            type="text"
            value={href}
            onChange={e => setHref(e.target.value)}
            className="w-full border rounded px-2 py-1 text-sm"
            placeholder="https://example.com"
          />
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              // Replace selection text if changed
              if (text !== editor.state.doc.textBetween(editor.state.selection.from, editor.state.selection.to)) {
                editor.chain().focus().insertContent(text).run();
              }
              // Set link
              editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
              setOpen(false);
            }}
            className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
          >
            Apply
          </button>
          <button
            onClick={() => setOpen(false)}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LinkPopup;