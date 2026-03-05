"use client";

import { motion } from "framer-motion";
import {
  Copy,
  Navigation,
  QrCode,
  Lock,
  Phone,
  User,
  Mail,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useStore } from "../context/StoreContext";

type AuthView =
  | "login_otp_request"
  | "login_otp_verify"
  | "login_password"
  | "signup";

export default function GetStartedScreen() {
  const router = useRouter();
  const { login } = useStore();
  const [view, setView] = useState<AuthView>("login_otp_request");
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setView("login_otp_verify");
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (form.otp === "1234") {
        login({
          name: form.name || "Demo User",
          phone: form.phone,
          role: "customer",
        });
        router.push("/menu");
      } else {
        setError("Invalid demo code. Please use 1234.");
      }
    }, 800);
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone.trim() || !form.password.trim()) {
      setError("Please enter both phone and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (form.password === "demo123") {
        login({
          name: "Demo User",
          phone: form.phone,
          role: "customer",
        });
        router.push("/menu");
      } else {
        setError("Invalid password. Please use 'demo123'.");
      }
    }, 800);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !form.username.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.password.trim() ||
      !form.confirmPassword.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login({
        name: form.name,
        username: form.username,
        email: form.email,
        phone: form.phone,
        role: "customer",
      });
      router.push("/menu");
    }, 800);
  };

  const getTitle = () => {
    switch (view) {
      case "login_otp_request":
      case "login_password":
        return "Welcome Back";
      case "login_otp_verify":
        return "Verify Number";
      case "signup":
        return "Create Account";
    }
  };

  const getSubtitle = () => {
    switch (view) {
      case "login_otp_request":
        return "Login with your phone number";
      case "login_password":
        return "Enter your phone and password";
      case "login_otp_verify":
        return `Code sent to ${form.phone}`;
      case "signup":
        return "Sign up to begin ordering";
    }
  };

  return (
    <div className="flex-1 flex flex-col relative bg-[#F7F5F2] overflow-x-hidden min-h-screen">
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
          className="flex justify-center mt-6 mb-6"
        >
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
          key={view}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/80 backdrop-blur-md border border-white p-6 rounded-3xl shadow-xl space-y-5"
        >
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-extrabold text-ink tracking-tight">
              {getTitle()}
            </h1>
            <p className="text-sm text-inkMid">{getSubtitle()}</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-100 flex items-center gap-2">
              <span>{error}</span>
            </div>
          )}

          {/* ----- REQUEST OTP VIEW ----- */}
          {view === "login_otp_request" && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-inkMid uppercase tracking-wider ml-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-inkLight"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-white border-2 border-borderLite rounded-2xl pl-11 pr-4 py-3 text-base text-ink focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primaryHover text-white font-bold text-base py-4 rounded-2xl shadow-[0_6px_20px_rgba(255,107,53,0.3)] transition-all flex items-center justify-center disabled:opacity-70 mt-2"
              >
                {loading ? "Sending..." : "Send Verification Code"}
              </button>

              <button
                type="button"
                onClick={() => setView("login_password")}
                className="w-full py-2 text-sm font-semibold text-primary hover:text-primaryHover transition-colors mt-2"
              >
                Login with Password instead
              </button>
            </form>
          )}

          {/* ----- VERIFY OTP VIEW ----- */}
          {view === "login_otp_verify" && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="space-y-1 text-center">
                <input
                  type="text"
                  name="otp"
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
                  onClick={() => setView("login_otp_request")}
                  className="w-full py-2 text-sm font-semibold text-inkMid hover:text-ink transition-colors"
                >
                  Edit phone number
                </button>
              </div>
            </form>
          )}

          {/* ----- PASSWORD LOGIN VIEW ----- */}
          {view === "login_password" && (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-inkMid uppercase tracking-wider ml-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-inkLight"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-white border-2 border-borderLite rounded-2xl pl-11 pr-4 py-3 text-base text-ink focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-inkMid uppercase tracking-wider ml-1">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-inkLight"
                  />
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full bg-white border-2 border-borderLite rounded-2xl pl-11 pr-4 py-3 text-base text-ink focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="bg-accentLight px-4 py-3 rounded-xl flex items-center gap-2 mt-2">
                <Copy size={14} className="text-primary flex-shrink-0" />
                <p className="text-xs text-inkMid">
                  Demo password: <strong className="text-ink">demo123</strong>
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primaryHover text-white font-bold text-base py-4 rounded-2xl shadow-[0_6px_20px_rgba(255,107,53,0.3)] transition-all flex items-center justify-center disabled:opacity-70 mt-4"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <button
                type="button"
                onClick={() => setView("login_otp_request")}
                className="w-full py-2 text-sm font-semibold text-primary hover:text-primaryHover transition-colors mt-2"
              >
                Login with OTP instead
              </button>
            </form>
          )}

          {/* ----- SIGNUP VIEW ----- */}
          {view === "signup" && (
            <form onSubmit={handleSignup} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-inkMid uppercase tracking-wider ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-inkLight"
                  />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-white border-2 border-borderLite rounded-2xl pl-11 pr-4 py-2.5 text-sm text-ink focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-inkMid uppercase tracking-wider ml-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="johndoe"
                    className="w-full bg-white border-2 border-borderLite rounded-2xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-inkMid uppercase tracking-wider ml-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(555)"
                    className="w-full bg-white border-2 border-borderLite rounded-2xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-inkMid uppercase tracking-wider ml-1">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-inkLight"
                  />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-white border-2 border-borderLite rounded-2xl pl-11 pr-4 py-2.5 text-sm text-ink focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-inkMid uppercase tracking-wider ml-1">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-inkLight"
                  />
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="w-full bg-white border-2 border-borderLite rounded-2xl pl-11 pr-4 py-2.5 text-sm text-ink focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-inkMid uppercase tracking-wider ml-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-inkLight"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full bg-white border-2 border-borderLite rounded-2xl pl-11 pr-4 py-2.5 text-sm text-ink focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primaryHover text-white font-bold text-base py-3.5 rounded-2xl shadow-[0_6px_20px_rgba(255,107,53,0.3)] transition-all flex items-center justify-center disabled:opacity-70 mt-4"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>
          )}

          {/* ----- BOTTOM TOGGLE LINKS ----- */}
          <div className="pt-2 border-t border-borderLite mt-2 text-center pb-2">
            {view === "signup" ? (
              <p className="text-sm text-inkMid">
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setError("");
                    setView("login_otp_request");
                  }}
                  className="text-primary font-bold hover:underline"
                >
                  Log In
                </button>
              </p>
            ) : (
              <p className="text-sm text-inkMid">
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    setError("");
                    setView("signup");
                  }}
                  className="text-primary font-bold hover:underline"
                >
                  Sign Up
                </button>
              </p>
            )}
          </div>

          <p className="text-center text-[10px] text-inkLight leading-relaxed pt-1">
            By continuing, you agree to our{" "}
            <button
              onClick={() => router.push("/legal/terms")}
              className="text-primary font-semibold hover:underline cursor-pointer inline-block mx-0.5"
            >
              Terms
            </button>
            &amp;
            <button
              onClick={() => router.push("/legal/privacy")}
              className="text-primary font-semibold hover:underline cursor-pointer inline-block mx-0.5"
            >
              Privacy
            </button>
          </p>
        </motion.div>

        {/* Feature Highlights beneath - Hidden on signup to save space */}
        {view !== "signup" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-auto pt-6 flex justify-center gap-6 pb-4"
          >
            <div className="flex flex-col items-center gap-1.5 opacity-70">
              <div className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center shadow-sm text-ink">
                <Navigation size={18} />
              </div>
              <span className="text-[10px] uppercase font-bold text-inkMid">
                No Signup Needed
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
        )}
      </div>
    </div>
  );
}
