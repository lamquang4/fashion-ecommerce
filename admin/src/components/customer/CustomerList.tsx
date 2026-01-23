"use client";
import Link from "next/link";
import { VscTrash } from "react-icons/vsc";
import { LiaEdit } from "react-icons/lia";
import { TbLock, TbLockOpen } from "react-icons/tb";
import Pagination from "../Pagination";
import FilterDropDownMenu from "../FilterDropDownMenu";
import useGetCustomers from "@/hooks/useGetCustomers";
import Image from "../Image";
import useBlockUser from "@/hooks/useBlockUser";
import useDeleteUser from "@/hooks/useDeleteUser";
import Loading from "../Loading";
import InputSearch from "../InputSearch";
import toast from "react-hot-toast";
import ListHeader from "../list/ListHeader";
import ListBody from "../list/ListBody";
function Customer() {
  const {
    customers,
    mutate,
    isLoading,
    totalPages,
    totalItems,
    currentPage,
    limit,
  } = useGetCustomers();
  const { blockUser, isLoading: isLoadingBlockUser } = useBlockUser();
  const { deleteUser, isLoading: isLoadingDeleteUser } = useDeleteUser();

  const array = [
    {
      name: "Tất cả",
      value: null,
    },
    {
      name: "Bình thường",
      value: 1,
    },
    {
      name: "Đã chặn",
      value: 0,
    },
  ];

  const handleDelete = async (id: string) => {
    if (!id) {
      return;
    }
    try {
      await deleteUser(id);
      mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
      mutate();
    }
  };

  const handleBlock = async (id: string, status: number) => {
    if (!id && !status) {
      return;
    }
    try {
      await blockUser(id, status);
      mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
      mutate();
    }
  };
  return (
    <>
      <ListHeader title="Khách hàng" totalItems={totalItems} />

      <ListBody>
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full text-[0.9rem]">
          <thead>
            <tr className="bg-[#E9EDF2] text-left">
              <th className="p-[1rem]  ">Họ tên</th>

              <th className="p-[1rem]  ">Email</th>
              <th className="p-[1rem]  ">SĐT</th>
              <th className="p-[1rem]  ">Sinh nhật</th>
              <th className="p-[1rem]  ">Ngày tạo</th>
              <th className="p-[1rem]   relative">
                <FilterDropDownMenu
                  title="Tình trạng"
                  array={array}
                  paramName="status"
                />
              </th>
              <th className="p-[1rem]  ">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="w-full">
                  <Loading height={60} size={50} color="black" thickness={2} />
                </td>
              </tr>
            ) : customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer._id} className="hover:bg-[#f2f3f8]">
                  <td className="p-[1rem] text-[0.9rem] text-[#22BAA0] font-semibold">
                    {customer.fullname}
                  </td>
                  <td className="p-[1rem]  ">{customer.email}</td>
                  <td className="p-[1rem]  ">{customer.phone}</td>
                  <td className="p-[1rem]  ">
                    {new Date(customer.birthday as string).toLocaleDateString(
                      "vi-VN",
                    )}
                  </td>
                  <td className="p-[1rem]  ">
                    {new Date(customer.createdAt as string).toLocaleDateString(
                      "vi-VN",
                    )}
                  </td>
                  <td className="p-[1rem]  ">
                    {customer.status === 1 ? "Bình thường" : "Đã chặn"}
                  </td>
                  <td className="p-[1rem]  ">
                    <div className="flex items-center gap-[15px]">
                      <button
                        disabled={isLoadingBlockUser}
                        onClick={() =>
                          handleBlock(
                            customer._id || "",
                            customer.status === 1 ? 0 : 1,
                          )
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

                      <button
                        disabled={isLoadingDeleteUser}
                        onClick={() => handleDelete(customer._id || "")}
                      >
                        <VscTrash size={22} className="text-[#d9534f]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="w-full h-[70vh]">
                  <div className="flex justify-center items-center">
                    <Image
                      Src={"/assets/other/notfound1.png"}
                      Alt={""}
                      ClassName={"w-[135px]"}
                      loadingType="lazy"
                    />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </ListBody>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        limit={limit}
        totalItems={totalItems}
      />
    </>
  );
}

export default Customer;
