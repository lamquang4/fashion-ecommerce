"use client";
import useGetColor from "@/hooks/useGetColor";
import useUpdateColor from "@/hooks/useUpdateColor";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function EditColor() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { color, mutate, isLoading } = useGetColor(id);
  const { updateColor, isLoading: isLoadingUpdateColor } = useUpdateColor(id);

  const [data, setData] = useState({
    namecolor: "",
    codecolor: "#000000",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  useEffect(() => {
    if (isLoading) return;

    if (!color) {
      toast.error("Không tìm thấy màu");
      router.push("/color");
      return;
    }
  }, [color, isLoading, router]);

  useEffect(() => {
    if (color) {
      setData({
        namecolor: color.namecolor,
        codecolor: color.codecolor,
      });
    }
  }, [color]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateColor({
        namecolor: data.namecolor.trim(),
        codecolor: data.codecolor,
      });

      mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };

  return (
    <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-full">
      <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
        <h1 className="font-bold text-[1.5rem] text-[#74767d]">
          Chỉnh sửa màu
        </h1>

        <div className="flex gap-[25px] w-full flex-col">
          <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
            <p className="font-bold text-[1rem] text-[#74767d]">
              Thông tin chung
            </p>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem] text-black">
                Tên màu
              </label>
              <input
                type="text"
                name="namecolor"
                value={data.namecolor}
                onChange={handleChange}
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem] text-black">
                Chọn màu: {data.codecolor}
              </label>
              <input
                type="color"
                name="codecolor"
                value={data.codecolor}
                onChange={handleChange}
                required
                className="border border-gray-300 p-1 text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <button
            disabled={isLoadingUpdateColor}
            type="submit"
            className="p-[6px_10px] bg-teal-500 text-white text-[0.9rem] font-medium text-center rounded-sm hover:bg-teal-600"
          >
            {isLoadingUpdateColor ? "Đang cập nhật..." : "Cập nhật"}
          </button>
          <Link
            href="/color"
            className="p-[6px_10px] bg-red-500 text-white text-[0.9rem] text-center rounded-sm"
          >
            Trở về
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditColor;
