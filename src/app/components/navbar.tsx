"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo2.png"
            alt="BigTech Logo"
            width={150}
            height={150}
            className="me-2"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-4 mt-4 lg:mt-0">
          <button className="px-4 py-2 border border-[#00C4F4] text-[#00C4F4] rounded hover:bg-[#00C4F4] hover:text-white transition-all duration-300">
            BUY $UPCOMING
          </button>
          <Link
            href={"/addCoinForm"}
            className="px-4 py-2 border border-[#00C4F4] rounded bg-[#00C4F4] hover:bg-sky-800 text-white transition-all duration-300"
          >
            ADD YOUR COIN
          </Link>
        </div>
      </div>
    </nav>
  );
}
