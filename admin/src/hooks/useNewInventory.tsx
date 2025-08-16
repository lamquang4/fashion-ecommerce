"use client";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export const useNewInventory = () => {
  const [newVariants, setNewVariants] = useState<
    {
      color: string;
      inventories: { size: string; quantity: number }[];
      previewImages: string[];
      selectedFiles: File[];
    }[]
  >([]);

  const handleImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, blockIndex: number) => {
      const files = e.target.files;
      if (!files) return;

      const incomingFiles = Array.from(files);

      setNewVariants((prev) => {
        const updated = [...prev];
        const currentPreviewImages = updated[blockIndex].previewImages || [];
        const currentSelectedFiles = updated[blockIndex].selectedFiles || [];

        const max = 5;
        if (currentPreviewImages.length + incomingFiles.length > max) {
          toast.error(`Tổng số hình không được vượt quá ${max}.`);
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
    },
    []
  );

  const handleChangeNewInventory = useCallback(
    (
      blockIndex: number,
      index: number,
      field: keyof { size: string; quantity: number },
      value: string | number
    ) => {
      setNewVariants((prev) => {
        const updated = [...prev];
        updated[blockIndex].inventories[index][field] = value as never;
        return updated;
      });
    },
    []
  );

  const handleAddInventoryBlock = () => {
    setNewVariants((prev) => {
      if (prev.length >= 6) return prev;
      return [
        ...prev,
        {
          color: "",
          inventories: [{ size: "", quantity: 1 }],
          previewImages: [],
          selectedFiles: [],
        },
      ];
    });
  };

  const handleRemoveNewInventoryBlock = (blockIndex: number) => {
    setNewVariants((prev) => {
      const updated = [...prev];
      updated.splice(blockIndex, 1);
      return updated;
    });
  };

  const handleAddNewInventory = (blockIndex: number) => {
    setNewVariants((prev) => {
      const updated = [...prev];
      if (updated[blockIndex].inventories.length >= 6) return updated;

      updated[blockIndex].inventories.push({
        size: "",
        quantity: 1,
      });
      return updated;
    });
  };

  const handleRemoveNewInventory = (blockIndex: number, index: number) => {
    setNewVariants((prev) => {
      const updated = [...prev];
      if (updated[blockIndex].inventories.length <= 1) return updated;

      updated[blockIndex].inventories.splice(index, 1);
      return updated;
    });
  };

  const handleRemoveAllNewInventories = (blockIndex: number) => {
    setNewVariants((prev) => {
      const updated = [...prev];
      updated[blockIndex].inventories = [{ size: "", quantity: 1 }];
      return updated;
    });
  };

  const handleSortNewInventory = useCallback(
    (blockIndex: number, newList: { size: string; quantity: number }[]) => {
      setNewVariants((prev) => {
        const updated = [...prev];
        updated[blockIndex].inventories = newList;
        return updated;
      });
    },
    []
  );

  const handleRemoveAllInventoryBlocks = () => {
    setNewVariants([]);
  };

  const handleRemoveImage = useCallback(
    (imageIndex: number, blockIndex: number) => {
      setNewVariants((prev) => {
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

  return {
    newVariants,
    setNewVariants,
    handleRemoveNewInventoryBlock,
    handleAddNewInventory,
    handleChangeNewInventory,
    handleRemoveNewInventory,
    handleRemoveAllNewInventories,
    handleAddInventoryBlock,
    handleRemoveAllInventoryBlocks,
    handleImage,
    handleRemoveImage,
    handleSortNewInventory,
  };
};
