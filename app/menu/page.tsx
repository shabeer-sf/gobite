"use client";

import { ShieldCheck, UtensilsCrossed } from "lucide-react";
import React, { useEffect, useState } from "react";
import { CartFloatingButton } from "../../components/menu/CartFloatingButton";
import { CategoryTabs } from "../../components/menu/CategoryTabs";
import { ItemDetailModal } from "../../components/menu/ItemDetailModal";
import { MenuItemCard } from "../../components/menu/MenuItemCard";
import { Header } from "../../components/ui/Header";
import { TablePickerModal } from "../../components/menu/TablePickerModal";
import { useStore } from "../../context/StoreContext";
import { CATEGORIES, HOTEL_NAME } from "../../utils/data";
import { MenuItem } from "../../utils/types";

export default function MenuPage() {
  const { tableNumber, setSessionInfo, menuItems } = useStore();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showTablePicker, setShowTablePicker] = useState(false);

  // Set default if empty initially
  useEffect(() => {
    if (!tableNumber) {
      setSessionInfo("default", "Takeaway");
    }
  }, [tableNumber, setSessionInfo]);

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((i) => i.category === activeCategory);

  const getSubtitle = () => {
    if (tableNumber === "Takeaway") return `Takeaway`;
    return `Table ${tableNumber || "?"}`;
  };

  return (
    <div className="flex-1 flex flex-col bg-bgBase relative pb-28">
      <Header
        subtitle={getSubtitle()}
        showCart
        onSubtitleClick={() => setShowTablePicker(true)}
      />

      <CategoryTabs
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      <div className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onClick={() => setSelectedItem(item)}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 opacity-60">
              <UtensilsCrossed size={40} className="text-inkLight mb-4" />
              <p className="text-sm font-medium text-inkLight">
                No items in this category
              </p>
            </div>
          )}
        </div>

        {filteredItems.length > 0 && (
          <div className="mt-8 mb-4 bg-accentLight p-4 rounded-2xl flex items-start gap-3 border border-red-100">
            <ShieldCheck className="text-primary mt-0.5 shrink-0" size={20} />
            <p className="text-xs text-inkMid leading-relaxed">
              Please inform <strong className="text-ink">{HOTEL_NAME}</strong>{" "}
              of any food allergies before placing your order.
            </p>
          </div>
        )}
      </div>

      <ItemDetailModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
      <TablePickerModal
        isOpen={showTablePicker}
        onClose={() => setShowTablePicker(false)}
      />
      <CartFloatingButton />
    </div>
  );
}
