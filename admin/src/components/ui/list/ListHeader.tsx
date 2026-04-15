"use client";
import Link from "next/link";
import { memo } from "react";
import { IoMdAddCircle } from "react-icons/io";
import StaticCards from "../StaticCards";

interface Props {
  title: string;
  totalItems: number;
  addLink?: string;
  arrayData?: {
    title: string;
    number: number | string;
    icon1?: React.ReactNode;
  }[];
}

function ListHeader({ title, totalItems, addLink, arrayData }: Props) {
  return (
    <div className="py-[1.3rem] px-[1.2rem] bg-[#f1f4f9] space-y-[20px]">
      <div className="flex justify-between items-center flex-wrap gap-[20px]">
        <h2 className="text-[#74767d]">
          {title} ({totalItems})
        </h2>

        {addLink && (
          <Link
            href={addLink}
            className="bg-primary text-white border-0 cursor-pointer text-[0.9rem] font-medium w-[90px] !flex p-[10px_12px] items-center justify-center gap-[5px]"
          >
            <IoMdAddCircle size={22} /> Thêm
          </Link>
        )}
      </div>

      {arrayData && <StaticCards array={arrayData || []} />}
    </div>
  );
}

export default memo(ListHeader);
