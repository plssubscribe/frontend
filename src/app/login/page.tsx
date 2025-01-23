"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../../toast-message/toastProvider";

export default function Page() {
  const router = useRouter();
  const { addToast } = useToast();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      if (!res.ok) {
        addToast("error", "Invalid credentials", 3000);
        setLoginData({ email: "", password: "" });
        return;
      }
      const data = await res.json();
      localStorage.setItem("token", data.token);
      if (data.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
      setLoginData({ email: "", password: "" });
    } catch (error) {
      console.log(error);
      setLoginData({ email: "", password: "" });
    }
  };

  return (
    <div className="max-w-3xl space-y-10 my-10 py-10 mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-lg border border-[#00C4F4]">
      <h1 className="text-4xl text-center font-bold text-white tracking-wider">
        Login
      </h1>
      <div className="w-[80%] space-y-6 mx-auto">
        <div className="flex flex-col text-white">
          <label htmlFor="email" className="text-lg font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-md w-full bg-[#1A1F26] focus:outline-none text-white placeholder-gray-400 border border-[#00C4F4] transition duration-200 ease-in focus:ring-2 focus:ring-[#00C4F4]"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col text-white">
          <label htmlFor="password" className="text-lg font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="px-4 py-3 rounded-md w-full bg-[#1A1F26] focus:outline-none text-white placeholder-gray-400 border border-[#00C4F4] transition duration-200 ease-in focus:ring-2 focus:ring-[#00C4F4]"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
        </div>
        <button
          onClick={() =>
            Object.values(loginData).every((val) => val !== "") && loginUser()
          }
          className="px-4 py-3 w-full bg-[#00C4F4] text-white font-semibold rounded-md hover:bg-[#0286A4] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          Login
        </button>
      </div>
    </div>
  );
}
