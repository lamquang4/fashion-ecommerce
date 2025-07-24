"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export interface Inventory {
  size: string;
  quantity: number;
}

export const useInventory = () => {
  const [newVariants, setNewVariants] = useState<
    {
      color: string;
      inventories: { size: string; quantity: number }[];
      previewImages: string[];
      selectedFiles: File[];
    }[]
  >([]);

  const [currentVariants, setCurrentVariants] = useState<
    {
      _id?: string;
      color: string;
      inventories: { size: string; quantity: number }[];
      previewImages: string[];
      selectedFiles: File[];
    }[]
  >([]);

  const handleAddInventoryBlock = () => {
    if (newVariants.length >= 6) {
      return;
    }
    setNewVariants((prev) => [
      ...prev,
      {
        color: "",
        inventories: [{ size: "", quantity: 1 }],
        previewImages: [],
        selectedFiles: [],
      },
    ]);
  };

  const handleRemoveNewInventoryBlock = (blockIndex: number) => {
    const updated = [...newVariants];
    updated.splice(blockIndex, 1);
    setNewVariants(updated);
  };

  const handleAddNewInventory = (blockIndex: number) => {
    const updated = [...newVariants];
    if (updated[blockIndex].inventories.length >= 6) return;

    updated[blockIndex].inventories.push({
      size: "",
      quantity: 1,
    });
    setNewVariants(updated);
  };

  const handleAddCurrentInventory = (blockIndex: number) => {
    const updated = [...currentVariants];
    if (updated[blockIndex].inventories.length >= 6) return;

    updated[blockIndex].inventories.push({
      size: "",
      quantity: 1,
    });
    setCurrentVariants(updated);
  };

  const handleRemoveNewInventory = (blockIndex: number, index: number) => {
    const updated = [...newVariants];

    if (updated[blockIndex].inventories.length <= 1) return;

    updated[blockIndex].inventories.splice(index, 1);

    setNewVariants(updated);
  };

  const handleRemoveCurrentInventory = (blockIndex: number, index: number) => {
    const updated = [...currentVariants];

    if (updated[blockIndex].inventories.length <= 1) return;

    updated[blockIndex].inventories.splice(index, 1);

    setCurrentVariants(updated);
  };

  const handleRemoveAllNewInventories = (blockIndex: number) => {
    const updated = [...newVariants];
    updated[blockIndex].inventories = [{ size: "", quantity: 1 }];
    setNewVariants(updated);
  };

  const handleRemoveAllCurrentInventories = (blockIndex: number) => {
    const updated = [...currentVariants];
    updated[blockIndex].inventories = [{ size: "", quantity: 1 }];
    setCurrentVariants(updated);
  };

  const handleRemoveAllInventoryBlocks = () => {
    setNewVariants([]);
  };

  const handleChangeNewInventory = (
    blockIndex: number,
    index: number,
    field: keyof Inventory,
    value: string | number
  ) => {
    const updated = [...newVariants];
    updated[blockIndex].inventories[index][field] = value as never;
    setNewVariants(updated);
  };

  const handleChangeCurrentInventory = (
    blockIndex: number,
    index: number,
    field: keyof Inventory,
    value: string | number
  ) => {
    const updated = [...currentVariants];
    updated[blockIndex].inventories[index][field] = value as never;
    setCurrentVariants(updated);
  };

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    blockIndex: number
  ) => {
    const files = e.target.files;
    if (!files) return;

    const incomingFiles = Array.from(files);

    const updated = [...newVariants];
    const currentPreviewImages = updated[blockIndex].previewImages || [];
    const currentSelectedFiles = updated[blockIndex].selectedFiles || [];

    const max = 5;

    if (currentPreviewImages.length + incomingFiles.length > max) {
      toast.error(`Tổng số hình không được vượt quá ${max}.`);
      return;
    }

    const imageUrls = incomingFiles.map((file) => URL.createObjectURL(file));

    updated[blockIndex].previewImages = [...currentPreviewImages, ...imageUrls];
    updated[blockIndex].selectedFiles = [
      ...currentSelectedFiles,
      ...incomingFiles,
    ];

    setNewVariants(updated);
  };

  const handleRemoveImage = (imageIndex: number, blockIndex: number) => {
    const updated = [...newVariants];
    const previewImages = updated[blockIndex].previewImages;
    const selectedFiles = updated[blockIndex].selectedFiles;

    URL.revokeObjectURL(previewImages[imageIndex]);

    updated[blockIndex].previewImages = previewImages.filter(
      (_, i) => i !== imageIndex
    );
    updated[blockIndex].selectedFiles = selectedFiles.filter(
      (_, i) => i !== imageIndex
    );

    setNewVariants(updated);
  };

  const handleImageCurrent = (
    e: React.ChangeEvent<HTMLInputElement>,
    blockIndex: number
  ) => {
    const files = e.target.files;
    if (!files) return;

    const incomingFiles = Array.from(files);

    const updated = [...currentVariants];
    const currentPreviewImages = updated[blockIndex].previewImages || [];
    const currentSelectedFiles = updated[blockIndex].selectedFiles || [];

    const max = 5;

    if (currentPreviewImages.length + incomingFiles.length > max) {
      toast.error(`Tổng số hình không được vượt quá ${max}.`);
      return;
    }

    const imageUrls = incomingFiles.map((file) => URL.createObjectURL(file));

    updated[blockIndex].previewImages = [...currentPreviewImages, ...imageUrls];
    updated[blockIndex].selectedFiles = [
      ...currentSelectedFiles,
      ...incomingFiles,
    ];

    setCurrentVariants(updated);
  };

  const handleRemoveImageCurrent = (imageIndex: number, blockIndex: number) => {
    const updated = [...currentVariants];
    const previewImages = updated[blockIndex].previewImages;
    const selectedFiles = updated[blockIndex].selectedFiles;

    URL.revokeObjectURL(previewImages[imageIndex]);

    updated[blockIndex].previewImages = previewImages.filter(
      (_, i) => i !== imageIndex
    );
    updated[blockIndex].selectedFiles = selectedFiles.filter(
      (_, i) => i !== imageIndex
    );

    setCurrentVariants(updated);
  };

  return {
    newVariants,
    setNewVariants,
    currentVariants,
    setCurrentVariants,
    handleRemoveNewInventoryBlock,
    handleAddNewInventory,
    handleAddCurrentInventory,
    handleChangeNewInventory,
    handleChangeCurrentInventory,
    handleRemoveNewInventory,
    handleRemoveCurrentInventory,
    handleRemoveAllNewInventories,
    handleRemoveAllCurrentInventories,
    handleAddInventoryBlock,
    handleRemoveAllInventoryBlocks,
    handleImage,
    handleRemoveImage,
    handleImageCurrent,
    handleRemoveImageCurrent,
  };
};
