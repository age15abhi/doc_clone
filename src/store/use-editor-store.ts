import { create } from "zustand";
import { type Editor } from "@tiptap/react";

interface EditorStore {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
}


// editor store
export const useEditorStore = create<EditorStore>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
}));


// link popup store
interface LinkPopupState {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export const useLinkPopupStore = create<LinkPopupState>((set) => ({
  isOpen: false,
  setOpen: (open) => set({ isOpen: open }),
}));