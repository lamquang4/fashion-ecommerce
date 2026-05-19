import Link from "next/link";
import { VscTrash } from "react-icons/vsc";
import { LiaEdit } from "react-icons/lia";
import { TbLock, TbLockOpen } from "react-icons/tb";
import FilterDropDownMenu from "../ui/FilterDropDownMenu";
import Image from "../ui/Image";
import Loading from "../ui/Loading";
import { User } from "@/types/types";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import useBlockUser from "@/hooks/useBlockUser";
import useDeleteUser from "@/hooks/useDeleteUser";

const array = [
  { name: "Tất cả", value: null },
  { name: "Bình thường", value: 1 },
  { name: "Đã chặn", value: 0 },
];

type Props = {
  admins: User[];
  isLoading: boolean;
  mutate: () => void;
};

function AdminTable({ admins, isLoading, mutate }: Props) {
  const { data: session } = useSession({
    required: true,
  });

  const { blockUser, isLoading: isLoadingBlockUser } = useBlockUser();
  const { deleteUser, isLoading: isLoadingDeleteUser } = useDeleteUser();

  const handleDelete = async (id: string) => {
    if (!id) {
      return;
    }
    if (id === session?.user.id) {
      toast.error("Không được xóa chính tài khoản đang đăng nhập");
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
    if (id === session?.user.id) {
      toast.error("Không được khóa chính tài khoản đang đăng nhập");
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
    <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full text-[0.9rem]">
      <thead>
        <tr className="bg-[#E9EDF2] text-left">
          <th className="p-[1rem]  ">Họ tên</th>

          <th className="p-[1rem]  ">Email</th>
          <th className="p-[1rem]  ">SĐT</th>
          <th className="p-[1rem]  ">Sinh nhật</th>
          <th className="p-[1rem]  ">Ngày tạo</th>
          <th className="p-[1rem]  ">Vai trò</th>
          <th className="p-[1rem]  ">
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
        ) : admins.length > 0 ? (
          admins.map((admin) => (
            <tr key={admin._id} className="hover:bg-[#f2f3f8]">
              <td className="p-[1rem] text-[0.9rem] font-semibold text-[#22BAA0]">
                {admin.fullname}
              </td>
              <td className="p-[1rem]  ">{admin.email}</td>
              <td className="p-[1rem]  ">{admin.phone}</td>
              <td className="p-[1rem]  ">
                {new Date(admin.birthday as string).toLocaleDateString("vi-VN")}
              </td>
              <td className="p-[1rem]  ">
                {new Date(admin.createdAt as string).toLocaleDateString(
                  "vi-VN",
                )}
              </td>
              <td className="p-[1rem]  ">
                {admin.role === 0
                  ? "Quản trị viên"
                  : admin.role === 1
                    ? "Nhân viên bán hàng"
                    : admin.role === 2
                      ? "Nhân viên nội dung"
                      : ""}
              </td>
              <td className="p-[1rem]  ">
                {admin.status === 1 ? "Bình thường" : "Đã chặn"}
              </td>
              <td className="p-[1rem]  ">
                <div className="flex items-center gap-[15px]">
                  <button
                    disabled={isLoadingBlockUser}
                    onClick={() =>
                      handleBlock(admin._id || "", admin.status === 1 ? 0 : 1)
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

                  <button
                    disabled={isLoadingDeleteUser}
                    onClick={() => handleDelete(admin._id || "")}
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
                  src={"/assets/other/notfound1.png"}
                  alt={""}
                  className={"w-[135px]"}
                  loading="lazy"
                />
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default AdminTable;
