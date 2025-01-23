"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="bg-cover bg-center h-[50vh]"
        style={{ backgroundImage: `url(/banner_bg.jpg)` }}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-7xl text-white text-center mx-auto font-bold">
            Upcoming Memecoin Launches.
          </h1>
        </div>
      </div> 
    </section>
  );
}
