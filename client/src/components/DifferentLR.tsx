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
        <div className="px-[10px] text-[0.9rem] font-normal">Or {title}</div>
        <div className="flex-grow bg-gray-300 h-[1px]"></div>
      </div>

      <div className="grid gap-[15px] grid-cols-2">
        <button className="px-[12px] py-[7px] border border-gray-300">
          <div className="text-[0.9rem] flex justify-center items-center gap-[10px] font-medium">
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
          <div className="text-[0.9rem] flex justify-center items-center gap-[10px] font-medium">
            <Image
              Src={"/assets/other/facebook.png"}
              Alt={""}
              ClassName={"w-[25px]"}
              loadingType="eager"
            />
            <p>Facebook</p>
          </div>
        </button>
      </div>
    </>
  );
}

export default DifferentLR;
