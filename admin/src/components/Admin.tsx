"use client";
import Link from "next/link";
import { VscTrash } from "react-icons/vsc";
import { LiaEdit } from "react-icons/lia";
import { IoMdAddCircle } from "react-icons/io";
import { TbLock, TbLockOpen } from "react-icons/tb";
import Pagination from "./Pagination";
import FilterDropDownMenu from "./FilterDropDownMenu";
import useGetAdmins from "@/hooks/useGetAdmins";
import Image from "./Image";
import useBlockUser from "@/hooks/useBlockUser";
import { useAppSelector } from "@/redux/hook";
import Loading from "./Loading";
import useDeleteUser from "@/hooks/useDeleteUser";
import InputSearch from "./InputSearch";
function Admin() {
  const {
    admins,
    fetchAdmins,
    totalPages,
    totalItems,
    currentPage,
    limit,
    setKeyword,
    setStatus,
  } = useGetAdmins();
  const { blockUser } = useBlockUser(fetchAdmins);
  const { deleteUser } = useDeleteUser(fetchAdmins);
  const loading = useAppSelector((state) => state.loadingSlice);

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
          Quản trị viên ({totalItems})
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
            <InputSearch onSearchChange={(val) => setKeyword(val)} />
          </div>
        </div>

        <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full">
          <thead>
            <tr className="bg-[#E9EDF2]">
              <th className="py-[1rem] pl-[1rem] text-left text-[#444] text-[0.9rem]">
                Họ tên
              </th>

              <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                Email
              </th>
              <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                Sinh nhật
              </th>
              <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                Ngày tạo
              </th>
              <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                Vai trò
              </th>
              <th className="text-left text-[#444] text-[0.9rem] relative">
                <FilterDropDownMenu
                  title="Tình trạng"
                  array={array}
                  onFilterChange={(val) => setStatus(val)}
                />
              </th>
              <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="w-full">
                  <Loading height={50} />
                </td>
              </tr>
            ) : admins.length > 0 ? (
              admins.map((admin, index) => (
                <tr key={index}>
                  <td className="pl-[1rem] text-[0.9rem] py-[1rem] w-[300px]">
                    {admin.fullname}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {admin.email}
                  </td>

                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {new Date(admin.birthday as string).toLocaleDateString(
                      "vi-VN"
                    )}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {new Date(admin.createdAt as string).toLocaleDateString(
                      "vi-VN"
                    )}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {admin.role === 0
                      ? "Siêu quản trị viên"
                      : admin.status === 1
                      ? "Nhân viên bán hàng"
                      : admin.status === 2
                      ? "Nhân viên nội dung"
                      : admin.status === 3
                      ? "Kế toán"
                      : ""}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {admin.status === 1 ? "Bình thường" : "Đã chặn"}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    <div className="flex items-center gap-[15px]">
                      <button
                        onClick={() =>
                          blockUser({
                            _id: admin._id,
                            status: admin.status === 1 ? 0 : 1,
                          })
                        }
                      >
                        {admin.status === 1 ? (
                          <TbLock size={22} className="text-[#74767d]" />
                        ) : (
                          <TbLockOpen size={22} className="text-[#74767d]" />
                        )}
                      </button>

                      <Link href={`/edit-admin/${admin._id}`}>
                        <LiaEdit size={22} className="text-[#076ffe]" />
                      </Link>

                      <button onClick={() => deleteUser(admin._id)}>
                        <VscTrash size={22} className="text-[#d9534f]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="w-full h-[70vh]">
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
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        limit={limit}
        totalItems={totalItems}
      />
    </>
  );
}

export default Admin;
