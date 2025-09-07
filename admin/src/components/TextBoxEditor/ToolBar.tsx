"use client";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Editor } from "@tiptap/react";
import {
  LuAlignCenter,
  LuAlignLeft,
  LuAlignRight,
  LuBold,
  LuItalic,
  LuList,
  LuListOrdered,
  LuRedo,
  LuUnderline,
  LuUndo,
  LuVideo,
} from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { MdInsertLink } from "react-icons/md";
import { GoHorizontalRule } from "react-icons/go";
import { FaRegImage } from "react-icons/fa";
import { BsQuote } from "react-icons/bs";
import { TbCloudUpload } from "react-icons/tb";
import { VscTable } from "react-icons/vsc";

function ToolBar({ editor }: { editor: Editor | null }) {
  const [activeMarks, setActiveMarks] = useState<{
    bold: boolean;
    italic: boolean;
    underline: boolean;
  }>({
    bold: false,
    italic: false,
    underline: false,
  });
  const [openBlockStyle, setOpenBlockStyle] = useState<boolean>(false);
  const [openLink, setOpenLink] = useState<boolean>(false);
  const [openTable, setOpenTable] = useState<boolean>(false);
  const [openImage, setOpenImage] = useState<boolean>(false);
  const [currentBlock, setCurrentBlock] = useState<string>("Paragraph");
  const [linkUrl, setLinkUrl] = useState<string>("");
  const [textUrl, setTextUrl] = useState<string>("");
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const toggleBlockStyle = () => {
    setOpenBlockStyle((prev) => !prev);
  };

  const toggleLink = () => {
    setOpenLink((prev) => !prev);
  };

  const toggleTable = () => {
    setOpenTable((prev) => !prev);
  };

  const toggleImage = () => {
    setOpenImage((prev) => !prev);
  };

  useEffect(() => {
    if (!editor) return;

    const handler = ({ editor }: any) => {
      const level = [1, 2, 3, 4].find((lvl) =>
        editor.isActive("heading", { level: lvl })
      );
      setCurrentBlock(level ? `Heading ${level}` : "Paragraph");
    };

    const updateActiveMarks = () => {
      setActiveMarks({
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        underline: editor.isActive("underline"),
      });
    };

    editor.on("selectionUpdate", handler);
    editor.on("selectionUpdate", updateActiveMarks);
    editor.on("transaction", updateActiveMarks);

    // clean up
    return () => {
      editor.off("selectionUpdate", handler);
      editor.off("selectionUpdate", updateActiveMarks);
      editor.off("transaction", updateActiveMarks);
    };
  }, [editor]);

  const handleAddLink = () => {
    if (!linkUrl) return;

    if (textUrl) {
      editor
        ?.chain()
        .focus()
        .insertContent({
          type: "text",
          text: textUrl,
          marks: [{ type: "link", attrs: { href: linkUrl } }],
        })
        .run();
    } else {
      editor
        ?.chain()
        .focus()
        .insertContent({
          type: "text",
          text: linkUrl,
          marks: [{ type: "link", attrs: { href: linkUrl } }],
        })
        .run();
    }

    setLinkUrl("");
    setTextUrl("");
    toggleLink();
  };

  const handleAddTable = (row: number, col: number) => {
    if (row !== null && col !== null) {
      editor
        ?.chain()
        .focus()
        .insertTable({
          rows: row + 1,
          cols: col + 1,
          withHeaderRow: false,
        })
        .run();
    }
    toggleTable();
  };

  const handleAddImageUrl = useCallback(() => {
    const url = window.prompt("URL image");

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    e.target.value = "";

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  const handleAddVideoUrl = useCallback(() => {
    const url = window.prompt("URL video");

    if (url) {
      editor
        ?.chain()
        .focus()
        .setYoutubeVideo({
          src: url,
        })
        .run();
    }
  }, [editor]);

  const tools = [
    {
      label: <LuUndo size={18} />,
      onClick: () => editor?.chain().focus().undo().run(),
      active: false,
      title: "Undo",
      disabled: !editor?.can().undo(),
    },
    {
      label: <LuRedo size={18} />,
      onClick: () => editor?.chain().focus().redo().run(),
      active: false,
      title: "Redo",
      disabled: !editor?.can().redo(),
    },
    {
      type: "blockStyle",
      label: currentBlock,
      onClick: () => toggleBlockStyle(),
      isOpen: openBlockStyle,
      children: [
        {
          label: "Paragraph",
          onClick: () => {
            editor?.chain().focus().setParagraph().run();
            setCurrentBlock("Paragraph");
          },
          active: editor?.isActive("paragraph"),
        },
        {
          label: "Heading 1",
          onClick: () => {
            editor?.chain().focus().toggleHeading({ level: 1 }).run();
            setCurrentBlock("Heading 1");
          },
          active: editor?.isActive("heading", { level: 1 }),
        },
        {
          label: "Heading 2",
          onClick: () => {
            editor?.chain().focus().toggleHeading({ level: 2 }).run();
            setCurrentBlock("Heading 2");
          },
          active: editor?.isActive("heading", { level: 2 }),
        },
        {
          label: "Heading 3",
          onClick: () => {
            editor?.chain().focus().toggleHeading({ level: 3 }).run();
            setCurrentBlock("Heading 3");
          },
          active: editor?.isActive("heading", { level: 3 }),
        },
        {
          label: "Heading 4",
          onClick: () => {
            editor?.chain().focus().toggleHeading({ level: 4 }).run();
            setCurrentBlock("Heading 4");
          },
          active: editor?.isActive("heading", { level: 4 }),
        },
      ],
    },
    {
      label: <LuBold size={18} />,
      onClick: () => editor?.chain().focus().toggleBold().run(),
      active: activeMarks.bold,
      title: "Bold (Ctrl + B)",
    },
    {
      label: <LuItalic size={18} />,
      onClick: () => editor?.chain().focus().toggleItalic().run(),
      active: activeMarks.italic,
      title: "Italic (Ctrl + I)",
    },
    {
      label: <LuUnderline size={18} />,
      onClick: () => editor?.chain().focus().toggleUnderline().run(),
      active: activeMarks.underline,
      title: "Underline (Ctrl + U)",
    },
    {
      label: <LuAlignLeft size={18} />,
      onClick: () => editor?.chain().focus().setTextAlign("left").run(),
      active: editor?.isActive({ textAlign: "left" }),
      title: "Justify left",
    },
    {
      label: <LuAlignCenter size={18} />,
      onClick: () => editor?.chain().focus().setTextAlign("center").run(),
      active: editor?.isActive({ textAlign: "center" }),
      title: "Justify center",
    },
    {
      label: <LuAlignRight size={18} />,
      onClick: () => editor?.chain().focus().setTextAlign("right").run(),
      active: editor?.isActive({ textAlign: "right" }),
      title: "Justify right",
    },
    {
      label: <LuList size={18} />,
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
      active: editor?.isActive("bulletList"),
      title: "Bullet list",
    },
    {
      label: <LuListOrdered size={18} />,
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
      active: editor?.isActive("orderedList"),
      title: "Ordered list",
      disabled: !editor?.can().toggleOrderedList(),
    },
    {
      label: <BsQuote size={18} />,
      onClick: () => editor?.chain().focus().toggleBlockquote().run(),
      active: editor?.isActive("blockquote"),
      title: "Block quote",
    },
    {
      label: <GoHorizontalRule size={18} />,
      onClick: () => editor?.chain().focus().setHorizontalRule().run(),
      active: editor?.isActive("horizontalRule"),
      title: "Horizontal rule",
    },
    {
      type: "table",
      label: <VscTable size={18} />,
      onClick: () => toggleTable(),
      isOpen: openTable,
      title: "Table",
    },
    {
      type: "link",
      label: <MdInsertLink size={18} />,
      onClick: () => toggleLink(),
      isOpen: openLink,
      title: "Link",
    },
    {
      type: "image",
      label: <FaRegImage size={18} />,
      onClick: () => toggleImage(),
      isOpen: openImage,
      title: "Image",
      children: [
        {
          label: (
            <>
              <TbCloudUpload size={18} /> <span>Upload</span>
              <input
                type="file"
                accept=".png,.jpg,.webp"
                ref={inputRef}
                className="hidden"
                onChange={handleImageUpload}
              />
            </>
          ),
          onClick: () => inputRef.current?.click(),
          active: false,
        },
        {
          label: (
            <>
              <FaRegImage size={18} /> <span>By url</span>
            </>
          ),
          onClick: () => handleAddImageUrl(),
          active: false,
        },
      ],
    },
    {
      label: <LuVideo size={18} />,
      onClick: () => handleAddVideoUrl(),
      active: false,
      title: "Video",
    },
  ];

  return (
    <div className="border border-gray-300 border-b-0 bg-gray-50 w-full">
      <div className="flex items-center flex-wrap gap-x-0.5">
        {tools.map((tool, i) =>
          tool.type === "blockStyle" ? (
            <div
              key={`tool-${i}`}
              className="relative"
              onMouseOver={tool.onClick}
              onMouseOut={tool.onClick}
            >
              <button
                type="button"
                title={tool.title}
                className="w-[130px] border-l border-r border-gray-300 px-[6px] flex items-center gap-1 justify-between hover:bg-gray-100 bg-gray-50"
              >
                {tool.label} <IoIosArrowDown size={14} />
              </button>

              {tool.isOpen && (
                <div className="absolute left-0 top-full bg-white w-[130px] z-6 border border-gray-200 shadow-md">
                  {tool.children?.map((child, idx) => (
                    <div key={`block-${idx}`}>
                      <button
                        type="button"
                        onClick={child.onClick}
                        className={`flex items-center justify-between w-full p-[6px]  ${
                          child.active ? "bg-gray-200" : "hover:bg-gray-100"
                        }`}
                      >
                        <span>{child.label}</span>
                        {child.active && <IoCheckmark size={14} />}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : tool.type === "link" ? (
            <div
              key={`tool-${i}`}
              className="relative  "
              onMouseEnter={tool.onClick}
              onMouseLeave={tool.onClick}
            >
              <button
                type="button"
                title={tool.title}
                className="p-[6px] flex items-center  gap-1 justify-between hover:bg-gray-100 bg-gray-50"
              >
                {tool.label}
              </button>
              {tool.isOpen && (
                <div className="absolute left-1/2 top-full -translate-x-1/2 w-[200px] bg-white z-6 border border-gray-200 shadow-md">
                  <form className="flex flex-col gap-[10px] items-center p-2">
                    <input
                      type="url"
                      placeholder="Enter link url..."
                      onChange={(e) => setLinkUrl(e.target.value)}
                      required
                      className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                    />
                    <input
                      type="text"
                      placeholder="Enter link text..."
                      onChange={(e) => setTextUrl(e.target.value)}
                      className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                    />
                    <button
                      type="submit"
                      onClick={handleAddLink}
                      className="p-[4px_12px] font-medium border border-gray-200 bg-gray-50 hover:bg-gray-100 text-[0.9rem]   text-center  rounded-sm "
                    >
                      Lưu
                    </button>
                  </form>
                </div>
              )}
            </div>
          ) : tool.type === "table" ? (
            <div
              key={`tool-${i}`}
              className="relative  "
              onMouseEnter={tool.onClick}
              onMouseLeave={tool.onClick}
            >
              <button
                type="button"
                title={tool.title}
                className="p-[6px] flex items-center justify-between hover:bg-gray-100 bg-gray-50"
              >
                {tool.label}
              </button>

              {tool.isOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full min-w-max bg-white z-6 border border-gray-200 shadow-md p-2">
                  <div className="grid grid-cols-10 gap-1">
                    {Array.from({ length: 100 }).map((_, i) => {
                      // tính row = ô thứ i trong mảng chia grid 10 cột và làm tròn
                      const row = Math.floor(i / 10);
                      // tính col = ô thứ i trong mảng chia grid 10 cột và phần dư là cột
                      const col = i % 10;
                      const isActive =
                        hoveredRow !== null &&
                        hoveredCol !== null &&
                        row <= hoveredRow &&
                        col <= hoveredCol;
                      return (
                        <div
                          key={i}
                          className={`w-4 h-4 border border-gray-300 cursor-pointer transition-colors 
              ${isActive ? "bg-blue-200" : "hover:bg-blue-200"}`}
                          onMouseEnter={() => {
                            setHoveredRow(row);
                            setHoveredCol(col);
                          }}
                          onMouseLeave={() => {
                            setHoveredRow(null);
                            setHoveredCol(null);
                          }}
                          onClick={() => handleAddTable(row, col)}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : tool.type === "image" ? (
            <div
              key={`tool-${i}`}
              className="relative  "
              onMouseEnter={tool.onClick}
              onMouseLeave={tool.onClick}
            >
              <button
                type="button"
                title={tool.title}
                className="p-[6px] flex items-center justify-between hover:bg-gray-100 bg-gray-50"
              >
                {tool.label}
              </button>

              {tool.isOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full min-w-max bg-white z-6 border border-gray-200 shadow-md">
                  {tool.children?.map((child, index) => (
                    <button
                      key={`cc-${index}`}
                      type="button"
                      onClick={child.onClick}
                      className={`flex items-center w-full p-[6px] gap-1 bg-gray-50 
                       hover:bg-gray-100
                      `}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <button
              key={`tool-${i}`}
              type="button"
              onClick={tool.onClick}
              title={tool.title}
              className={`p-[6px] ${
                tool.active ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              {tool.label}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default memo(ToolBar);
