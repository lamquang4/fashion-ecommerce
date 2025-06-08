"use client";
import Link from "next/link";
import { VscTrash } from "react-icons/vsc";
import { LiaEdit } from "react-icons/lia";
import { IoMdAddCircle } from "react-icons/io";
import { TbLock } from "react-icons/tb";
import Pagination from "./Pagination";
import FilterDropDownMenu from "./FilterDropDownMenu";

function Admin() {
  const array = [
    {
      name: "Tất cả",
      status: null,
    },
    {
      name: "Bình thường",
      status: 1,
    },
    {
      name: "Đã chặn",
      status: 0,
    },
  ];
  return (
    <>
      <div className="p-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
        <h1 className="font-bold mb-[20px] text-[1.5rem] text-[#74767d]">
          Quản trị viên (20)
        </h1>

        <Link
          href={"/add-admin"}
          className="bg-[#daf4f0] border-0 cursor-pointer text-[0.9rem] font-medium w-[90px] !flex p-[10px_12px] items-center justify-center gap-[5px] text-[#0ab39c] hover:bg-[#0ab39c] hover:text-white"
        >
          <IoMdAddCircle size={22} /> Thêm
        </Link>
      </div>

      <div className="shadow-sm bg-white rounded-[3px] w-full overflow-auto">
        <div className="p-[1.2rem] flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="search"
              placeholder="Tìm kiếm..."
              className="p-[6px_10px] border border-[#b0b0b0] inline-block text-[#666] outline-none text-[0.9rem]"
            />
          </div>
        </div>

        <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full">
          <thead>
            <tr className="bg-[#E9EDF2]">
              <th className="pl-[1rem] text-left text-[#444] text-[0.9rem]">
                Họ tên
              </th>

              <th className="text-left text-[#444] text-[0.9rem]">Email</th>
              <th className="text-left text-[#444] text-[0.9rem]">Sinh nhật</th>
              <th className="text-left text-[#444] text-[0.9rem]">Ngày tạo</th>
              <th className="text-left text-[#444] text-[0.9rem]">Vai trò</th>
              <th className="text-left text-[#444] text-[0.9rem] relative">
                <FilterDropDownMenu title="Tình trạng" array={array} />
              </th>
              <th className="p-[1rem_0] text-left text-[#444] text-[0.9rem]">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pl-[1rem] py-[1rem] w-[300px]">Lam Dieu Quang</td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">
                quanglam@gmail.com
              </td>

              <td className="py-[1rem] text-[0.9rem] text-[#444]">1/5/2004</td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">20/4/2025</td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">
                Siêu quản trị viên
              </td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">
                Bình thường
              </td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">
                <div className="flex items-center gap-[15px]">
                  <button>
                    <TbLock size={22} className="text-[#74767d]" />
                    {/*
   <TbLockOpen
                            size={22}
                            className="text-[#74767d]"
                          />
                    */}
                  </button>
                  <Link href={"/edit-admin"}>
                    <LiaEdit size={22} className="text-[#076ffe]" />
                  </Link>

                  <button>
                    <VscTrash size={22} className="text-[#d9534f]" />
                  </button>
                </div>
              </td>
            </tr>

            {/*
           <tr>
                <td colSpan="8" className="w-full h-[70vh]">
                  <div className="flex flex-col justify-center items-center">
                    <Image
                      Src={"/assets/other/notfound1.png"}
                      Alt={""}
                      ClassName={"w-[180px]"}
                          loadingType="lazy"
                    />
                  </div>
                </td>
              </tr>
    */}
          </tbody>
        </table>
      </div>

      <Pagination />
    </>
  );
}

export default Admin;
