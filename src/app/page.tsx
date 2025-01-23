"use client";
import React, { useEffect } from "react";
import HeroSection from "@/app/components/hero-section";
import Upcomings from "@/app/components/upcomings";
import ChooseUs from "@/app/components/choose-us";
import ContactUs from "@/app/components/contact-us";

export default function Home() {
  const loginUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "user@gmail.com",
          password: "12345",
        }),
      });
      const data = await res.json();    
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loginUser();
  }, []);

  return (
    <main className="space-y-16">
      <HeroSection />
      <Upcomings />
      <ChooseUs />
      <ContactUs />
    </main>
  );
}
