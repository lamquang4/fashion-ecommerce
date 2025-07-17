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

  const handleSort = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sortValue);
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

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
        className={`fixed top-0 right-0 w-[320px] h-full overflow-y-scroll overflow-x-hidden bg-white z-[25] px-[12px] pl-[20px] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-[0px]" : "translate-x-[320px]"
        }`}
      >
        <div className="sticky top-0 overflow-hidden bg-white z-[25] py-[15px] flex justify-between items-center">
          <h1 className="text-[1.4rem] font-semibold">Bộ lọc & Sắp xếp</h1>
          <button onClick={toggleMenu}>
            <HiMiniXMark size={32} color="black" />
          </button>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <hr className=" border-gray-300" />

          <div className="py-[15px]">
            <div className="flex items-center justify-between">
              <label className="block font-medium text-[1rem] uppercase pointer-events-none">
                Sắp xếp theo
              </label>
              <IoIosArrowDown size={18} />
            </div>

            <div className="mt-[15px]">
              <button
                type="button"
                onClick={() => handleSort("price-asc")}
                className="uppercase text-[0.95rem]"
              >
                Giá (thấp-cao)
              </button>
              <hr className="my-[12px] border-gray-300" />
              <button
                type="button"
                onClick={() => handleSort("price-desc")}
                className="uppercase text-[0.95rem]"
              >
                Giá (cao-thấp)
              </button>
              <hr className="my-[12px] border-gray-300" />
              <button
                type="button"
                onClick={() => handleSort("newest")}
                className="uppercase text-[0.95rem]"
              >
                Mới nhất
              </button>
              <hr className="my-[12px] border-gray-300" />
              <button
                type="button"
                onClick={() => handleSort("newest")}
                className="uppercase text-[0.95rem]"
              >
                Bán chạy nhất
              </button>
            </div>
          </div>

          <hr className=" border-gray-300" />

          <div className="py-[15px]">
            <div className="flex items-center justify-between">
              <label className="block font-medium text-[1rem] uppercase pointer-events-none">
                Giá
              </label>
              <IoIosArrowDown size={18} />
            </div>

            <div className="mt-[15px]">
              <div className="w-full flex items-center gap-[10px]">
                <div className="w-full flex h-[35px] items-center">
                  <span>Min</span>
                  <input
                    type="number"
                    name="min"
                    min={0}
                    className="w-full px-2 py-1 outline-none text-[0.9rem] ml-[12px] border border-gray-600"
                  />
                </div>
                <div className="flex items-center justify-center text-[2rem]">
                  -
                </div>
                <div className="w-full flex h-[35px] items-center">
                  <span>Max</span>
                  <input
                    type="number"
                    name="max"
                    max={1000000}
                    className="w-full px-2 py-1  outline-none text-[0.9rem] ml-[12px] border border-gray-600"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className=" border-gray-300 mb-[15px]" />

          <div className="sticky bottom-0 overflow-hidden bg-white z-[25] py-[15px] flex justify-center w-full">
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
