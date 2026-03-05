"use client";

import React from "react";
import { Header } from "../../../components/ui/Header";

export default function PrivacyPage() {
  return (
    <div className="flex-1 flex flex-col bg-bgBase min-h-screen">
      <Header title="Privacy Policy" showBack />
      <div className="p-6 md:p-12 bg-white flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto w-full prose prose-sm max-w-none text-inkMid">
          <h2 className="text-xl font-bold text-ink mb-4">
            1. Information We Collect
          </h2>
          <p className="mb-4 text-sm leading-relaxed">
            When you use Gobite Order, we may collect minimal personal
            information to process your order effectively, including:
          </p>
          <ul className="list-disc pl-5 mb-4 text-sm leading-relaxed space-y-2">
            <li>Your Name</li>
            <li>Phone Number (for order updates and verification)</li>
            <li>Email Address (if requested for receipts)</li>
            <li>Order Details and History</li>
          </ul>

          <h2 className="text-xl font-bold text-ink mt-8 mb-4">
            2. How We Use Information
          </h2>
          <p className="mb-4 text-sm leading-relaxed">
            We use the information we collect primarily to fulfill your orders,
            communicate with you regarding your meal status, and provide a
            seamless dining experience. We do not sell your personal data to
            third parties.
          </p>

          <h2 className="text-xl font-bold text-ink mt-8 mb-4">
            3. Data Storage (Demo Application)
          </h2>
          <p className="mb-4 text-sm leading-relaxed">
            This is a demonstration application. All entered data (e.g., name,
            phone number) is stored locally on your device using browser
            `localStorage` and is not transmitted to any external server. You
            can clear this data at any time by clearing your browser cache.
          </p>
        </div>
      </div>
    </div>
  );
}
