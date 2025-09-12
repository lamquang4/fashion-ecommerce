"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import InputImage from "./InputImage";
import Image from "./Image";
import ImageViewer from "./ImageViewer";
import useUpdateCategory from "@/hooks/useUpdateCategory";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import useGetCategory from "@/hooks/useGetCategory";
import { useInputImage } from "@/hooks/useInputImage";
import Loading from "./Loading";
function EditCategory() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState({
    namecategory: "",
    gender: "",
    image: "",
  });
  const [openViewer, setOpenViewer] = useState(false);
  const [viewerImage, setViewerImage] = useState<string>("");

  const { category, mutate, isLoading } = useGetCategory(id);
  const { updateCategory, isLoading: isLoadingUpdatedCategory } =
    useUpdateCategory(id);

  const {
    previewImages,
    setPreviewImages,
    selectedFiles,
    setSelectedFiles,
    handlePreviewImage,
    handleRemovePreviewImage,
  } = useInputImage(1);

  useEffect(() => {
    if (isLoading) return;

    if (!category) {
      toast.error("Không tìm thấy danh mục");
      router.push("/category");
      return;
    }
  }, [category, isLoading, router]);

  useEffect(() => {
    if (category) {
      setData({
        namecategory: category.namecategory,
        gender: String(category.gender),
        image: category.image,
      });
    }
  }, [category]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleOpenViewer = (image: string) => {
    setViewerImage(image);
    setOpenViewer(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("namecategory", data.namecategory.trim());
    formData.append("gender", data.gender);
    if (selectedFiles[0]) {
      formData.append("image", selectedFiles[0]);
    }

    try {
      await updateCategory(formData);

      setPreviewImages([]);
      setSelectedFiles([]);
      mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };

  return (
    <>
      <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-auto">
        <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
          <h2 className="text-[#74767d]">Chỉnh sửa danh mục</h2>

          <div className="flex gap-[25px] w-full flex-col">
            <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[25px] w-full">
              <InputImage
                InputId="img-category"
                previewImages={previewImages}
                onPreviewImage={handlePreviewImage}
                onRemovePreviewImage={handleRemovePreviewImage}
                blockIndex={0}
              />

              <div className="flex gap-3 flex-wrap justify-center">
                {isLoading ? (
                  <Loading height={25} size={55} color="black" thickness={3} />
                ) : (
                  <div className=" relative">
                    <div
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (data.image) handleOpenViewer(data.image);
                      }}
                    >
                      {data.image && (
                        <Image
                          Src={data.image}
                          Alt={data.image}
                          ClassName="w-full max-w-[140px]"
                          loadingType="eager"
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[15px] w-full">
              <p className="font-bold text-[1rem] text-[#74767d]">
                Thông tin chung
              </p>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[0.9rem] font-medium">
                  Tên danh mục
                </label>
                <input
                  type="text"
                  name="namecategory"
                  value={data.namecategory}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[0.9rem] font-medium">
                  Giới tính
                </label>
                <select
                  name="gender"
                  value={data.gender}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                >
                  <option value="1">Nam</option>
                  <option value="0">Nữ</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-6">
            <button
              disabled={isLoadingUpdatedCategory}
              type="submit"
              className="p-[6px_10px] bg-teal-500 text-white text-[0.9rem] font-medium text-center hover:bg-teal-600 rounded-sm"
            >
              {isLoadingUpdatedCategory ? "Đang cập nhật..." : "Cập nhật"}
            </button>
            <Link
              href="/category"
              className="p-[6px_10px] bg-red-500 text-white text-[0.9rem] text-center hover:bg-red-600 rounded-sm"
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

export default EditCategory;
