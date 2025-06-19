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
function EditCategory() {
  const [data, setData] = useState({
    namecategory: "",
    gender: "",
    image: "",
  });
  const [openViewer, setOpenViewer] = useState(false);
  const [viewerImage, setViewerImage] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  const handleOpenViewer = (image: string) => {
    setViewerImage(image);
    setOpenViewer(true);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const category = useGetCategory(id);

  useEffect(() => {
    if (category) {
      setData({
        namecategory: category.namecategory,
        gender: String(category.gender),
        image: category.image,
      });
    }
  }, [category]);

  const { updateCategory } = useUpdateCategory(id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("namecategory", data.namecategory);
    formData.append("gender", data.gender);
    if (image) {
      formData.append("image", image);
    }

    try {
      const updated = await updateCategory(formData);
      toast.success("Cập nhật thành công!");

      setData({
        namecategory: updated.namecategory,
        gender: String(updated.gender),
        image: `${updated.image}?t=${new Date().getTime()}`, // thêm thời gian
      });

      setSuccess(true);
      setImage(null);
      setTimeout(() => setSuccess(false), 100);
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };
  return (
    <>
      <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-auto">
        <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
          <h1 className="font-bold text-[1.5rem] text-[#74767d]">
            Chỉnh sửa danh mục
          </h1>

          <div className="flex gap-[25px] w-full flex-col">
            <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[15px] w-full">
              <InputImage
                max={1}
                InputId="img-category"
                onFileSelect={(files) => setImage(files[0])}
                success={success}
              />

              <div className="flex gap-3 flex-wrap justify-center">
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
              </div>
            </div>

            <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[15px] w-full">
              <p className="font-bold text-[1rem] text-[#74767d]">
                Thông tin chung
              </p>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[0.9rem] text-black">
                  Tên danh mục
                </label>
                <input
                  type="text"
                  name="namecategory"
                  value={data.namecategory}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[0.9rem] text-black">
                  Giới tính
                </label>
                <select
                  name="gender"
                  value={data.gender}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                >
                  <option value="">Chọn giới tính</option>
                  <option value="1">Nam</option>
                  <option value="0">Nữ</option>
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
              href="/category"
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

export default EditCategory;
