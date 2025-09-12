"use client";
import { useCallback, useEffect, useState } from "react";
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

  useEffect(() => {
    return () => {
      newVariants.forEach((block) => {
        block.previewImages.forEach((url) => URL.revokeObjectURL(url));
      });
    };
  }, [newVariants]);

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
      if (prev.length >= 5) return prev;
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

      updated[blockIndex].previewImages.forEach((url) =>
        URL.revokeObjectURL(url)
      );

      updated.splice(blockIndex, 1);
      return updated;
    });
  };

  const handleAddNewInventory = (blockIndex: number) => {
    setNewVariants((prev) =>
      prev.map((block, i) => {
        if (i !== blockIndex) return block;
        if (block.inventories.length >= 6) return block;

        return {
          ...block,
          inventories: [...block.inventories, { size: "", quantity: 1 }],
        };
      })
    );
  };

  const handleRemoveNewInventory = (blockIndex: number, index: number) => {
    setNewVariants((prev) =>
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

  const handleRemoveAllNewInventories = (blockIndex: number) => {
    setNewVariants((prev) => {
      const updated = [...prev];
      updated[blockIndex].inventories = [{ size: "", quantity: 1 }];
      return updated;
    });
  };

  const handleSortNewInventory = (
    blockIndex: number,
    newList: { size: string; quantity: number }[]
  ) => {
    setNewVariants((prev) => {
      const updated = [...prev];
      updated[blockIndex].inventories = newList;
      return updated;
    });
  };

  const handleRemoveAllInventoryBlocks = () => {
    newVariants.forEach((block) => {
      block.previewImages.forEach((url) => URL.revokeObjectURL(url));
    });
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
