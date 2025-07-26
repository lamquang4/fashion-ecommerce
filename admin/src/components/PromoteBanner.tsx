"use client";
import Image from "./Image";
import InputImage1 from "./InputImage1";
import { HiMiniXMark } from "react-icons/hi2";
import useGetPromoteBanners from "@/hooks/useGetPromoteBanners";
import useAddBanner from "@/hooks/useAddBanner";
import useUpdateBanner from "@/hooks/useUpdateBanner";
import toast from "react-hot-toast";
import { useInputImage1 } from "@/hooks/useInputImage1";
import Loading from "./Loading";
function PromoteBanner() {
  const { promotebanners, mutate, isLoading } = useGetPromoteBanners();
  const { addBanner } = useAddBanner();
  const { updateBanner } = useUpdateBanner();
  const {
    selectedFiles1,
    setSelectedFiles1,
    previewImages1,
    setPreviewImages1,
    onFileSelect,
    handleClear,
  } = useInputImage1();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      selectedFiles1.forEach((file) => file && formData.append("image", file));

      if (promotebanners.length === 0) {
        formData.append("type", "2");
        await addBanner(formData);
      } else {
        for (let i = 0; i < promotebanners.length; i++) {
          const file = selectedFiles1[i];
          if (!file) continue;

          const formData = new FormData();
          formData.append("image", file);
          formData.append("_id", promotebanners[i]._id);
          await updateBanner(formData);
        }
      }

      mutate();
      toast.success("Cập nhật thành công!");
      setSelectedFiles1([]);
      setPreviewImages1([]);
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
      mutate();
    }
  };
  return (
    <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-auto">
      <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
        <h1 className="font-bold text-[1.5rem] text-[#74767d]">
          Banner khuyến mãi
        </h1>

        <div className="flex gap-[25px] w-full flex-col">
          <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
            {isLoading ? (
              <Loading height={70} />
            ) : (
              <div className="flex flex-col gap-[20px] sm:gap-[30px]">
                {[0, 1].map((index) => {
                  const item = promotebanners[index];
                  return (
                    <div className="relative" key={index}>
                      <Image
                        Src={
                          previewImages1[index] ||
                          item?.image ||
                          "/assets/other/default-banner.png"
                        }
                        Alt=""
                        ClassName="w-full object-cover"
                        loadingType="eager"
                      />

                      <div className="flex gap-[15px] absolute top-[20px] right-[20px]">
                        <InputImage1
                          onFileSelect={(file) => onFileSelect(file, index)}
                          InputId={`b${index}`}
                        />
                        {previewImages1[index] && (
                          <div className="rounded-full border flex justify-center items-center bg-white">
                            <button
                              type="button"
                              className="p-2"
                              onClick={() => handleClear(index)}
                            >
                              <HiMiniXMark size={26} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <button
            type="submit"
            className="p-[6px_10px] bg-teal-500 text-white text-[0.9rem] font-medium text-center rounded-sm hover:bg-teal-600"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
}

export default PromoteBanner;
