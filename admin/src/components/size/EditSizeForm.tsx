"use client";
import useGetSize from "@/hooks/useGetSize";
import useUpdateSize from "@/hooks/useUpdateSize";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function EditSizeForm() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState({
    namesize: "",
    chestMin: 1,
    chestMax: 1,
    waistMin: 1,
    waistMax: 1,
    hipMin: 1,
    hipMax: 1,
    heightMin: 1,
    heightMax: 1,
    weightMin: 1,
    weightMax: 1,
  });

  const { size, mutate, isLoading } = useGetSize(id);
  const { updateSize, isLoading: isLoadingUpdateSize } = useUpdateSize(id);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
        chestMin: size.chest[0],
        chestMax: size.chest[1],
        waistMin: size.waist[0],
        waistMax: size.waist[1],
        hipMin: size.hip[0],
        hipMax: size.hip[1],
        heightMin: size.height[0],
        heightMax: size.height[1],
        weightMin: size.weight[0],
        weightMax: size.weight[1],
      });
    }
  }, [size]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (data.chestMin >= data.chestMax) {
      toast.error("Vòng ngực tối thiểu không được lớn hơn hoặc bằng tối đa");
      return;
    }
    if (data.waistMin >= data.waistMax) {
      toast.error("Vòng eo tối thiểu không được lớn hơn hoặc bằng tối đa");
      return;
    }
    if (data.hipMin >= data.hipMax) {
      toast.error("Vòng mông tối thiểu không được lớn hơn hoặc bằng tối đa");
      return;
    }
    if (data.heightMin >= data.heightMax) {
      toast.error("Chiều cao tối thiểu không được lớn hơn hoặc bằng tối đa");
      return;
    }
    if (data.weightMin >= data.weightMax) {
      toast.error("Cân nặng tối thiểu không được lớn hơn hoặc bằng tối đa");
      return;
    }

    try {
      await updateSize({
        namesize: data.namesize.trim(),
        chest: [data.chestMin, data.chestMax],
        waist: [data.waistMin, data.waistMax],
        hip: [data.hipMin, data.hipMax],
        height: [data.heightMin, data.heightMax],
        weight: [data.weightMin, data.weightMax],
      });

      mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };

  return (
    <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-full">
      <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
        <h2 className="text-[#74767d]">Chỉnh sửa kích thước</h2>

        <div className="flex gap-[25px] w-full flex-col">
          <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
            <h5 className="font-bold text-[#74767d]">Thông tin chung</h5>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem] font-medium">
                Kích thước
              </label>
              <input
                type="text"
                name="namesize"
                value={data.namesize}
                onChange={handleChange}
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
              />
            </div>
          </div>
        </div>

        <div className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
          <h5 className="font-bold text-[#74767d]">Thông số</h5>

          <div className="flex gap-[15px]">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-[0.9rem] font-medium">
                Vòng ngực tối thiểu (cm)
              </label>
              <input
                type="number"
                name="chestMin"
                inputMode="numeric"
                value={data.chestMin}
                onChange={handleChange}
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-[0.9rem] font-medium">
                Vòng ngực tối đa (cm)
              </label>
              <input
                type="number"
                name="chestMax"
                inputMode="numeric"
                value={data.chestMax}
                onChange={handleChange}
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
              />
            </div>
          </div>

          <div className="flex gap-[15px]">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-[0.9rem] font-medium">
                Vòng eo tối thiểu (cm)
              </label>
              <input
                type="number"
                name="waistMin"
                inputMode="numeric"
                value={data.waistMin}
                onChange={handleChange}
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-[0.9rem] font-medium">
                Vòng eo tối đa (cm)
              </label>
              <input
                type="number"
                name="waistMax"
                inputMode="numeric"
                value={data.waistMax}
                onChange={handleChange}
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
              />
            </div>
          </div>

          <div className="flex gap-[15px]">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-[0.9rem] font-medium">
                Vòng mông tối thiểu (cm)
              </label>
              <input
                type="number"
                name="hipMin"
                inputMode="numeric"
                value={data.hipMin}
                onChange={handleChange}
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-[0.9rem] font-medium">
                Vòng mông tối đa (cm)
              </label>
              <input
                type="number"
                name="hipMax"
                inputMode="numeric"
                value={data.hipMax}
                onChange={handleChange}
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
              />
            </div>
          </div>

          <div className="flex gap-[15px]">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-[0.9rem] font-medium">
                Chiều cao tối thiểu (cm)
              </label>
              <input
                type="number"
                name="heightMin"
                inputMode="numeric"
                value={data.heightMin}
                onChange={handleChange}
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-[0.9rem] font-medium">
                Chiều cao tối đa (cm)
              </label>
              <input
                type="number"
                name="heightMax"
                inputMode="numeric"
                value={data.heightMax}
                onChange={handleChange}
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
              />
            </div>
          </div>

          <div className="flex gap-[15px]">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-[0.9rem] font-medium">
                Cân nặng tối thiểu (kg)
              </label>
              <input
                type="number"
                name="weightMin"
                inputMode="numeric"
                value={data.weightMin}
                onChange={handleChange}
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-[0.9rem] font-medium">
                Cân nặng tối đa (kg)
              </label>
              <input
                type="number"
                name="weightMax"
                inputMode="numeric"
                value={data.weightMax}
                onChange={handleChange}
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <button
            disabled={isLoadingUpdateSize}
            type="submit"
            className="p-[6px_10px] bg-teal-500 text-white text-[0.9rem] font-medium text-center hover:bg-teal-600 rounded-sm"
          >
            {isLoadingUpdateSize ? "Đang cập nhật..." : "Cập nhật"}
          </button>
          <Link
            href="/size"
            className="p-[6px_10px] bg-red-500 text-white text-[0.9rem] text-center hover:bg-red-600 rounded-sm"
          >
            Trở về
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditSizeForm;
