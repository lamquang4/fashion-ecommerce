"use client";
import Image from "./Image";
type TitleProp = {
  title: string;
};
function DifferentLR({ title }: TitleProp) {
  return (
    <>
      <div className="flex items-center">
        <div className="flex-grow bg-gray-300 h-[1px]"></div>
        <div className="px-[10px] font-normal text-[0.9rem] ">Or {title}</div>
        <div className="flex-grow bg-gray-300 h-[1px]"></div>
      </div>

      <div className="flex justify-center gap-[15px]">
        <button className="px-[12px] py-[7px] border border-gray-300">
          <div className="text-[0.9rem] flex items-center gap-[10px] font-medium">
            <Image
              Src={"/assets/other/google.png"}
              Alt={""}
              ClassName={"w-[25px]"}
              loadingType="eager"
            />
            <p>Google</p>
          </div>
        </button>

        <button className="px-[12px] py-[7px] border border-gray-300">
          <div className="text-[0.9rem] flex items-center gap-[10px] font-medium">
            <Image
              Src={"/assets/other/google.png"}
              Alt={""}
              ClassName={"w-[25px]"}
              loadingType="eager"
            />
            <p>Google</p>
          </div>
        </button>
      </div>
    </>
  );
}

export default DifferentLR;
