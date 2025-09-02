"use client";
import { useCallback, useEffect, useState } from "react";
export const useInputImage1 = () => {
  const [previewImages1, setPreviewImages1] = useState<string[]>([]);
  const [selectedFiles1, setSelectedFiles1] = useState<File[]>([]);

  useEffect(() => {
    return () => {
      previewImages1.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages1]);

  const onFileSelect = useCallback((file: File, index: number) => {
    setPreviewImages1((prev) => {
      const updated = [...prev];
      if (updated[index]) URL.revokeObjectURL(updated[index]);
      updated[index] = URL.createObjectURL(file);
      return updated;
    });

    setSelectedFiles1((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });
  }, []);

  const handleClear = useCallback((index: number) => {
    setPreviewImages1((prev) => {
      const updated = [...prev];
      if (updated[index]) URL.revokeObjectURL(updated[index]);
      updated.splice(index, 1);
      return updated;
    });

    setSelectedFiles1((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  }, []);

  return {
    selectedFiles1,
    setSelectedFiles1,
    previewImages1,
    setPreviewImages1,
    onFileSelect,
    handleClear,
  };
};
