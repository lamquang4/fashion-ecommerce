"use client";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import TextBoxEditor from "../TextBoxEditor/TextBoxEditor";
import { useInputImage } from "@/hooks/useInputImage";
import InputImage from "../InputImage";
import toast from "react-hot-toast";
import useAddBlog from "@/hooks/useAddBlog";

function AddBlog() {
  const draftId = useRef<string>(crypto.randomUUID());

  const [data, setData] = useState({
    title: "",
    summary: "",
    content: "",
    status: "",
  });

  const { addBlog, isLoading } = useAddBlog();
  const {
    previewImages,
    setPreviewImages,
    selectedFiles,
    setSelectedFiles,
    handlePreviewImage,
    handleRemovePreviewImage,
  } = useInputImage(1);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentChange = useCallback((val: string) => {
    setData((prev) => ({ ...prev, content: val }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", data.title.trim());
    formData.append("summary", data.summary.trim());
    formData.append("content", data.content.trim());
    formData.append("draftId", draftId.current);
    formData.append("status", data.status);
    if (selectedFiles[0]) {
      formData.append("image", selectedFiles[0]);
    }

    if (!selectedFiles) {
      toast.error("Hình nền bài viết không để trống");
      return;
    }

    try {
      await addBlog(formData);

      setData({
        title: "",
        summary: "",
        content: "",
        status: "",
      });
      setPreviewImages([]);
      setSelectedFiles([]);
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };

  return (
    <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-auto">
      <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
        <h2 className="text-[#74767d]">Thêm bài viết</h2>

        <div className="flex gap-[25px] w-full flex-col">
          <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[25px] w-full">
            <InputImage
              InputId="img-blog"
              previewImages={previewImages}
              onPreviewImage={handlePreviewImage}
              onRemovePreviewImage={handleRemovePreviewImage}
              blockIndex={0}
            />
          </div>

          <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[15px] w-full">
            <h5 className="font-bold text-[#74767d]">Thông tin chung</h5>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem]  font-medium">
                Tiêu đề
              </label>
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={handleChange}
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem] font-medium">
                Tình trạng
              </label>
              <select
                name="status"
                value={data.status}
                onChange={handleChange}
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
              >
                <option value="">Chọn tình trạng</option>
                <option value="1">Công bố</option>
                <option value="0">Ẩn</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem]  font-medium">
                Tóm tắt
              </label>
              <textarea
                name="summary"
                value={data.summary}
                onChange={handleChange}
                className="border border-gray-300 h-[120px] p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
              ></textarea>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem]  font-medium">
                Nội dung
              </label>
              <TextBoxEditor
                content={data.content}
                onChange={handleContentChange}
                draftId={draftId.current}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <button
            disabled={isLoading}
            type="submit"
            className="p-[6px_10px] bg-teal-500 text-white text-[0.9rem] font-medium text-center hover:bg-teal-600 rounded-sm"
          >
            {isLoading ? "Đang thêm..." : "Thêm"}
          </button>
          <Link
            href="/blog"
            className="p-[6px_10px] bg-red-500 text-white text-[0.9rem] text-center hover:bg-red-600 rounded-sm"
          >
            Trở về
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddBlog;
