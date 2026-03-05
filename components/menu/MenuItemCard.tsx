import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
import { MenuItem } from "../../utils/types";

export function MenuItemCard({
  item,
  onClick,
}: {
  item: MenuItem;
  onClick: () => void;
}) {
  const isAvailable = item.available !== false;

  return (
    <button
      onClick={isAvailable ? onClick : undefined}
      className={`w-full flex items-center bg-white p-3.5 rounded-2xl border border-borderLite transition-all text-left ${
        isAvailable
          ? "hover:shadow-md cursor-pointer"
          : "opacity-60 cursor-not-allowed grayscale-[50%]"
      }`}
    >
      <div className="flex-1 pr-4">
        <h3 className="font-bold text-ink text-base mb-1">{item.name}</h3>
        <p className="text-inkMid text-xs line-clamp-2 leading-relaxed mb-2 mt-1">
          {item.description}
        </p>
        <div className="flex items-center gap-3">
          <span className="font-bold text-ink text-[15px]">
            ${item.price.toFixed(2)}
          </span>
          {item.popular && (
            <span className="bg-accentLight px-2 py-0.5 rounded text-[10px] font-bold text-primary uppercase tracking-wide">
              Popular
            </span>
          )}
          {!isAvailable && (
            <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 uppercase tracking-wide border border-gray-200">
              Sold Out
            </span>
          )}
        </div>
      </div>

      <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 border border-borderLite shadow-sm">
        <Image
          src={item.image || "/placeholder.png"}
          alt={item.name}
          fill
          className="object-cover"
          sizes="96px"
        />
        {isAvailable && (
          <div className="absolute bottom-1 right-1 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center">
            <Plus size={16} className="text-primary font-bold" />
          </div>
        )}
      </div>
    </button>
  );
}
