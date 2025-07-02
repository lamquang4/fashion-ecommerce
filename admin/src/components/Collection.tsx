"use client";
import Image from "./Image";
import InputImage1 from "./InputImage1";
import { HiMiniXMark } from "react-icons/hi2";
import useGetCollections from "@/hooks/useGetCollections";
import toast from "react-hot-toast";
import useAddBanner from "@/hooks/useAddBanner";
import useUpdateBanner from "@/hooks/useUpdateBanner";
import { useImageViewer1 } from "@/hooks/useImageViewer1";
function Collection() {
  const { collections, mutate } = useGetCollections();
  const { addBanner } = useAddBanner();
  const { updateBanner } = useUpdateBanner();
  const {
    selectedFiles1,
    setSelectedFiles1,
    previewImages1,
    setPreviewImages1,
    onFileSelect,
    handleClear,
  } = useImageViewer1();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      toast.success("Cập nhật thành công!");
      setSelectedFiles1([]);
      setPreviewImages1([]);
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };
  return (
    <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-auto">
      <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
        <h1 className="font-bold text-[1.5rem] text-[#74767d]">Bộ sưu tập</h1>

        <div className="flex gap-[25px] w-full flex-col">
          <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[20px]">
              {[0, 1].map((index) => {
                const item = collections[index];
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
                        InputId={`x${index}`}
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

export default Collection;
