import { Header } from "@/components/ui/Header";

export default function AboutPage() {
  return (
    <>
      <Header title="About Us" showBack />
      <div className="flex-1 overflow-y-auto bg-bgBase p-4 md:p-8">
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-ink mb-4">About Gobite</h1>
          <p className="text-inkMid leading-relaxed">
            Gobite is a premier digital ordering experience designed to make
            restaurant dining as seamless as possible. Browse our handcrafted menus,
            place orders right from your table, and enjoy your meal without any hassle.
          </p>
        </div>
      </div>
    </>
  );
}
