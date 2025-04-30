"use client";
import { Editor } from "@tiptap/react";
import { AiOutlineBold } from "react-icons/ai";
import { AiOutlineItalic } from "react-icons/ai";
import { MdOutlineFormatAlignLeft } from "react-icons/md";
import { MdOutlineFormatAlignRight } from "react-icons/md";
import { MdOutlineFormatAlignCenter } from "react-icons/md";
import { AiOutlineUnderline } from "react-icons/ai";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { BsTypeH1 } from "react-icons/bs";
import { BsTypeH2 } from "react-icons/bs";
import { BsTypeH3 } from "react-icons/bs";
import { FaRegImage } from "react-icons/fa6";
import { AiOutlineStrikethrough } from "react-icons/ai";
function Toolbar({ editor }: { editor: Editor }) {
  return (
    <div className="flex gap-1.5 p-1.5 border border-gray-300 items-center flex-wrap">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`${
          editor.isActive("heading", { level: 1 })
            ? "bg-[rgb(238,238,238)]"
            : ""
        } p-1`}
      >
        <BsTypeH1 size={17} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${
          editor.isActive("heading", { level: 2 })
            ? "bg-[rgb(238,238,238)]"
            : ""
        } p-1`}
      >
        <BsTypeH2 size={17} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${
          editor.isActive("heading", { level: 3 })
            ? "bg-[rgb(238,238,238)]"
            : ""
        } p-1`}
      >
        <BsTypeH3 size={17} />
      </button>

      <button
        type="button"
        onClick={() => {
          const isActive = editor.isActive("bold");
          editor.chain().focus();

          if (isActive) {
            editor.commands.unsetMark("bold");
          } else {
            editor.commands.setMark("bold");
          }
        }}
        className={`${
          editor.isActive("bold") ? "bg-[rgb(238,238,238)]" : ""
        } p-1`}
      >
        <AiOutlineBold size={17} />
      </button>

      <button
        type="button"
        onClick={() => {
          const isActive = editor.isActive("italic");
          editor.chain().focus();

          if (isActive) {
            editor.commands.unsetMark("italic");
          } else {
            editor.commands.setMark("italic");
          }
        }}
        className={`${
          editor.isActive("italic") ? "bg-[rgb(238,238,238)]" : ""
        } p-1`}
      >
        <AiOutlineItalic size={17} />
      </button>

      <button
        type="button"
        onClick={() => {
          const isActive = editor.isActive("underline");
          editor.chain().focus();

          if (isActive) {
            editor.commands.unsetMark("underline");
          } else {
            editor.commands.setMark("underline");
          }
        }}
        className={`${
          editor.isActive("underline") ? "bg-[rgb(238,238,238)]" : ""
        } p-1`}
      >
        <AiOutlineUnderline size={18} />
      </button>

      <button
        type="button"
        onClick={() => {
          const isActive = editor.isActive("strike");
          editor.chain().focus();

          if (isActive) {
            editor.commands.unsetMark("strike");
          } else {
            editor.commands.setMark("strike");
          }
        }}
        className={`${
          editor.isActive("strike") ? "bg-[rgb(238,238,238)]" : ""
        } p-1`}
      >
        <AiOutlineStrikethrough size={17} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`${
          !editor.isActive({ textAlign: "center" }) &&
          !editor.isActive({ textAlign: "right" })
            ? "bg-[rgb(238,238,238)]"
            : ""
        } p-1`}
      >
        <MdOutlineFormatAlignLeft size={18} />
      </button>

      <button
        type="button"
        onClick={() => {
          const isActive = editor.isActive({ textAlign: "center" });
          editor.chain().focus();

          if (isActive) {
            editor.chain().setTextAlign("left").run();
          } else {
            editor.chain().setTextAlign("center").run();
          }
        }}
        className={`${
          editor.isActive({ textAlign: "center" })
            ? "bg-[rgb(238,238,238)]"
            : ""
        } p-1`}
      >
        <MdOutlineFormatAlignCenter size={18} />
      </button>

      <button
        type="button"
        onClick={() => {
          const isActive = editor.isActive({ textAlign: "right" });
          editor.chain().focus();

          if (isActive) {
            editor.chain().setTextAlign("left").run();
          } else {
            editor.chain().setTextAlign("right").run();
          }
        }}
        className={`${
          editor.isActive({ textAlign: "right" }) ? "bg-[rgb(238,238,238)]" : ""
        } p-1`}
      >
        <MdOutlineFormatAlignRight size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${
          editor.isActive("bulletList") ? "bg-[rgb(238,238,238)]" : ""
        } p-1`}
      >
        <MdOutlineFormatListBulleted size={20} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${
          editor.isActive("orderedList") ? "bg-[rgb(238,238,238)]" : ""
        } p-1`}
      >
        <MdOutlineFormatListNumbered size={20} />
      </button>

      <label htmlFor="image-upload" className="p-1 cursor-pointer">
        <FaRegImage size={17} />
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file || !editor) return;

          const reader = new FileReader();
          reader.onload = () => {
            editor
              .chain()
              .focus()
              .setImage({ src: reader.result as string })
              .run();
          };
          reader.readAsDataURL(file);
        }}
      />
    </div>
  );
}

export default Toolbar;
