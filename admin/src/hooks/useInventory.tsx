"use client";
import { useState } from "react";

export interface Inventory {
  _id?: string;
  size: string;
  color: string;
  quantity: number;
}

export const useInventory = () => {
  const [newInventories, setNewInventories] = useState<Inventory[]>([
    { size: "", color: "", quantity: 1 },
  ]); // mảng chứa object

  const [currentInventories, setCurrentInventories] = useState<Inventory[]>([
    { size: "", color: "", quantity: 1 },
  ]);

  const handleSendCurrentInventories = (data: Inventory[]) => {
    setCurrentInventories(
      data.map((item) => ({
        _id: item._id,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
      }))
    );
  };

  const handleAddInventory = () => {
    if (newInventories.length >= 30) {
      return;
    }
    setNewInventories((prev) => [
      ...prev,
      { size: "", color: "", quantity: 1 },
    ]);
  };

  const handleRemoveInventory = (index: number) => {
    const updated = [...newInventories];
    updated.splice(index, 1);

    if (updated.length === 0) {
      updated.push({ size: "", color: "", quantity: 1 });
    }

    setNewInventories(updated);
  };

  const handleRemoveAllInventory = () => {
    setNewInventories([{ size: "", color: "", quantity: 1 }]);
  };

  const handleChangeInventory = (
    index: number,
    field: keyof Inventory,
    value: string | number
  ) => {
    const updated = [...newInventories];
    updated[index][field] = value as never;
    setNewInventories(updated);
  };

  const handleChangeCurrentInventory = (
    index: number,
    field: keyof Inventory,
    value: string | number
  ) => {
    const updated = [...currentInventories];
    updated[index][field] = value as never;
    setCurrentInventories(updated);
  };

  return {
    newInventories,
    setNewInventories,
    currentInventories,
    handleAddInventory,
    handleChangeInventory,
    handleChangeCurrentInventory,
    handleRemoveInventory,
    handleRemoveAllInventory,
    handleSendCurrentInventories,
  };
};
