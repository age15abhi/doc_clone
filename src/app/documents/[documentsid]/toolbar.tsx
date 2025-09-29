"use client";

import React, { useState } from "react";
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
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  SearchIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
  PaintBucketIcon,
  ALargeSmall,
  Link2Icon,
  Image as ImageLogo,
  Upload,
  AlignRightIcon,
  AlignCenterIcon,
  AlignJustifyIcon,
  MinusIcon,
  PlusIcon,
  ListCollapseIcon,
} from "lucide-react";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/* ============= Line Height Button ============== */
const LineHeightButton = () => {
  const { editor } = useEditorStore();

 const lineHeights = [
  {
    label:"Default",
    value: "normal"
  },
  {
    label:"Single",
    value: "1"
  },
  {
    label:"1.15",
    value: "1.15"
  },
  {
    label:"1.5",
    value: "1.5"
  },
  {
    label:"Double",
    value: "2"
  },
 ]

   const currentLineHeight =
    editor?.getAttributes("paragraph").textAlign ||
    editor?.getAttributes("heading").textAlign ||
    "left";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 min-w-7 px-1 py-2 flex   items-center justify-center content-center rounded-sm transition-colors hover:bg-neutral-200/80 bg-gray-100"
          )}
        >
          {/* Icon */}
          <ListCollapseIcon className="size-4" />

          {/* Color line below the icon */}

          <ChevronDownIcon className="size-3 ml-1" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent className="p-3 grid  gap-4  shadow-2xl rounded-xl w-40 max-h-64 overflow-auto border border-gray-100  z-50 bg-gray-100">
          {lineHeights.map(({label, value}) => (
            <DropdownMenuItem
              key={value}
              onClick={() =>
                editor?.chain().focus().setLineHeight(value).run()
              }
              className={cn(
                "h-7 min-w-7 px-1 py-2 flex items-center justify-center rounded-sm transition-colors hover:bg-neutral-200/80 bg-gray-100 cursor-pointer",
                currentLineHeight === value &&
                  "ring-2 ring-blue-500 bg-white "
              )}
              aria-label={label}
            >
              <span className="text-sm">{label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

/* ================ Font Size Button ================== */
const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newFontSize: string) => {
    const size = parseInt(newFontSize);

    if (!isNaN(size) && size > 0) {
      // here change the font size in the editor
      editor?.chain().setFontSize(`${size}px`).run();
      // here this sen=t font size is for the change the value in the toolbar of the font size
      setFontSize(newFontSize);
      setInputValue(newFontSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;

    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;

    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };
  return (
    <div className="flex items-center gap-x-0.5">
      <button
        onClick={decrement}
        className="h-7 min-w-7 px-1 py-2 flex items-center justify-center rounded-sm transition-colors hover:bg-neutral-200/80 bg-gray-100"
      >
        <MinusIcon className="size-4" />
      </button>
      {isEditing ? (
        <Input
        type="text"
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        value={inputValue}
        onKeyDown={handleKeyDown}
        className="h-7 w-11 text-sm text-center  border border-neutral-400 rounded-sm transition-colors bg-transparent focus:outline-none focus:ring-0 bg-gray-100"
        />
      ) : (
        <button
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
          className="h-7 w-10 text-sm text-center  border border-neutral-400 rounded-sm transition-colors hover:bg-neutral-200/80 bg-gray-100"
        >
          {currentFontSize}
        </button>
      )}
      <button
        onClick={increment}
        className="h-7 min-w-7 px-1 py-2 flex items-center justify-center rounded-sm transition-colors hover:bg-neutral-200/80 bg-gray-100"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
};

/* ================ Align Button ================== */
const AlignButton = () => {
  const { editor } = useEditorStore();

  const alignments = [
    {
      label: "Align Left",
      value: "left",
      icon: AlignLeftIcon,
    },
    {
      label: "Align Center",
      value: "center",
      icon: AlignCenterIcon,
    },
    {
      label: "Align Right",
      value: "right",
      icon: AlignRightIcon,
    },
    {
      label: "Align Justify",
      value: "justify",
      icon: AlignJustifyIcon,
    },
  ];

  const currentAlignment =
    editor?.getAttributes("paragraph").textAlign ||
    editor?.getAttributes("heading").textAlign ||
    "left";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 min-w-7 px-1 py-2 flex  items-center justify-center content-center rounded-sm transition-colors hover:bg-neutral-200/80 bg-gray-100"
          )}
        >
          {/* Icon */}
          <AlignLeftIcon className="text-black size-4 self-center" />

          {/* Color line below the icon */}

          <ChevronDownIcon className="size-3 ml-1" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent className="p-3 grid grid-cols-4 gap-4  shadow-2xl rounded-xl w-40 max-h-64 overflow-auto border border-gray-100  z-50 bg-gray-100">
          {alignments.map((alignment) => (
            <button
              key={alignment.value}
              onClick={() =>
                editor?.chain().focus().setTextAlign(alignment.value).run()
              }
              className={cn(
                "h-7 min-w-7 px-1 py-2 flex items-center justify-center rounded-sm transition-colors hover:bg-neutral-200/80 bg-gray-100",
                currentAlignment === alignment.value &&
                  "ring-2 ring-blue-500 bg-white"
              )}
              aria-label={alignment.label}
            >
              <alignment.icon />
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

/* ================ Image Button ================== */
const ImageButton = () => {
  const { editor } = useEditorStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  /* 
  here we create the on change method when we create the popover 
  in popover we add a input that take the link and change the 
  value of the link
 */

  const onApplyLink = (href: string): void => {
    editor?.chain().focus().setImage({ src: href }).run();
    setImageUrl("");
  };

  const onUpload = () => {
    const input = document.createElement("input");

    console.log("input", input);
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];

      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onApplyLink(imageUrl);
      }
    };

    input.click();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "w-7 min-h-7 flex flex-col items-center justify-center rounded-sm transition-colors hover:bg-neutral-200/80 bg-gray-100"
            )}
          >
            {/* Icon */}
            <ImageLogo className="text-black size-4 " />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
          <DropdownMenuContent className="bg-white shadow-2xl rounded-sm w-40 border border-gray-100 mt-3">
            {/* upload from pc */}
            <DropdownMenuItem onClick={onUpload}>
              <Upload className="size-4 mr-2" />
              Upload
            </DropdownMenuItem>
            {/* add the link address */}
            <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
              <Link2Icon className="size-4 mr-2" />
              Add Url
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Image via URL</DialogTitle>
            <DialogDescription>
              Enter the URL of the image you want to insert.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full"
              type="text"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              disabled={!imageUrl}
              onClick={() => {
                onApplyLink(imageUrl);
                setIsDialogOpen(false);
              }}
            >
              Add Image
            </Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

/* ================ Link Button ================== */
const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState("");

  /* 
  here we create the on change method when we create the popover 
  in popover we add a input that take the link and change the 
  value of the link
 */

  const onApplyLink = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setValue(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "w-7 min-h-7 flex flex-col items-center justify-center rounded-sm transition-colors hover:bg-neutral-200/80 bg-gray-100"
          )}
        >
          {/* Icon */}
          <Link2Icon className="text-black size-4 " />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent className="p-2.5 flex items-center gap-x-2 bg-white shadow-2xl rounded-xl">
          <Input
            onChange={(e) => setValue(e.target.value)}
            placeholder="Paste link here"
            value={value}
          />
          <Button onClick={() => onApplyLink(value)}>Apply</Button>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

/* ================ Text color Button ================== */
const HighlightColorButton = () => {
  const { editor } = useEditorStore();

  const colors = [
    { name: "AliceBlue", code: "#F0F8FF" },
    { name: "AntiqueWhite", code: "#FAEBD7" },
    { name: "Aqua", code: "#00FFFF" },
    { name: "Aquamarine", code: "#7FFFD4" },
    { name: "Azure", code: "#F0FFFF" },
    { name: "Beige", code: "#F5F5DC" },
    { name: "Bisque", code: "#FFE4C4" },
    { name: "Black", code: "#000000" },
    { name: "BlanchedAlmond", code: "#FFEBCD" },
    { name: "Blue", code: "#0000FF" },
    { name: "BlueViolet", code: "#8A2BE2" },
    { name: "Brown", code: "#A52A2A" },
    { name: "BurlyWood", code: "#DEB887" },
    { name: "CadetBlue", code: "#5F9EA0" },
    { name: "Chartreuse", code: "#7FFF00" },
    { name: "Chocolate", code: "#D2691E" },
    { name: "Coral", code: "#FF7F50" },
    { name: "CornflowerBlue", code: "#6495ED" },
    { name: "Cornsilk", code: "#FFF8DC" },
    { name: "Crimson", code: "#DC143C" },
    { name: "Cyan", code: "#00FFFF" },
    { name: "DarkBlue", code: "#00008B" },
    { name: "DarkCyan", code: "#008B8B" },
    { name: "DarkGoldenRod", code: "#B8860B" },
    { name: "DarkGray", code: "#A9A9A9" },
    { name: "DarkGreen", code: "#006400" },
    { name: "DarkKhaki", code: "#BDB76B" },
    { name: "DarkMagenta", code: "#8B008B" },
    { name: "DarkOliveGreen", code: "#556B2F" },
    { name: "DarkOrange", code: "#FF8C00" },
    { name: "DarkOrchid", code: "#9932CC" },
    { name: "DarkRed", code: "#8B0000" },
    { name: "DarkSalmon", code: "#E9967A" },
    { name: "DarkSeaGreen", code: "#8FBC8F" },
    { name: "DarkSlateBlue", code: "#483D8B" },
    { name: "DarkSlateGray", code: "#2F4F4F" },
    { name: "DarkTurquoise", code: "#00CED1" },
    { name: "DarkViolet", code: "#9400D3" },
    { name: "DeepPink", code: "#FF1493" },
    { name: "DeepSkyBlue", code: "#00BFFF" },
    { name: "DimGray", code: "#696969" },
    { name: "DodgerBlue", code: "#1E90FF" },
    { name: "FireBrick", code: "#B22222" },
    { name: "FloralWhite", code: "#FFFAF0" },
    { name: "ForestGreen", code: "#228B22" },
    { name: "Fuchsia", code: "#FF00FF" },
    { name: "Gainsboro", code: "#DCDCDC" },
    { name: "GhostWhite", code: "#F8F8FF" },
    { name: "Gold", code: "#FFD700" },
    { name: "GoldenRod", code: "#DAA520" },
    { name: "Gray", code: "#808080" },
    { name: "Green", code: "#008000" },
    { name: "GreenYellow", code: "#ADFF2F" },
    { name: "HoneyDew", code: "#F0FFF0" },
    { name: "HotPink", code: "#FF69B4" },
    { name: "IndianRed", code: "#CD5C5C" },
    { name: "Indigo", code: "#4B0082" },
    { name: "Ivory", code: "#FFFFF0" },
    { name: "Khaki", code: "#F0E68C" },
    { name: "Lavender", code: "#E6E6FA" },
    { name: "LavenderBlush", code: "#FFF0F5" },
    { name: "LawnGreen", code: "#7CFC00" },
    { name: "LemonChiffon", code: "#FFFACD" },
    { name: "LightBlue", code: "#ADD8E6" },
    { name: "LightCoral", code: "#F08080" },
    { name: "LightCyan", code: "#E0FFFF" },
    { name: "LightGoldenRodYellow", code: "#FAFAD2" },
    { name: "LightGray", code: "#D3D3D3" },
    { name: "LightGreen", code: "#90EE90" },
    { name: "LightPink", code: "#FFB6C1" },
    { name: "LightSalmon", code: "#FFA07A" },
    { name: "LightSeaGreen", code: "#20B2AA" },
    { name: "LightSkyBlue", code: "#87CEFA" },
    { name: "LightSlateGray", code: "#778899" },
    { name: "LightSteelBlue", code: "#B0C4DE" },
    { name: "LightYellow", code: "#FFFFE0" },
    { name: "Lime", code: "#00FF00" },
    { name: "LimeGreen", code: "#32CD32" },
    { name: "Linen", code: "#FAF0E6" },
    { name: "Magenta", code: "#FF00FF" },
    { name: "Maroon", code: "#800000" },
    { name: "MediumAquaMarine", code: "#66CDAA" },
    { name: "MediumBlue", code: "#0000CD" },
    { name: "MediumOrchid", code: "#BA55D3" },
    { name: "MediumPurple", code: "#9370DB" },
    { name: "MediumSeaGreen", code: "#3CB371" },
    { name: "MediumSlateBlue", code: "#7B68EE" },
    { name: "MediumSpringGreen", code: "#00FA9A" },
    { name: "MediumTurquoise", code: "#48D1CC" },
    { name: "MediumVioletRed", code: "#C71585" },
    { name: "MidnightBlue", code: "#191970" },
    { name: "MintCream", code: "#F5FFFA" },
    { name: "MistyRose", code: "#FFE4E1" },
    { name: "Moccasin", code: "#FFE4B5" },
    { name: "NavajoWhite", code: "#FFDEAD" },
    { name: "Navy", code: "#000080" },
  ];

  const currentColor =
    editor?.getAttributes("textStyle").backgroundColor || "black";

  const applyColor = (color: string) => {
    editor?.chain().focus().setHighlight({ color }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "w-7 min-h-7 flex flex-col items-center justify-center rounded-sm transition-colors hover:bg-neutral-200/80 bg-gray-100"
          )}
        >
          {/* Icon */}
          <PaintBucketIcon className="text-black size-4 " />

          {/* Color line below the icon */}
          <span
            className="h-1 w-6 rounded-sm"
            style={{ backgroundColor: currentColor }}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent className="p-6 grid grid-cols-6 gap-3 bg-white shadow-2xl rounded-xl w-80 max-h-64 overflow-auto border border-gray-100">
          {colors.map((color) => (
            <DropdownMenuItem
              key={color.name}
              onClick={() => applyColor(color.code)}
              className="flex items-center justify-center w-7 h-7 rounded-full border border-gray-200 cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110 hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 hover:shadow-md"
              style={{ backgroundColor: color.code }}
              title={color.name}
            />
          ))}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

/* ================ Text color Button ================== */
const TextColorButton = () => {
  const { editor } = useEditorStore();

  const colors = [
    { name: "AliceBlue", code: "#F0F8FF" },
    { name: "AntiqueWhite", code: "#FAEBD7" },
    { name: "Aqua", code: "#00FFFF" },
    { name: "Aquamarine", code: "#7FFFD4" },
    { name: "Azure", code: "#F0FFFF" },
    { name: "Beige", code: "#F5F5DC" },
    { name: "Bisque", code: "#FFE4C4" },
    { name: "Black", code: "#000000" },
    { name: "BlanchedAlmond", code: "#FFEBCD" },
    { name: "Blue", code: "#0000FF" },
    { name: "BlueViolet", code: "#8A2BE2" },
    { name: "Brown", code: "#A52A2A" },
    { name: "BurlyWood", code: "#DEB887" },
    { name: "CadetBlue", code: "#5F9EA0" },
    { name: "Chartreuse", code: "#7FFF00" },
    { name: "Chocolate", code: "#D2691E" },
    { name: "Coral", code: "#FF7F50" },
    { name: "CornflowerBlue", code: "#6495ED" },
    { name: "Cornsilk", code: "#FFF8DC" },
    { name: "Crimson", code: "#DC143C" },
    { name: "Cyan", code: "#00FFFF" },
    { name: "DarkBlue", code: "#00008B" },
    { name: "DarkCyan", code: "#008B8B" },
    { name: "DarkGoldenRod", code: "#B8860B" },
    { name: "DarkGray", code: "#A9A9A9" },
    { name: "DarkGreen", code: "#006400" },
    { name: "DarkKhaki", code: "#BDB76B" },
    { name: "DarkMagenta", code: "#8B008B" },
    { name: "DarkOliveGreen", code: "#556B2F" },
    { name: "DarkOrange", code: "#FF8C00" },
    { name: "DarkOrchid", code: "#9932CC" },
    { name: "DarkRed", code: "#8B0000" },
    { name: "DarkSalmon", code: "#E9967A" },
    { name: "DarkSeaGreen", code: "#8FBC8F" },
    { name: "DarkSlateBlue", code: "#483D8B" },
    { name: "DarkSlateGray", code: "#2F4F4F" },
    { name: "DarkTurquoise", code: "#00CED1" },
    { name: "DarkViolet", code: "#9400D3" },
    { name: "DeepPink", code: "#FF1493" },
    { name: "DeepSkyBlue", code: "#00BFFF" },
    { name: "DimGray", code: "#696969" },
    { name: "DodgerBlue", code: "#1E90FF" },
    { name: "FireBrick", code: "#B22222" },
    { name: "FloralWhite", code: "#FFFAF0" },
    { name: "ForestGreen", code: "#228B22" },
    { name: "Fuchsia", code: "#FF00FF" },
    { name: "Gainsboro", code: "#DCDCDC" },
    { name: "GhostWhite", code: "#F8F8FF" },
    { name: "Gold", code: "#FFD700" },
    { name: "GoldenRod", code: "#DAA520" },
    { name: "Gray", code: "#808080" },
    { name: "Green", code: "#008000" },
    { name: "GreenYellow", code: "#ADFF2F" },
    { name: "HoneyDew", code: "#F0FFF0" },
    { name: "HotPink", code: "#FF69B4" },
    { name: "IndianRed", code: "#CD5C5C" },
    { name: "Indigo", code: "#4B0082" },
    { name: "Ivory", code: "#FFFFF0" },
    { name: "Khaki", code: "#F0E68C" },
    { name: "Lavender", code: "#E6E6FA" },
    { name: "LavenderBlush", code: "#FFF0F5" },
    { name: "LawnGreen", code: "#7CFC00" },
    { name: "LemonChiffon", code: "#FFFACD" },
    { name: "LightBlue", code: "#ADD8E6" },
    { name: "LightCoral", code: "#F08080" },
    { name: "LightCyan", code: "#E0FFFF" },
    { name: "LightGoldenRodYellow", code: "#FAFAD2" },
    { name: "LightGray", code: "#D3D3D3" },
    { name: "LightGreen", code: "#90EE90" },
    { name: "LightPink", code: "#FFB6C1" },
    { name: "LightSalmon", code: "#FFA07A" },
    { name: "LightSeaGreen", code: "#20B2AA" },
    { name: "LightSkyBlue", code: "#87CEFA" },
    { name: "LightSlateGray", code: "#778899" },
    { name: "LightSteelBlue", code: "#B0C4DE" },
    { name: "LightYellow", code: "#FFFFE0" },
    { name: "Lime", code: "#00FF00" },
    { name: "LimeGreen", code: "#32CD32" },
    { name: "Linen", code: "#FAF0E6" },
    { name: "Magenta", code: "#FF00FF" },
    { name: "Maroon", code: "#800000" },
    { name: "MediumAquaMarine", code: "#66CDAA" },
    { name: "MediumBlue", code: "#0000CD" },
    { name: "MediumOrchid", code: "#BA55D3" },
    { name: "MediumPurple", code: "#9370DB" },
    { name: "MediumSeaGreen", code: "#3CB371" },
    { name: "MediumSlateBlue", code: "#7B68EE" },
    { name: "MediumSpringGreen", code: "#00FA9A" },
    { name: "MediumTurquoise", code: "#48D1CC" },
    { name: "MediumVioletRed", code: "#C71585" },
    { name: "MidnightBlue", code: "#191970" },
    { name: "MintCream", code: "#F5FFFA" },
    { name: "MistyRose", code: "#FFE4E1" },
    { name: "Moccasin", code: "#FFE4B5" },
    { name: "NavajoWhite", code: "#FFDEAD" },
    { name: "Navy", code: "#000080" },
  ];

  const currentColor = editor?.getAttributes("textStyle").color || "black";

  const applyColor = (color: string) => {
    editor?.chain().focus().setColor(color).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "w-7 min-h-7 flex flex-col items-center justify-center rounded-sm transition-colors hover:bg-neutral-200/80 bg-gray-100"
          )}
        >
          {/* Icon */}
          <ALargeSmall className="text-black size-4 " />

          {/* Color line below the icon */}
          <span
            className="h-1 w-6 rounded-sm"
            style={{ backgroundColor: currentColor }}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent className="p-6 grid grid-cols-6 gap-3 bg-white shadow-2xl rounded-xl w-80 max-h-64 overflow-auto border border-gray-100">
          {colors.map((color) => (
            <DropdownMenuItem
              key={color.name}
              onClick={() => applyColor(color.code)}
              className="flex items-center justify-center w-7 h-7 rounded-full border border-gray-200 cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110 hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 hover:shadow-md"
              style={{ backgroundColor: color.code }}
              title={color.name}
            />
          ))}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

/* ================ Heading Level Button ================== */
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
            <DropdownMenuItem
              key={value}
              className={cn(
                "flex items-center px-2 gap-x-2 rounded-sm cursor-pointer  hover:bg-neutral-200/80",
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
            </DropdownMenuItem>
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
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1 bg-white shadow-md rounded-sm">
          {fonts.map(({ label, value }) => (
            <DropdownMenuItem
              key={value}
              className={cn(
                "flex items-center px-2 gap-x-2 rounded-sm  hover:bg-neutral-200/80 cursor-pointer",
                editor?.getAttributes("textStyle").fontFamily === value &&
                  "bg-neutral-200/80"
              )}
              style={{ fontFamily: value }}
              onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            >
              <span>{label}</span>
            </DropdownMenuItem>
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
  iconClass?: string;
}

/* ================ Enhanced Tooltip Button ================== */
const ToolbarButton = ({
  icon: Icon,
  onClick,
  isActive = false,
  isDisabled = false,
  tooltip,
  iconClass,
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
      <Icon className={`size-4 ${iconClass}`} />
    </button>
  );

  if (!tooltip) {
    return button;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className={`size-4 ${iconClass}`}>
          {button}
        </TooltipTrigger>
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
    iconClass?: string;
  }[][] = [
    // section 1
    [
      {
        label: "Search Menus",
        icon: SearchIcon,
        onClick: () => {
          console.log("Search the menus clicked!");
        },
        isActive: false,
        tooltip: "Search the Menus (Alt+/)",
      },
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
      // {
      //   label: "Text color",
      //   icon: Baseline,
      //   onClick: () => editor?.chain().focus().toggleUnderline().run(),
      //   tooltip: "Underline (Ctrl+U)",
      //   iconClass: "w-5 h-5 stroke-blue-500", // ✅ custom icon class
      // },
      // {
      //   label: "Paint Bucket Icons",
      //   icon: PaintBucketIcon,
      //   onClick: () => editor?.chain().focus().toggleUnderline().run(),
      //   tooltip: "Underline (Ctrl+U)",
      //   iconClass: "w-5 h-5 text-red-500", // ✅ custom icon class
      // },
    ],
    // section 3
    [
      {
        label: "Add Comment",
        icon: MessageSquareIcon,
        onClick: () => editor?.chain().focus().addPendingComment().run(),
        isActive: editor?.isActive("liveblocksCommentMark"),
        tooltip: "Add Comment",
      },
    ],
    // section 4
    [
      // {
      //   label: "Align and Indent",
      //   icon: AlignLeftIcon,
      //   onClick: () => alert("Align and indent clicked!"),
      //   isActive: false,
      //   tooltip: "Align and Indent",
      // },
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
    <div
      className="
    w-full min-h-[40px]
    bg-[#f1f4f9]
    px-2.5 py-0.5
    border-b border-[#C7C7C7]
    flex items-center gap-x-1
    overflow-x-auto
    shadow-sm
    rounded-full
  "
    >
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Heading */}
      <HeadingLevelButton />

      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Font family */}
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Font size */}
      <FontSizeButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Text formatting */}
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}

      {/* Text color button */}
      <TextColorButton />
      {/* Highlight color button */}
      <HighlightColorButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Insert image , Insert link , Add Comment */}
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      {/* Link Button */}
      <LinkButton />
      {/* Image Button */}
      <ImageButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* Align Button */}
      <AlignButton />
      <LineHeightButton />
      {/* TODO: Text alignment and Text spacing */}
      {sections[3].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};

export default Toolbar;
