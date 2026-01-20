"use client";

import { LiaRulerHorizontalSolid } from "react-icons/lia";
import { Variant } from "@/types/type";
import { memo } from "react";

type Size = {
  _id: string;
  namesize: string;
};

type Props = {
  selectedVariant?: Variant;
  selectedSize?: Size;
  onSelectSize: (size: Size) => void;
  onOpenSizeChart: () => void;
};

function SizeSelector({
  selectedVariant,
  selectedSize,
  onSelectSize,
  onOpenSizeChart,
}: Props) {
  if (!selectedVariant) return null;

  return (
    <div className="space-y-[8px]">
      <div className="flex justify-between">
        <p className="text-gray-700 font-medium">
          Kích thước: {selectedSize?.namesize}
        </p>

        <button
          type="button"
          onClick={onOpenSizeChart}
          className="flex gap-[5px] items-center"
        >
          <LiaRulerHorizontalSolid size={20} />
          <span className="uppercase font-medium">Hướng dẫn kích thước</span>
        </button>
      </div>

      <div className="flex space-x-2">
        {selectedVariant.inventories.map((inv, index) => {
          const isSelected = selectedSize?._id === inv.size._id;
          const isOutOfStock = inv.quantity === 0;

          return (
            <button
              key={index}
              type="button"
              disabled={isOutOfStock}
              onClick={() => onSelectSize(inv.size)}
              className={`relative w-[70px] h-[35px] border font-medium text-[0.95rem]
                ${
                  isSelected
                    ? "border-black"
                    : "border-gray-300 hover:border-gray-400"
                }
              `}
            >
              {isOutOfStock && (
                <span className="absolute inset-0 before:content-[''] before:absolute before:top-1/2 before:left-0 before:border-t before:border-black before:w-full before:rotate-[26.5deg] before:origin-center pointer-events-none" />
              )}

              <span className="relative z-10">{inv.size.namesize}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default memo(SizeSelector);
