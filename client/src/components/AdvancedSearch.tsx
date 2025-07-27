"use client";
import { HiMiniXMark } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import Overplay from "./Overplay";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
type AdvancedSearchProps = {
  isOpen: boolean;
  toggleMenu: () => void;
};
function AdvancedSearch({ isOpen, toggleMenu }: AdvancedSearchProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const minRaw = formData.get("min") as string;
    const maxRaw = formData.get("max") as string;

    const min = parseInt(minRaw || "0", 10);
    const max = parseInt(maxRaw || "10000000", 10);

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (!isNaN(min) && !isNaN(max) && min > max) {
      params.delete("min");
      params.delete("max");
    } else {
      if (!isNaN(min)) params.set("min", min.toString());
      else params.delete("min");

      if (!isNaN(max)) params.set("max", max.toString());
      else params.delete("max");
    }

    router.push(`${pathname}?${params.toString()}`);
    toggleMenu();
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-[320px] h-full overflow-y-scroll overflow-x-hidden bg-white z-[25] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-[0px]" : "translate-x-[-320px]"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="sticky top-0 overflow-hidden p-3.5 bg-white z-[25] flex justify-between items-center">
          <h2 className="text-[1.2rem] font-semibold">Bộ lọc & Sắp xếp</h2>
          <button onClick={toggleMenu}>
            <HiMiniXMark size={30} color="black" />
          </button>
        </div>

        <div className=" p-3.5 border-t border-gray-200">
          <h2 className="block font-semibold text-[1rem] mb-2.5">
            Bộ lọc đã chọn
          </h2>
          <div className="flex items-center flex-wrap gap-3">
            <div className="bg-[#f5f5f5] border border-gray-300 rounded-[4px] p-[9px_10px] flex justify-between items-center gap-1.5 cursor-pointer">
              <button>
                <HiMiniXMark size={18} color="black" />
              </button>
              <span className="text-[0.9rem]">Bán chạy</span>
            </div>

            <div className="bg-[#f5f5f5] border border-gray-300 rounded-[4px] p-[9px_10px] flex justify-between items-center gap-1.5 cursor-pointer">
              <button>
                <HiMiniXMark size={18} color="black" />
              </button>
              <span className="text-[0.9rem]">Đang giảm giá</span>
            </div>

            <div className="bg-[#f5f5f5] border border-gray-300 rounded-[4px] p-[9px_10px] flex justify-between items-center gap-1.5 cursor-pointer">
              <button>
                <HiMiniXMark size={18} color="black" />
              </button>
              <span className="text-[0.9rem]">Áo sơ mi</span>
            </div>
          </div>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <div>
            <div className="flex items-center justify-between p-3.5 border-t border-gray-200">
              <h2 className="block font-semibold text-[1rem] uppercase">Giá</h2>
              <IoIosArrowDown size={18} />
            </div>

            <div className="w-full flex justify-center items-center gap-[10px] p-3.5 border-t border-gray-200">
              <div className="border border-gray-300 p-2.5 w-full">
                <label className="text-sm text-gray-600 block mb-1">
                  Tối thiểu
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-full text-[0.9rem] outline-none border-none p-0"
                    name="min"
                    inputMode="numeric"
                    min={0}
                  />
                  <span className="text-sm text-gray-600">đ</span>
                </div>
              </div>

              <div className="border border-gray-300 p-2.5 w-full">
                <label className="text-sm text-gray-600 block mb-1">
                  Tối đa
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-full text-[0.9rem] outline-none border-none p-0"
                    name="max"
                    inputMode="numeric"
                    max={1000000}
                  />
                  <span className="text-sm text-gray-600">đ</span>
                </div>
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 overflow-hidden bg-white z-[25] p-3.5 borer-t border-gray-200 flex justify-center w-full">
            <button
              type="submit"
              className="bg-black text-white px-[18px] py-[10px] text-[0.95rem] flex justify-center items-center gap-2.5 font-semibold"
            >
              Áp dụng
              <FaArrowRightLong size={20} />
            </button>
          </div>
        </form>
      </div>

      {isOpen && <Overplay closeMenu={toggleMenu} IndexForZ={15} />}
    </>
  );
}

export default AdvancedSearch;
