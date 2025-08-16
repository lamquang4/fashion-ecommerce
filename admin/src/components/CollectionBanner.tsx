"use client";
import Image from "./Image";
import InputImage1 from "./InputImage1";
import { HiMiniXMark } from "react-icons/hi2";
import useGetCollections from "@/hooks/useGetCollections";
import toast from "react-hot-toast";
import useAddBanner from "@/hooks/useAddBanner";
import useUpdateBanner from "@/hooks/useUpdateBanner";
import { useInputImage1 } from "@/hooks/useInputImage1";
import Loading from "./Loading";

function CollectionBanner() {
  const { collections, mutate, isLoading } = useGetCollections();
  const { addBanner, isLoading: isLoadingAddBanner } = useAddBanner();
  const { updateBanner, isLoading: isLoadingUpdateBanner } = useUpdateBanner();
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

    if (selectedFiles1.length < 2 && collections.length === 0) {
      toast.error("Vui lòng thêm đủ 2 hình");
      return;
    }

    try {
      const formData = new FormData();
      selectedFiles1.forEach((file) => file && formData.append("image", file));

      if (collections?.length === 0) {
        formData.append("type", "3");
        await addBanner(formData);
      } else {
        for (let i = 0; i < collections?.length; i++) {
          const file = selectedFiles1[i];
          if (!file) continue;

          const formData = new FormData();
          formData.append("image", file);
          formData.append("_id", collections[i]._id);
          await updateBanner(formData);
        }
      }

      mutate();
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
        <h1 className="font-bold text-[1.5rem] text-[#74767d]">Bộ sưu tập</h1>

        <div className="flex gap-[25px] w-full flex-col">
          <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
            {isLoading ? (
              <Loading height={70} size={50} color="black" thickness={2} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[20px]">
                {[0, 1].map((index) => {
                  const item = collections[index];
                  return (
                    <div className="relative" key={index}>
                      <div>
                        <Image
                          Src={
                            previewImages1[index] ||
                            item?.image ||
                            "/assets/other/default-banner.png"
                          }
                          Alt=""
                          ClassName="w-full object-cover"
                          loadingType="lazy"
                        />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                          <h2 className="text-[2rem] mb-[10px] font-bold">
                            {index === 0 ? "NAM" : "NỮ"}
                          </h2>
                          <button
                            type="button"
                            className="text-[0.95rem] border border-white p-2 font-medium hover:scale-105"
                          >
                            KHÁM PHÁ NGAY
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-[15px] absolute top-[20px] right-[20px]">
                        <InputImage1
                          onFileSelect={(file) => onFileSelect(file, index)}
                          InputId={`x${index}`}
                          sizeIcon={30}
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
            disabled={isLoadingAddBanner || isLoadingUpdateBanner}
            type="submit"
            className="p-[6px_10px] bg-teal-500 text-white text-[0.9rem] font-medium text-center rounded-sm hover:bg-teal-600"
          >
            {isLoadingAddBanner || isLoadingUpdateBanner
              ? "Đang lưu..."
              : "Lưu"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CollectionBanner;
