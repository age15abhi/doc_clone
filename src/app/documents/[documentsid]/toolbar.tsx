"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { Level } from "@tiptap/extension-heading";
/* ================ UI Components ================== */
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
/* ================ Icons ================== */
import {
  AlignLeftIcon,
  AlignVerticalSpaceAround,
  BoldIcon,
  CheckSquareIcon,
  ChevronDownIcon,
  EraserIcon,
  IndentIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  MessageSquareIcon,
  OutdentIcon,
  PrinterIcon,
  Redo2Icon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const headings = [
    { label: "Normal text", value: 0, fontSize: "16px" },
    { label: "Heading 1", value: 1, fontSize: "32px" },
    { label: "Heading 2", value: 2, fontSize: "24px" },
    { label: "Heading 3", value: 3, fontSize: "20px" },
    { label: "Heading 4", value: 4, fontSize: "18px" },
    { label: "Heading 5", value: 5, fontSize: "16px" },
    { label: "Heading 6", value: 6, fontSize: "14px" },
  ];

  const getCurrentHeading = () => {
    for (let i = 1; i < headings.length; i++) {
      if (editor?.isActive("heading", { level: i })) {
        return `Heading ${i}`;
      }
    }

    return "Normal text";
  };

  return (
    <DropdownMenu>
      {/* This is the drop down menu trigger */}
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          )}
        >
          <span className="truncate">
            {/* add the current text style label */}
            {getCurrentHeading()}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1 bg-white rounded-sm shadow-md">
          {headings.map(({ label, value, fontSize }) => (
            <button
              key={value}
              className={cn(
                "flex items-center px-2 gap-x-2 rounded-sm  hover:bg-neutral-200/80",
                editor?.getAttributes("textStyle").fontFamily === value &&
                  "bg-neutral-200/80"
              )}
              style={{ fontSize: fontSize }}
              onClick={() => {
                console.log("value =========> ", value);
                if (value === 0) {
                  editor?.chain().focus().setParagraph().run();
                } else {
                  editor
                    ?.chain()
                    .focus()
                    .toggleHeading({ level: value as Level })
                    .run();
                }
              }}
            >
              <span>{label}</span>
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

/* ================ Font Family Button ================== */
const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  // const currentFontFamily = editor
  //   ? editor.getAttributes("textStyle").fontFamily || "Default"
  //   : "Default";

  const fonts = [
    { label: "Default", value: "Default" },
    { label: "Arial", value: "Arial, sans-serif" },
    { label: "Georgia", value: "Georgia, serif" },
    { label: "Times New Roman", value: "'Times New Roman', Times, serif" },
    { label: "Verdana", value: "Verdana, Geneva, sans-serif" },
    { label: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
    { label: "Courier New", value: "'Courier New', Courier, monospace" },
    { label: "Lucida Console", value: "'Lucida Console', Monaco, monospace" },
    { label: "Tahoma", value: "Tahoma, Geneva, sans-serif" },
    { label: "Palatino", value: "'Palatino Linotype', Palatino, serif" },
    { label: "Garamond", value: "Garamond, serif" },
    { label: "Comic Sans MS", value: "'Comic Sans MS', cursive, sans-serif" },
    { label: "Impact", value: "Impact, Charcoal, sans-serif" },
    {
      label: "Segoe UI",
      value: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    { label: "Roboto", value: "Roboto, Arial, sans-serif" },
    { label: "Montserrat", value: "Montserrat, Arial, sans-serif" },
    { label: "Open Sans", value: "'Open Sans', Arial, sans-serif" },
    { label: "Lato", value: "Lato, Arial, sans-serif" },
    { label: "Source Sans Pro", value: "'Source Sans Pro', Arial, sans-serif" },
  ];

  return (
    <DropdownMenu>
      {/* This is the drop down menu trigger */}
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          )}
        >
          <span className="truncate">
            {/* add the current text style label */}
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1 bg-white shadow-md rounded-sm">
          {fonts.map(({ label, value }) => (
            <button
              key={value}
              className={cn(
                "flex items-center px-2 gap-x-2 rounded-sm  hover:bg-neutral-200/80",
                editor?.getAttributes("textStyle").fontFamily === value &&
                  "bg-neutral-200/80"
              )}
              style={{ fontFamily: value }}
              onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            >
              <span>{label}</span>
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

// Toolbar button props
interface ToolbarButtonProps {
  icon: import("lucide-react").LucideIcon;
  onClick?: () => void;
  isActive?: boolean | (() => boolean);
  isDisabled?: boolean | (() => boolean);
  tooltip?: string;
}

/* ================ Enhanced Tooltip Button ================== */
const ToolbarButton = ({
  icon: Icon,
  onClick,
  isActive = false,
  isDisabled = false,
  tooltip,
}: ToolbarButtonProps) => {
  // Handle function-based props
  const active = typeof isActive === "function" ? isActive() : isActive;
  const disabled = typeof isDisabled === "function" ? isDisabled() : isDisabled;

  const button = (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm transition-colors",
        disabled
          ? "opacity-40 cursor-not-allowed text-gray-400"
          : "hover:bg-neutral-200/80 cursor-pointer",
        active && !disabled && "bg-neutral-200/80"
      )}
      aria-label={tooltip}
      tabIndex={disabled ? -1 : 0}
    >
      <Icon className="size-4" />
    </button>
  );

  if (!tooltip) {
    return button;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          className="bg-gray-800 text-white text-xs border-gray-700 shadow-lg px-2 py-1.5 rounded-md"
          style={{
            fontSize: "12px",
            fontFamily: "Google Sans, Roboto, Arial, sans-serif",
            fontWeight: "400",
            lineHeight: "16px",
          }}
        >
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Toolbar = () => {
  const { editor } = useEditorStore();

  const sections: {
    label: string;
    icon: import("lucide-react").LucideIcon;
    onClick: () => void;
    isActive?: boolean | (() => boolean);
    isDisabled?: boolean | (() => boolean);
    tooltip?: string;
  }[][] = [
    // section 1
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
        isActive: false,
        isDisabled: () => !editor?.can().undo(),
        tooltip: "Undo (Ctrl+Z)",
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
        isActive: false,
        isDisabled: () => !editor?.can().redo(),
        tooltip: "Redo (Ctrl+Y)",
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
        isActive: false,
        tooltip: "Print (Ctrl+P)",
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
        isActive: () => editor?.view.dom.getAttribute("spellcheck") === "true",
        tooltip: "Toggle Spell Check",
      },
    ],
    // section 2
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: () => editor?.isActive("bold") || false,
        tooltip: "Bold (Ctrl+B)",
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: () => editor?.isActive("italic") || false,
        tooltip: "Italic (Ctrl+I)",
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: () => editor?.isActive("underline") || false,
        tooltip: "Underline (Ctrl+U)",
      },
    ],
    // section 3
    [
      {
        label: "Add Comment",
        icon: MessageSquareIcon,
        onClick: () => alert("Add Comment clicked!"),
        isActive: false,
        tooltip: "Add Comment",
      },
    ],
    // section 4
    [
      {
        label: "Align and Indent",
        icon: AlignLeftIcon,
        onClick: () => alert("Align and indent clicked!"),
        isActive: false,
        tooltip: "Align and Indent",
      },
      {
        label: "Line and Paragraph spacing",
        icon: AlignVerticalSpaceAround,
        onClick: () => alert("Line spacing clicked!"),
        isActive: false,
        tooltip: "Line and Paragraph spacing",
      },
      {
        label: "Checklist",
        icon: CheckSquareIcon,
        onClick: () => {
          editor?.chain().focus().toggleTaskList().run();
        },
        isActive: () => editor?.isActive("taskList") || false,
        tooltip: "Checklist",
      },
      {
        label: "Bulleted list",
        icon: ListIcon,
        onClick: () => {
          editor?.chain().focus().toggleBulletList().run();
        },
        isActive: () => editor?.isActive("bulletList") || false,
        tooltip: "Bulleted list",
      },
      {
        label: "Numbered list",
        icon: ListOrderedIcon,
        onClick: () => editor?.chain().focus().toggleOrderedList().run(),
        isActive: () => editor?.isActive("orderedList") || false, // Fixed typo: was "orderList"
        tooltip: "Numbered list",
      },
      {
        label: "Decrease indent",
        icon: OutdentIcon,
        onClick: () => {
          if (!editor) return;

          try {
            // Check if we're in a list context
            if (editor.isActive("listItem") || editor.isActive("taskItem")) {
              // For lists, use liftListItem - handle both taskItem and listItem
              if (
                editor.isActive("taskItem") &&
                editor.can().liftListItem("taskItem")
              ) {
                editor.chain().focus().liftListItem("taskItem").run();
              } else if (editor.can().liftListItem("listItem")) {
                editor.chain().focus().liftListItem("listItem").run();
              }
            } else {
              // For block elements, use custom outdent
              if (editor.can().outdent()) {
                editor.chain().focus().outdent().run();
              }
            }
          } catch (error) {
            console.warn("Failed to decrease indent:", error);
          }
        },
        isActive: () => false, // Outdent is typically not shown as "active"
        isDisabled: () => {
          if (!editor) return true;

          try {
            // Check if we're in a list context
            if (editor.isActive("listItem") || editor.isActive("taskItem")) {
              // Disable if we can't lift any list items
              return (
                !editor.can().liftListItem("listItem") &&
                !editor.can().liftListItem("taskItem")
              );
            }

            // For block elements, check if we can outdent
            return !editor.can().outdent();
          } catch (error) {
            console.error(error);
            return true; // Disable on error
          }
        },
        tooltip: "Decrease indent (Shift+Tab)",
      },
      {
        label: "Increase indent",
        icon: IndentIcon,
        onClick: () => {
          if (!editor) return;

          try {
            // Check if we're in a list context
            if (editor.isActive("listItem") || editor.isActive("taskItem")) {
              // For lists, use sinkListItem - handle both taskItem and listItem
              if (
                editor.isActive("taskItem") &&
                editor.can().sinkListItem("taskItem")
              ) {
                editor.chain().focus().sinkListItem("taskItem").run();
              } else if (editor.can().sinkListItem("listItem")) {
                editor.chain().focus().sinkListItem("listItem").run();
              }
            } else {
              // For block elements, use custom indent
              if (editor.can().indent()) {
                editor.chain().focus().indent().run();
              }
            }
          } catch (error) {
            console.warn("Failed to increase indent:", error);
          }
        },
        isActive: () => {
          if (!editor) return false;

          try {
            // Show as active if current element has any indentation
            if (editor.isActive("listItem") || editor.isActive("taskItem")) {
              // For lists, consider nested items as "indented"
              const { selection } = editor.state;
              const { $from } = selection;
              // Check if we're in a nested list (depth > 2 means nested)
              return $from.depth > 2;
            }

            // For block elements, check indent attribute
            const { selection } = editor.state;
            const { $from } = selection;
            const node = $from.parent;
            const currentIndent = node.attrs?.indent || 0;

            return currentIndent > 0;
          } catch (error) {
            console.error(error);
            return false;
          }
        },
        isDisabled: () => {
          if (!editor) return true;

          try {
            // Check if we're in a list context
            if (editor.isActive("listItem") || editor.isActive("taskItem")) {
              // Disable if we can't sink any list items
              return (
                !editor.can().sinkListItem("listItem") &&
                !editor.can().sinkListItem("taskItem")
              );
            }

            // For block elements, check if we can indent
            return !editor.can().indent();
          } catch (error) {
            console.error(error);
            return true; // Disable on error
          }
        },
        tooltip: "Increase indent (Tab)",
      },
      {
        label: "Clear formatting",
        icon: EraserIcon,
        onClick: () => {
          editor?.chain().focus().unsetAllMarks().run();
        },
        isActive: false,
        tooltip: "Clear formatting (Ctrl+\\)",
      },
    ],
  ];

  return (
    <div className="bg-[#f1f4f9] px-2.5 py-0.5  border-[#C7C7C7] rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto mx-4">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Font family */}
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Heading */}
      <HeadingLevelButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Font size */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Text formatting */}
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Insert image , Insert link , Add Comment */}
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Text alignment and Text spacing */}
      {sections[3].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};

export default Toolbar;
