"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
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

/* ================ Font Family Button ================== */
const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const currentFontFamily = editor
    ? editor.getAttributes("textStyle").fontFamily || "Default"
    : "Default";

  const fonts = [
    { label: "Default", value: "Default" },
    { label: "Arial", value: "Arial, sans-serif" },
    { label: "Georgia", value: "Georgia, serif" },
  ];

  return (
    <DropdownMenu>
      {/* This is the drop down menu trigger */}
      <DropdownMenuTrigger asChild>
        <button className={cn("h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm") }>
        <span>
          {/* add the current text style label */}
          {editor?.getAttributes("textStyle").fontFamily || "Arial"}
        </span>
        <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
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
    <div className="bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Font family */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Heading */}
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
