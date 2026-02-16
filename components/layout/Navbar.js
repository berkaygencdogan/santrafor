import Link from "next/link";

export default function Navbar() {
  return (
    <div className="border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold text-red-600">
          SANTRAFOR
        </Link>

        {/* MENU */}
        <div className="hidden md:flex gap-6 font-medium">
          <Link href="/category/futbol">Futbol</Link>
          <Link href="/category/basketbol">Basketbol</Link>
          <Link href="/category/transfer">Transfer</Link>
          <Link href="/category/dunya">Dünya</Link>
        </div>
      </div>
    </div>
  );
}
