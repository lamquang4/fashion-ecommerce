import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useInputImage(max: number = 1) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  const handleRemovePreviewImage = useCallback(
    (index: number) => {
      URL.revokeObjectURL(previewImages[index]);

      const newImages = previewImages.filter((_, i) => i !== index);
      const newFiles = selectedFiles.filter((_, i) => i !== index);

      setPreviewImages(newImages);
      setSelectedFiles(newFiles);
    },
    [previewImages, selectedFiles]
  );

  const handlePreviewImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;

      const incomingFiles = Array.from(files);

      if (previewImages.length + incomingFiles.length > max) {
        toast.error(`Tổng số hình không được vượt quá ${max}.`);
        return;
      }

      const imageUrls = incomingFiles.map((file) => URL.createObjectURL(file));

      setPreviewImages((prev) => [...prev, ...imageUrls]);
      setSelectedFiles((prev) => [...prev, ...incomingFiles]);
    },
    [previewImages, max]
  );

  return {
    previewImages,
    setPreviewImages,
    selectedFiles,
    setSelectedFiles,
    handlePreviewImage,
    handleRemovePreviewImage,
  };
}
