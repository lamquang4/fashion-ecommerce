"use client";
import useGetSize from "@/hooks/useGetSize";
import useUpdateSize from "@/hooks/useUpdateSize";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function EditSize() {
  const [data, setData] = useState({
    namesize: "",
  });
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { size, mutate, isLoading } = useGetSize(id);
  const { updateSize, isLoading: isLoadingUpdateSize } = useUpdateSize(id);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isLoading) return;

    if (!size) {
      toast.error("Không tìm thấy kích thước");
      router.push("/size");
      return;
    }
  }, [size, isLoading, router]);

  useEffect(() => {
    if (size) {
      setData({
        namesize: size.namesize,
      });
    }
  }, [size]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateSize({
        namesize: data.namesize.trim(),
      });
      toast.success("Cập nhật thành công!");
      mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };

  return (
    <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-full">
      <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
        <h1 className="font-bold text-[1.5rem] text-[#74767d]">
          Chỉnh sửa kích thước
        </h1>

        <div className="flex gap-[25px] w-full flex-col">
          <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
            <p className="font-bold text-[1rem] text-[#74767d]">
              Thông tin chung
            </p>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem] text-black">
                Kích thước
              </label>
              <input
                type="text"
                name="namesize"
                value={data.namesize}
                onChange={handleChange}
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <button
            disabled={isLoadingUpdateSize}
            type="submit"
            className="p-[6px_10px] bg-teal-500 text-white text-[0.9rem] font-medium text-center rounded-sm hover:bg-teal-600"
          >
            {isLoadingUpdateSize ? "Đang cập nhật..." : "Cập nhật"}
          </button>
          <Link
            href="/size"
            className="p-[6px_10px] bg-red-500 text-white text-[0.9rem] text-center rounded-sm"
          >
            Trở về
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditSize;
