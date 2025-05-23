"use client";
import { useState } from "react";

export interface Variant {
  size: string;
  color: string;
  quantity: string;
}

export const useVariants = () => {
  const [variants, setVariants] = useState<Variant[]>([
    { size: "", color: "", quantity: "1" },
  ]);
  const [selected, setSelected] = useState<boolean[]>([false]);

  const isAllSelected = selected.every(Boolean);

  const handleSelectAll = () => {
    setSelected(Array(variants.length).fill(!isAllSelected));
  };

  const handleSelectOne = (index: number) => {
    const updated = [...selected];
    updated[index] = !updated[index];
    setSelected(updated);
  };

  const handleRemoveSelect = () => {
    const filteredVariants = variants.filter((_, index) => !selected[index]);
    setVariants(
      filteredVariants.length === 0
        ? [{ size: "", color: "", quantity: "1" }]
        : filteredVariants
    );
    setSelected(
      filteredVariants.length === 0
        ? [false]
        : filteredVariants.map(() => false)
    );
  };

  const handleAddVariant = () => {
    setVariants((prev) => [...prev, { size: "", color: "", quantity: "1" }]);
    setSelected((prev) => [...prev, false]);
  };

  const updateVariant = (
    index: number,
    field: keyof Variant,
    value: string
  ) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  return {
    variants,
    selected,
    isAllSelected,
    handleSelectAll,
    handleSelectOne,
    handleRemoveSelect,
    handleAddVariant,
    updateVariant,
  };
};
