"use client";
import Link from "next/link";
import React, { useState } from "react";
import InputImage from "./InputImage";
import TinyMCEEditor from "./TinyMCEEditor";
import Image from "./Image";
import { VscTrash } from "react-icons/vsc";
import ImageViewer from "./ImageViewer";
import { useImageViewer } from "@/hooks/useImageViewer";
function EditBlog() {
  const [data, setData] = useState({
    title: "",
    status: "",
    content: "",
  });

  const {
    previewImages,
    setPreviewImages,
    selectedFiles,
    setSelectedFiles,
    handlePreviewImage,
    handleRemovePreviewImage,
  } = useImageViewer(1);

  const [openViewer, setOpenViewer] = useState(false);
  const [viewerImage, setViewerImage] = useState<string>("");
  const handleOpenViewer = (image: string) => {
    setViewerImage(image);
    setOpenViewer(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-auto">
        <form className="flex flex-col gap-6 w-full">
          <h1 className="font-bold text-[1.5rem] text-[#74767d]">
            Chỉnh sửa tin tức
          </h1>

          <div className="flex gap-[25px] w-full flex-col">
            <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
              <InputImage
                InputId="img-blog"
                previewImages={previewImages}
                handlePreviewImage={handlePreviewImage}
                handleRemovePreviewImage={handleRemovePreviewImage}
                setPreviewImages={setPreviewImages}
                setSelectedFiles={setSelectedFiles}
              />

              <div className="flex gap-3 flex-wrap justify-center">
                <div className=" relative">
                  <div
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleOpenViewer("assets/banner/banner-new.png");
                    }}
                  >
                    <Image
                      Src={"assets/banner/banner-new.png"}
                      Alt={""}
                      ClassName="w-full max-w-[250px]"
                      loadingType="eager"
                    />
                  </div>

                  <div className="absolute top-[6px] right-[6px]">
                    <button>
                      <VscTrash size={22} className="text-[#d9534f]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
              <p className="font-bold text-[1rem] text-[#74767d] mb-[10px]">
                Thông tin chung
              </p>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[0.9rem] text-black">
                  Tiêu đề
                </label>
                <input
                  type="text"
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[0.9rem] text-black">
                  Nội dung
                </label>
                <TinyMCEEditor />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="" className="text-[0.9rem] text-black">
                  Tình trạng
                </label>
                <select
                  name="status"
                  value={data.status}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                >
                  <option value="">Chọn tình trạng</option>
                  <option value="0">Ẩn </option>
                  <option value="1">Công bố</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-6">
            <button
              type="submit"
              className="p-[6px_10px] bg-teal-500 text-white text-[0.9rem] font-medium text-center rounded-sm hover:bg-teal-600"
            >
              Cập nhật
            </button>
            <Link
              href="/blog"
              className="p-[6px_10px] bg-red-500 text-white text-[0.9rem] text-center rounded-sm"
            >
              Trở về
            </Link>
          </div>
        </form>
      </div>

      {openViewer && (
        <ImageViewer
          image={viewerImage}
          open={openViewer}
          onClose={() => setOpenViewer(false)}
        />
      )}
    </>
  );
}

export default EditBlog;
