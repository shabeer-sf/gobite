"use client";

import { ChevronLeft, Clock, ShoppingBag, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useStore } from "../../context/StoreContext";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  showCart?: boolean;
  onSubtitleClick?: () => void;
  rightAction?: React.ReactNode;
}

export function Header({
  title,
  subtitle,
  showBack,
  showCart,
  onSubtitleClick,
  rightAction,
}: HeaderProps) {
  const router = useRouter();
  const { cart, user } = useStore();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="bg-white border-b border-borderLite sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-bgBase hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft size={20} className="text-ink" />
            </button>
          )}

          <div>
            {title && <h1 className="text-base font-bold text-ink">{title}</h1>}
            {subtitle && (
              <button
                onClick={onSubtitleClick}
                disabled={!onSubtitleClick}
                className={`text-xs text-inkMid text-left ${onSubtitleClick ? "hover:text-primary transition-colors cursor-pointer border-b border-dashed border-inkLight" : ""}`}
              >
                {subtitle}
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {user && (
            <div className="flex items-center gap-1.5 bg-accentLight px-2.5 py-1.5 rounded-full mr-1">
              <div className="w-5 h-5 rounded-full bg-[#FFD9C8] flex items-center justify-center text-primary">
                <User size={12} />
              </div>
              <span className="text-xs font-semibold text-primary max-w-[72px] truncate">
                {user.name.split(" ")[0]}
              </span>
            </div>
          )}

          {rightAction}

          <button
            onClick={() => router.push("/orders")}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-bgBase hover:bg-gray-200 transition-colors"
          >
            <Clock size={20} className="text-inkMid" />
          </button>
          {showCart && (
            <button
              onClick={() => router.push("/cart")}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-bgBase relative hover:bg-gray-200 transition-colors"
            >
              <ShoppingBag size={18} className="text-ink" />
              {cartItemCount > 0 && (
                <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-[9px] font-bold text-white">
                    {cartItemCount}
                  </span>
                </div>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
