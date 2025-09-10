"use client";
import { Editor } from "@tiptap/react";
import { memo, useState } from "react";
import { MdInsertLink } from "react-icons/md";

function LinkTool({ editor }: { editor: Editor | null }) {
  const [dataLink, setDataLink] = useState({
    linkUrl: "",
    textUrl: "",
  });
  const [openLink, setOpenLink] = useState<boolean>(false);

  const handleChangeDataLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataLink((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleLink = () => {
    setOpenLink((prev) => !prev);
  };

  const handleAddLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!dataLink.linkUrl) return;

    const textToInsert = dataLink.textUrl || dataLink.linkUrl;

    editor
      ?.chain()
      .focus()
      .insertContent({
        type: "text",
        text: textToInsert,
        marks: [{ type: "link", attrs: { href: dataLink.linkUrl } }],
      })
      .run();

    setDataLink({
      linkUrl: "",
      textUrl: "",
    });
    setOpenLink(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        title="Link"
        onClick={toggleLink}
        className="p-2 flex items-center gap-1.5 justify-between hover:bg-gray-100 bg-gray-50"
      >
        <MdInsertLink size={18} />
      </button>

      {openLink && (
        <div className="absolute left-1/2 top-full -translate-x-1/2 w-[200px] bg-white z-10 border border-gray-200 shadow-md">
          <form
            className="flex flex-col gap-[10px] items-center p-2"
            onSubmit={handleAddLink}
          >
            <input
              type="url"
              name="linkUrl"
              placeholder="Enter link url..."
              value={dataLink.linkUrl}
              onChange={handleChangeDataLink}
              required
              className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400"
            />
            <input
              type="text"
              name="textUrl"
              placeholder="Enter link text..."
              value={dataLink.textUrl}
              onChange={handleChangeDataLink}
              className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400"
            />
            <button
              type="submit"
              className="p-[4px_12px] font-medium border border-gray-200 bg-gray-50 hover:bg-gray-100 text-[0.9rem] rounded-sm"
            >
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default memo(LinkTool);
