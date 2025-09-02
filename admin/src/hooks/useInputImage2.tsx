import { useCallback, useEffect, useState } from "react";

export const useInputImage2 = () => {
  const [previewImages2, setPreviewImages2] = useState<string[][]>([]);
  const [selectedFiles2, setSelectedFiles2] = useState<File[][]>([]);

  useEffect(() => {
    return () => {
      previewImages2.forEach((block) =>
        block.forEach((url) => URL.revokeObjectURL(url))
      );
    };
  }, [previewImages2]);

  const onFileSelect = useCallback(
    (file: File, blockIndex: number, imageIndex: number) => {
      setPreviewImages2((prev) => {
        const updated = [...prev];
        updated[blockIndex] = updated[blockIndex] || [];
        if (updated[blockIndex][imageIndex]) {
          URL.revokeObjectURL(updated[blockIndex][imageIndex]);
        }
        updated[blockIndex][imageIndex] = URL.createObjectURL(file);
        return updated;
      });

      setSelectedFiles2((prev) => {
        const updated = [...prev];
        updated[blockIndex] = updated[blockIndex] || [];
        updated[blockIndex][imageIndex] = file;
        return updated;
      });
    },
    []
  );

  const handleClear = useCallback((blockIndex: number, imageIndex: number) => {
    setPreviewImages2((prev) => {
      const updated = [...prev];
      if (updated[blockIndex]?.[imageIndex]) {
        URL.revokeObjectURL(updated[blockIndex][imageIndex]);
        updated[blockIndex].splice(imageIndex, 1);
      }
      return updated;
    });

    setSelectedFiles2((prev) => {
      const updated = [...prev];
      if (updated[blockIndex]?.[imageIndex]) {
        updated[blockIndex].splice(imageIndex, 1);
      }
      return updated;
    });
  }, []);

  return {
    previewImages2,
    setPreviewImages2,
    selectedFiles2,
    setSelectedFiles2,
    onFileSelect,
    handleClear,
  };
};
