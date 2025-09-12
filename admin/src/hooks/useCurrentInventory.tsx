"use client";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export const useCurrentInventory = () => {
  const [currentVariants, setCurrentVariants] = useState<
    {
      _id?: string;
      color: string;
      inventories: { size: string; quantity: number }[];
      previewImages: string[];
      selectedFiles: File[];
    }[]
  >([]);

  useEffect(() => {
    return () => {
      currentVariants.forEach((block) => {
        block.previewImages.forEach((url) => URL.revokeObjectURL(url));
      });
    };
  }, [currentVariants]);

  const handleAddCurrentInventory = (blockIndex: number) => {
    setCurrentVariants((prev) =>
      prev.map((block, i) => {
        if (i !== blockIndex) return block;

        return {
          ...block,
          inventories: [...block.inventories, { size: "", quantity: 1 }],
        };
      })
    );
  };

  const handleRemoveCurrentInventory = async (
    blockIndex: number,
    index: number
  ) => {
    const result = await Swal.fire({
      title: `Xác nhận xóa?`,
      text: `Bạn có chắc muốn xóa không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed) return;

    setCurrentVariants((prev) =>
      prev.map((block, i) => {
        if (i !== blockIndex) return block;
        if (block.inventories.length <= 1) return block;

        return {
          ...block,
          inventories: block.inventories.filter((_, j) => j !== index),
        };
      })
    );
  };

  const handleRemoveAllCurrentInventories = (blockIndex: number) => {
    setCurrentVariants((prev) => {
      const updated = [...prev];
      updated[blockIndex].inventories = [{ size: "", quantity: 1 }];
      return updated;
    });
  };

  const handleChangeCurrentInventory = useCallback(
    (
      blockIndex: number,
      index: number,
      field: keyof {
        size: string;
        quantity: number;
      },
      value: string | number
    ) => {
      setCurrentVariants((prev) => {
        const updated = [...prev];
        updated[blockIndex].inventories[index][field] = value as never;
        return updated;
      });
    },
    []
  );

  const handleImageCurrent = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, blockIndex: number) => {
      const files = e.target.files;
      if (!files) return;

      const incomingFiles = Array.from(files);

      setCurrentVariants((prev) => {
        const updated = [...prev];
        const currentPreviewImages = updated[blockIndex].previewImages || [];
        const currentSelectedFiles = updated[blockIndex].selectedFiles || [];

        const max = 5;
        if (currentPreviewImages.length + incomingFiles.length > max) {
          toast.error(`Tổng số hình không được vượt quá ${max}.`);
          e.target.value = "";
          return prev;
        }

        const imageUrls = incomingFiles.map((file) =>
          URL.createObjectURL(file)
        );

        updated[blockIndex] = {
          ...updated[blockIndex],
          previewImages: [...currentPreviewImages, ...imageUrls],
          selectedFiles: [...currentSelectedFiles, ...incomingFiles],
        };

        return updated;
      });
      e.target.value = "";
    },
    []
  );

  const handleRemoveImageCurrent = useCallback(
    (imageIndex: number, blockIndex: number) => {
      setCurrentVariants((prev) => {
        const updated = [...prev];
        const previewImages = updated[blockIndex].previewImages;
        const selectedFiles = updated[blockIndex].selectedFiles;

        URL.revokeObjectURL(previewImages[imageIndex]);

        updated[blockIndex] = {
          ...updated[blockIndex],
          previewImages: previewImages.filter((_, i) => i !== imageIndex),
          selectedFiles: selectedFiles.filter((_, i) => i !== imageIndex),
        };

        return updated;
      });
    },
    []
  );

  const handleSortCurrentInventory = (
    blockIndex: number,
    newList: { size: string; quantity: number }[]
  ) => {
    setCurrentVariants((prev) => {
      const updated = [...prev];
      updated[blockIndex].inventories = newList;
      return updated;
    });
  };

  return {
    currentVariants,
    setCurrentVariants,
    handleAddCurrentInventory,
    handleChangeCurrentInventory,
    handleRemoveCurrentInventory,
    handleRemoveAllCurrentInventories,
    handleImageCurrent,
    handleRemoveImageCurrent,
    handleSortCurrentInventory,
  };
};
