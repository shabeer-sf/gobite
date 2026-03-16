import { Header } from "@/components/ui/Header";

export default function SupportPage() {
  return (
    <>
      <Header title="Support" showBack />
      <div className="flex-1 overflow-y-auto bg-bgBase p-4 md:p-8">
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-ink mb-4">Here to Help</h1>
          <p className="text-inkMid leading-relaxed">
            If you encounter any issues with your order or our app, please speak to
            one of our staff members or reach out to us at 1-800-GOBITE.
          </p>
        </div>
      </div>
    </>
  );
}
