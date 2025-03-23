"use client";
import React from "react";
interface TitleProp {
  title: string;
}
const DifferentLR: React.FC<TitleProp> = ({ title }) => {
  return (
    <>
      <div className="flex items-center m-[30px_0]">
        <div className="flex-grow bg-[#e5e5e5] border-t border-t-[#e5e5e5] h-[0.5px]"></div>
        <div className="px-[0.6rem] text-[0.95rem]">Hoặc {title}</div>
        <div className="flex-grow bg-[#e5e5e5] border-t border-t-[#e5e5e5] h-[0.5px]"></div>
      </div>

      <div className="flex justify-center">
        <button className="px-[12px] py-[7px] border border-[rgba(0,0,0,0.26)]">
          <div className="text-[1rem] flex items-center gap-[10px] font-medium">
            <img src="/assets/other/google.png" alt="" width={"25px"} />
            <div>Google</div>
          </div>
        </button>
      </div>
    </>
  );
};

export default DifferentLR;
