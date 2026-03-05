"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Mail,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CartItemCard } from "../../components/menu/CartItemCard";
import { Header } from "../../components/ui/Header";
import { useStore } from "../../context/StoreContext";
import { HOTEL_NAME } from "../../utils/data";
import { Order } from "../../utils/types";

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    addOrder,
    addItemsToOrder,
    activeOrderId,
    setActiveOrder,
    restaurantId,
    tableNumber,
    user,
  } = useStore();

  const [isProcessing, setIsProcessing] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(true);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleInitialCheckout = () => {
    if (activeOrderId) finalizeCheckout();
    else setShowEmailModal(true);
  };

  const finalizeCheckout = () => {
    setIsProcessing(true);
    setShowEmailModal(false);

    setTimeout(() => {
      if (activeOrderId) {
        addItemsToOrder(activeOrderId, cart);
        setActiveOrder(null);
      } else {
        const newOrder: Order = {
          id: Math.random().toString(36).substr(2, 9).toUpperCase(),
          items: [...cart],
          total,
          status: "pending",
          date: new Date().toISOString(),
          restaurantId: restaurantId || "default",
          restaurantName: HOTEL_NAME,
          tableNumber: tableNumber || "Takeaway",
          customerName: user?.name,
          customerPhone: user?.phone,
        };
        addOrder(newOrder);
      }
      clearCart();
      setIsProcessing(false);
      router.push("/order-success");
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="flex-1 flex flex-col bg-bgBase min-h-screen">
        <Header title="Your Order" showBack />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4">
          <div className="w-24 h-24 bg-gray-100/80 rounded-full flex items-center justify-center mb-2 shadow-sm border border-borderLite">
            <ShoppingBag size={40} className="text-inkLight" />
          </div>
          <h2 className="text-2xl font-extrabold text-ink tracking-tight">
            Your cart is empty
          </h2>
          <p className="text-inkMid text-sm mb-4">
            Pick something delicious from the menu!
          </p>
          <button
            onClick={() => router.back()}
            className="bg-primary hover:bg-primaryHover text-white font-bold py-3.5 px-8 rounded-2xl shadow-lg transition-colors"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-bgBase min-h-screen relative pb-32">
      <Header title="Your Order" showBack />

      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          {/* Table / Location Info */}
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-borderLite shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accentLight rounded-full flex items-center justify-center text-primary">
                <MapPin size={18} />
              </div>
              <div>
                <p className="font-bold text-ink text-sm">
                  {tableNumber === "Takeaway"
                    ? "Takeaway Order"
                    : `Table ${tableNumber?.split("-")[1] || tableNumber}`}
                </p>
                <p className="text-xs text-inkMid">{HOTEL_NAME}</p>
              </div>
            </div>
            <button
              onClick={() => {
                clearCart();
                setActiveOrder(null);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              <Trash2 size={14} />
              <span className="text-xs font-bold uppercase tracking-wider">
                Clear
              </span>
            </button>
          </div>

          {/* Cart Items */}
          <div className="space-y-3">
            {cart.map((item) => (
              <CartItemCard
                key={item.cartId}
                item={item}
                onUpdate={(qty) => updateQuantity(item.cartId, qty)}
                onRemove={() => removeFromCart(item.cartId)}
              />
            ))}
          </div>

          {/* Allergy Warning */}
          <div className="bg-[#FEF2F2] p-4 rounded-2xl border border-red-100 flex items-start gap-3 shadow-sm">
            <ShieldCheck size={18} className="text-red-500 mt-0.5 shrink-0" />
            <p className="text-xs text-inkMid leading-relaxed">
              If you have food allergies, please inform{" "}
              <strong className="text-ink">{HOTEL_NAME}</strong> before
              checkout.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-24 mt-4 lg:mt-0">
          <div className="bg-white p-5 rounded-2xl border border-borderLite shadow-sm space-y-3">
            <h3 className="font-bold text-ink text-base mb-1">Order Summary</h3>
            <div className="flex justify-between text-sm">
              <span className="text-inkMid">
                Items ({cart.reduce((a, b) => a + b.quantity, 0)})
              </span>
              <span className="font-semibold text-ink">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-inkMid">Service Fee (10%)</span>
              <span className="font-semibold text-ink">${tax.toFixed(2)}</span>
            </div>
            <div className="h-px w-full bg-borderLite my-2" />
            <div className="flex justify-between items-center pt-1">
              <span className="font-bold text-lg text-ink">Total</span>
              <span className="font-black text-2xl text-primary">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <p className="text-center text-xs text-inkLight pt-2 lg:hidden">
            All prices include GST where applicable
          </p>

          {/* Sticky Checkout Bar */}
          <div className="fixed bottom-0 left-0 right-0 z-40 mx-auto w-full max-w-md bg-white border-t border-borderLite p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] lg:static lg:max-w-none lg:bg-transparent lg:border-none lg:p-0 lg:shadow-none">
            <button
              onClick={handleInitialCheckout}
              disabled={isProcessing}
              className="w-full bg-primary hover:bg-primaryHover text-white font-bold text-base py-4 rounded-2xl shadow-[0_6px_20px_rgba(255,107,53,0.3)] transition-transform active:scale-[0.98] disabled:opacity-70 flex items-center justify-between px-6"
            >
              <span>
                {isProcessing
                  ? "Processing..."
                  : activeOrderId
                    ? "Update Order"
                    : "Confirm Order"}
              </span>
              {!isProcessing && (
                <span className="font-black tracking-tight">
                  ${total.toFixed(2)}
                </span>
              )}
            </button>
          </div>

          <p className="hidden lg:block text-center text-xs text-inkLight pt-2">
            All prices include GST where applicable
          </p>
        </div>
      </main>

      {/* Email Collection Modal */}
      <AnimatePresence>
        {showEmailModal && (
          <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowEmailModal(false)}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-accentLight rounded-full flex items-center justify-center text-primary">
                  <Mail size={24} />
                </div>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  <X size={18} className="text-inkMid" />
                </button>
              </div>

              <h2 className="text-2xl font-extrabold text-ink mb-2">
                Get Your Receipt
              </h2>
              <p className="text-sm text-inkMid mb-8 leading-relaxed">
                Enter your email address to receive a digital copy of your order
                receipt.
              </p>

              <div className="flex items-center bg-[#F9F9F9] border-2 border-borderLite rounded-2xl px-4 py-3 mb-6 focus-within:border-primary transition-colors">
                <Mail size={20} className="text-inkLight mr-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="flex-1 bg-transparent border-none outline-none text-base text-ink"
                />
              </div>

              {/* Terms Switch */}
              <div className="flex items-center justify-between bg-[#F9F9F9] p-4 rounded-2xl mb-8 border border-borderLite">
                <p className="text-xs text-inkMid leading-relaxed pr-4 flex-1">
                  I accept the{" "}
                  <button
                    onClick={() => router.push("/legal/terms")}
                    className="text-primary font-semibold hover:underline"
                  >
                    Terms &amp; Conditions
                  </button>{" "}
                  and{" "}
                  <button
                    onClick={() => router.push("/legal/privacy")}
                    className="text-primary font-semibold hover:underline"
                  >
                    Privacy Policy
                  </button>
                </p>

                {/* Custom Toggle Switch */}
                <button
                  onClick={() => setAcceptTerms(!acceptTerms)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${acceptTerms ? "bg-primary" : "bg-gray-300"}`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${acceptTerms ? "translate-x-6" : "translate-x-0"}`}
                  />
                </button>
              </div>

              <div className="space-y-3 pb-safe">
                <button
                  onClick={finalizeCheckout}
                  disabled={!acceptTerms || isProcessing}
                  className="w-full bg-primary hover:bg-primaryHover text-white font-bold text-base py-4 rounded-2xl shadow-lg transition-transform active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
                >
                  {isProcessing ? "Completing Order..." : "Complete Order"}
                </button>
                <button
                  onClick={finalizeCheckout}
                  disabled={isProcessing}
                  className="w-full py-4 text-sm font-semibold text-inkLight hover:text-inkMid transition-colors"
                >
                  Skip &amp; complete order
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
