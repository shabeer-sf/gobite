"use client";

import React from "react";
import { Header } from "../../../components/ui/Header";

export default function TermsPage() {
  return (
    <div className="flex-1 flex flex-col bg-bgBase min-h-screen">
      <Header title="Terms & Conditions" showBack />
      <div className="p-6 md:p-12 bg-white flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto w-full prose prose-sm max-w-none text-inkMid">
          <h2 className="text-xl font-bold text-ink mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="mb-4 text-sm leading-relaxed">
            By accessing or using the Gobite Web Ordering application, you agree
            to be bound by these Terms and Conditions. If you do not agree,
            please do not use the application.
          </p>

          <h2 className="text-xl font-bold text-ink mt-8 mb-4">
            2. Ordering and Payment
          </h2>
          <ul className="list-disc pl-5 mb-4 text-sm leading-relaxed space-y-2">
            <li>
              All orders placed through the app are subject to availability and
              acceptance by the restaurant.
            </li>
            <li>Prices displayed are subject to change without notice.</li>
            <li>
              A service fee or gratuity may be automatically applied to your
              order according to the establishment's policy.
            </li>
            <li>
              Currently, this demo application does not process real payments.
              All transactions are simulated.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-ink mt-8 mb-4">
            3. User Responsibilities
          </h2>
          <p className="mb-4 text-sm leading-relaxed">
            You agree to provide accurate, current, and complete information
            during the checkout process (including table numbers and dietary
            requirements).
          </p>
        </div>
      </div>
    </div>
  );
}
