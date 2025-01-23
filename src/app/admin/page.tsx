"use client";

import React, { useState, useEffect } from "react";
import Upcomings from "../components/upcomings";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

export default function AdminPage() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;

    if (!token) router.push("/login");
    else {
      try {
        const decoded = jwt.decode(token) as jwt.JwtPayload;
        if (decoded?.role !== "admin") router.push("/login");
      } catch (error) {
        console.log("Invalid token", error);
      }
    }
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className="bg-black text-white py-16">
      <div className="text-center">
        <h1 className="text-white text-6xl font-semibold text-center">
          Admin Page
        </h1>
      </div>

      <Upcomings />
    </div>
  );
}
