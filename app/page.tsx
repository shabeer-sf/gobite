"use client";

import { motion } from "framer-motion";
import { Copy, Navigation, QrCode } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useStore } from "../context/StoreContext";

export default function GetStartedScreen() {
  const router = useRouter();
  const { login } = useStore();
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({ name: "", phone: "", otp: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Please enter your name and phone number.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 800);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (form.otp === "1234") {
        login({ name: form.name, phone: form.phone, role: "customer" });
        router.push("/menu");
      } else {
        setError("Invalid demo code. Please use 1234.");
      }
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col relative bg-[#F7F5F2] overflow-hidden min-h-screen">
      {/* Decorative Circles */}
      <div className="absolute -top-32 -right-28 w-96 h-96 bg-[#FFDAC8] opacity-55 rounded-full blur-2xl" />
      <div className="absolute -bottom-32 -left-20 w-72 h-72 bg-[#FFE8D6] opacity-55 rounded-full blur-xl" />

      {/* Main Container */}
      <div className="relative z-10 flex-1 flex flex-col px-6 py-8 max-w-md mx-auto w-full">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mt-12 mb-8"
        >
          {/* Mock Logo placeholder for aesthetic */}
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
              <QrCode size={28} />
            </div>
            <span className="text-3xl font-black text-ink tracking-tight">
              Gobite
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/80 backdrop-blur-md border border-white p-6 rounded-3xl shadow-xl space-y-6"
        >
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-extrabold text-ink tracking-tight">
              {step === 1 ? "Let's get started" : "Verify Number"}
            </h1>
            <p className="text-sm text-inkMid">
              {step === 1
                ? "Enter details to begin ordering"
                : `Code sent to ${form.phone}`}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-100 flex items-center gap-2">
              <span>{error}</span>
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-inkMid uppercase tracking-wider ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full bg-white border-2 border-borderLite rounded-2xl px-4 py-3 text-base text-ink focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-inkMid uppercase tracking-wider ml-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-white border-2 border-borderLite rounded-2xl px-4 py-3 text-base text-ink focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="bg-accentLight px-4 py-3 rounded-xl flex items-center gap-2 mt-2">
                <Copy size={14} className="text-primary flex-shrink-0" />
                <p className="text-xs text-inkMid">
                  Demo: use any name and phone number.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primaryHover text-white font-bold text-base py-4 rounded-2xl shadow-[0_6px_20px_rgba(255,107,53,0.3)] transition-all flex items-center justify-center disabled:opacity-70 mt-4"
              >
                {loading ? "Sending..." : "Send Verification Code"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-1 text-center">
                <input
                  type="text"
                  maxLength={4}
                  value={form.otp}
                  onChange={(e) =>
                    setForm({ ...form, otp: e.target.value.replace(/\D/g, "") })
                  }
                  placeholder="• • • •"
                  className="w-full text-center bg-white border-2 border-borderLite rounded-2xl py-5 text-4xl font-black text-ink tracking-[0.5em] focus:outline-none focus:border-primary transition-colors"
                  autoFocus
                />
              </div>

              <div className="bg-accentLight px-4 py-3 rounded-xl flex items-center gap-2">
                <Copy size={14} className="text-primary flex-shrink-0" />
                <p className="text-xs text-inkMid">
                  Demo code: <strong className="text-ink">1234</strong>
                </p>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primaryHover text-white font-bold text-base py-4 rounded-2xl shadow-[0_6px_20px_rgba(255,107,53,0.3)] transition-all flex items-center justify-center disabled:opacity-70"
                >
                  {loading ? "Verifying..." : "Verify & Start Ordering"}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full py-2 text-sm font-semibold text-inkMid hover:text-ink transition-colors"
                >
                  Edit phone number
                </button>
              </div>
            </form>
          )}

          <p className="text-center text-xs text-inkLight leading-relaxed pt-2">
            By continuing, you agree to our <br />
            <button
              onClick={() => router.push("/legal/terms")}
              className="text-primary font-semibold hover:underline cursor-pointer inline-block mx-1"
            >
              Terms
            </button>
            &amp;
            <button
              onClick={() => router.push("/legal/privacy")}
              className="text-primary font-semibold hover:underline cursor-pointer inline-block mx-1"
            >
              Privacy Policy
            </button>
            .
          </p>
        </motion.div>

        {/* Feature Highlights beneath */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-auto pt-8 flex justify-center gap-6 pb-4"
        >
          <div className="flex flex-col items-center gap-1.5 opacity-70">
            <div className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center shadow-sm text-ink">
              <Navigation size={18} />
            </div>
            <span className="text-[10px] uppercase font-bold text-inkMid">
              No Signup
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5 opacity-70">
            <div className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center shadow-sm text-ink">
              <QrCode size={18} />
            </div>
            <span className="text-[10px] uppercase font-bold text-inkMid">
              Live Menu
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
