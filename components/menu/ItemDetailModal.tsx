"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, ChevronUp, Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useStore } from "../../context/StoreContext";
import { COMMON_ALLERGIES } from "../../utils/data";
import { MenuItem, OrderType } from "../../utils/types";

interface ItemDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ItemDetailModal({
  item,
  isOpen,
  onClose,
}: ItemDetailModalProps) {
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState<OrderType>("Dining");
  const [instructions, setInstructions] = useState("");
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [customAllergy, setCustomAllergy] = useState("");
  const [showAllergies, setShowAllergies] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setOrderType("Dining");
      setInstructions("");
      setSelectedAllergies([]);
      setCustomAllergy("");
      setShowAllergies(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!item) return null;

  const handleAddToCart = () => {
    addToCart({
      item,
      quantity,
      orderType,
      instructions,
      allergies: selectedAllergies,
      customAllergy,
    });
    onClose();
  };

  const totalPrice = (item.price * quantity).toFixed(2);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ y: "100%", opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Header Image */}
            <div className="relative h-56 w-full bg-gray-100 shrink-0">
              <Image
                src={item.image || "/placeholder.png"}
                alt={item.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/50 to-transparent" />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-2xl font-extrabold text-ink">
                    {item.name}
                  </h2>
                  <span className="text-xl font-black text-primary">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-inkMid text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Order Type */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-ink uppercase tracking-wider">
                  Dining Preference
                </h4>
                <div className="flex gap-3">
                  {(["Dining", "Takeaway"] as OrderType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setOrderType(type)}
                      className={`flex-1 py-3 rounded-xl border-2 transition-all font-semibold ${
                        orderType === type
                          ? "border-primary bg-accentLight text-primary"
                          : "border-borderLite bg-white text-inkMid hover:bg-gray-50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between bg-[#F9F9F9] p-4 rounded-2xl border border-borderLite">
                <span className="font-bold text-ink">Quantity</span>
                <div className="flex items-center gap-4 bg-white border border-borderLite rounded-xl p-1 shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-lg bg-bgBase flex items-center justify-center text-ink disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-6 text-center text-lg font-bold text-ink">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Allergies Toggle */}
              <div className="space-y-3 border border-red-100 bg-red-50/50 rounded-2xl overflow-hidden transition-all">
                <button
                  onClick={() => setShowAllergies(!showAllergies)}
                  className="w-full flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-bold">
                      Allergies & Dietary
                    </span>
                    {selectedAllergies.length > 0 && (
                      <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                        {selectedAllergies.length + (customAllergy ? 1 : 0)}
                      </span>
                    )}
                  </div>
                  {showAllergies ? (
                    <ChevronUp size={18} className="text-inkLight" />
                  ) : (
                    <ChevronDown size={18} className="text-inkLight" />
                  )}
                </button>

                <AnimatePresence>
                  {showAllergies && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4 space-y-4"
                    >
                      <div className="flex flex-wrap gap-2">
                        {COMMON_ALLERGIES.map((allergy) => {
                          const isSelected =
                            selectedAllergies.includes(allergy);
                          return (
                            <button
                              key={allergy}
                              onClick={() =>
                                setSelectedAllergies(
                                  isSelected
                                    ? selectedAllergies.filter(
                                        (a) => a !== allergy,
                                      )
                                    : [...selectedAllergies, allergy],
                                )
                              }
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                                isSelected
                                  ? "bg-red-500 border-red-500 text-white"
                                  : "bg-white border-red-200 text-red-700 hover:bg-red-50"
                              }`}
                            >
                              {isSelected && <Check size={12} />}
                              {allergy}
                            </button>
                          );
                        })}
                      </div>
                      <input
                        type="text"
                        value={customAllergy}
                        onChange={(e) => setCustomAllergy(e.target.value)}
                        placeholder="Other allergies?"
                        className="w-full bg-white border border-red-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-400 placeholder:text-red-300"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Special Instructions */}
              <div className="space-y-2 pb-6">
                <label className="text-sm font-bold text-ink uppercase tracking-wider">
                  Special Instructions
                </label>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="E.g., Extra sauce, no onions..."
                  className="w-full bg-bgBase border-0 rounded-2xl px-4 py-3 text-sm min-h-[100px] resize-none focus:outline-none focus:ring-2 ring-primary/20"
                />
              </div>
            </div>

            {/* Sticky Footer */}
            <div className="p-4 bg-white border-t border-borderLite">
              <button
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primaryHover text-white font-bold text-base py-4 rounded-2xl shadow-[0_6px_20px_rgba(255,107,53,0.3)] transition-all flex items-center justify-between px-6"
              >
                <span>Add {quantity} to Cart</span>
                <span className="font-black">${totalPrice}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
