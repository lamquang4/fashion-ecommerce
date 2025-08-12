"use client";
import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import {
  LuAlignCenter,
  LuAlignLeft,
  LuAlignRight,
  LuBold,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuItalic,
  LuList,
  LuListOrdered,
  LuRedo,
  LuUndo,
} from "react-icons/lu";
type Props = {
  content: string;
  onChange?: (value: string) => void;
};

export default function TextBoxEditor({ content, onChange }: Props) {
  const editor = useEditor({
    editable: true,
    immediatelyRender: true,
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "textbox-editor focus:outline-none p-[6px_10px] border border-gray-300 min-h-[350px]",
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

  if (!editor) return null;

  const tools = [
    {
      icon: <LuUndo size={18} />,
      onClick: () => editor.chain().focus().undo().run(),
      active: false,
      title: "Hoàn tác",
      disabled: !editor.can().undo(),
    },
    {
      icon: <LuRedo size={18} />,
      onClick: () => editor.chain().focus().redo().run(),
      active: false,
      title: "Làm lại",
      disabled: !editor.can().redo(),
    },
    {
      icon: <LuBold size={18} />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
      title: "In đậm",
    },
    {
      icon: <LuItalic size={18} />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
      title: "In nghiêng",
    },
    {
      icon: <LuHeading1 size={18} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: editor.isActive("heading", { level: 1 }),
      title: "Tiêu đề 1",
    },
    {
      icon: <LuHeading2 size={18} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editor.isActive("heading", { level: 2 }),
      title: "Tiêu đề 2",
    },
    {
      icon: <LuHeading3 size={18} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      active: editor.isActive("heading", { level: 3 }),
      title: "Tiêu đề 3",
    },
    {
      icon: <LuAlignLeft size={18} />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      active: editor.isActive({ textAlign: "left" }),
      title: "Căn lề trái",
    },
    {
      icon: <LuAlignCenter size={18} />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      active: editor.isActive({ textAlign: "center" }),
      title: "Căn lề giữa",
    },
    {
      icon: <LuAlignRight size={18} />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      active: editor.isActive({ textAlign: "right" }),
      title: "Căn lề phải",
    },
    {
      icon: <LuList size={18} />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
      title: "Danh sách chấm",
    },
    {
      icon: <LuListOrdered size={18} />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
      title: "Danh sách số",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-wrap border border-gray-300 border-b-0 bg-gray-50">
        {tools.map((tool, index) => (
          <button
            title={tool.title}
            key={index}
            type="button"
            className={`p-[6px_10px] hover:bg-gray-200 ${
              tool.active ? "bg-gray-300" : ""
            } ${tool.disabled ? "cursor-not-allowed opacity-50" : ""}`}
            onClick={tool.onClick}
            disabled={tool.disabled}
          >
            {tool.icon}
          </button>
        ))}
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
