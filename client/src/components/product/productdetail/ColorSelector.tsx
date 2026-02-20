"use client";
import { Color, Variant } from "@/types/type";
import { memo } from "react";

type Props = {
  variants: Variant[];
  selectedVariant?: Variant;
  selectedColor?: Color;
  onSelectVariant: (variant: Variant) => void;
};

function ColorSelector({
  variants,
  selectedVariant,
  selectedColor,
  onSelectVariant,
}: Props) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="space-y-[8px]">
      <p className="text-gray-700 font-medium">
        Màu: {selectedColor?.namecolor}
      </p>

      <div className="flex space-x-2">
        {variants.map((variant) => {
          const isSelected = selectedVariant?._id === variant._id;

          return (
            <button
              key={variant.color._id}
              type="button"
              title={variant.color.namecolor}
              onClick={() => onSelectVariant(variant)}
              style={{
                backgroundColor: variant.color.codecolor,
              }}
              className={`w-8 h-8 rounded-full border border-gray-300
                focus:outline-none focus:ring-1 focus:ring-offset-2 ring-red-800
                ${isSelected ? "ring-1 ring-offset-2" : ""}
              `}
            />
          );
        })}
      </div>
    </div>
  );
}

export default memo(ColorSelector);
