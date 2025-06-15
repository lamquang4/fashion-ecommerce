"use client";
import Link from "next/link";
import { VscTrash } from "react-icons/vsc";
import { LiaEdit } from "react-icons/lia";
import { IoMdAddCircle } from "react-icons/io";
import { TbLock, TbLockOpen } from "react-icons/tb";
import Pagination from "./Pagination";
import FilterDropDownMenu from "./FilterDropDownMenu";
import useGetCustomers from "@/hooks/useGetCustomers";
import Image from "./Image";
import useBlockUser from "@/hooks/useBlockUser";
import useDeleteUser from "@/hooks/useDeleteUser";
import { useAppSelector } from "@/redux/hook";
import Loading from "./Loading";
function Customer() {
  const { customers, fetchCustomers } = useGetCustomers();
  const { blockUser } = useBlockUser(fetchCustomers);
  const { deleteUser } = useDeleteUser(fetchCustomers);
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
          Khách hàng ({customers.length})
        </h1>

        <Link
          href={"/add-customer"}
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
              <th className="text-left text-[#444] text-[0.9rem] relative">
                <FilterDropDownMenu title="Tình trạng" array={array} />
              </th>
              <th className="p-[1rem_0] text-left text-[#444] text-[0.9rem]">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="w-full">
                  <Loading />
                </td>
              </tr>
            ) : customers.length > 0 ? (
              customers.map((customer, index) => (
                <tr key={index}>
                  <td className="pl-[1rem] py-[1rem] text-[0.9rem]">
                    {customer.fullname}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {customer.email}
                  </td>

                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {new Date(customer.birthday as string).toLocaleDateString(
                      "vi-VN"
                    )}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {new Date(customer.createdAt as string).toLocaleDateString(
                      "vi-VN"
                    )}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {customer.status === 1 ? "Bình thường" : "Đã chặn"}
                  </td>
                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    <div className="flex items-center gap-[15px]">
                      <button
                        onClick={() =>
                          blockUser({
                            _id: customer._id,
                            status: customer.status === 1 ? 0 : 1,
                          })
                        }
                      >
                        {customer.status === 1 ? (
                          <TbLock size={22} className="text-[#74767d]" />
                        ) : (
                          <TbLockOpen size={22} className="text-[#74767d]" />
                        )}
                      </button>

                      <Link href={`/edit-customer/${customer._id}`}>
                        <LiaEdit size={22} className="text-[#076ffe]" />
                      </Link>

                      <button onClick={() => deleteUser(customer._id)}>
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

      <Pagination />
    </>
  );
}

export default Customer;
