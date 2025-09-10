"use client";
import { memo, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import { CharacterCount } from "@tiptap/extensions";
import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
} from "@tiptap/extension-table";
import Link from "@tiptap/extension-link";
import ImageResize from "tiptap-extension-resize-image";
import ToolBar from "./ToolBar/ToolBar";
import BubbleMenuBar from "./BubbleMenuBar";
import BubbleMenu from "@tiptap/extension-bubble-menu";

type Props = {
  content: string;
  onChange?: (value: string) => void;
};

function TextBoxEditor({ content, onChange }: Props) {
  const editor = useEditor({
    editable: true,
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        horizontalRule: false,
      }),

      Heading.configure({ levels: [1, 2, 3, 4] }),
      BulletList,
      OrderedList,
      CharacterCount.configure({ limit: 10000 }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.extend({
        inclusive: false,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      HorizontalRule,
      Image.configure({
        inline: true,
      }),
      ImageResize,
      Youtube.configure({
        controls: false,
        nocookie: true,
      }),
      BubbleMenu.configure({
        pluginKey: "bubbleMenu",
        element: document.querySelector(".menu-bubble") as HTMLElement | null,
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "prose focus:outline-none p-[8px] border border-gray-300 min-h-[350px]",
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="w-full text-[0.9rem]">
      <div className="relative z-5">
        <ToolBar editor={editor} />
        <EditorContent editor={editor} />
        <BubbleMenuBar editor={editor} />
      </div>

      {editor && (
        <div className="text-right text-[0.9rem] p-[6px] border-t-0 border-gray-300 border">
          {editor.storage.characterCount.words()} từ,{" "}
          {editor.storage.characterCount.characters()} ký tự
        </div>
      )}
    </div>
  );
}

export default memo(TextBoxEditor);
