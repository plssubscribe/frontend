"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { GoThumbsup, GoThumbsdown } from "react-icons/go";
import { useToast } from "../../toast-message/toastProvider";

export default function Upcomings() {
  const { addToast } = useToast();
  const [upcomingCoins, setUpcomingCoins] = useState<any>([]);

  const fetchCoins = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/coin");
      const data = await res.json();
      setUpcomingCoins(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateVotes = async (id: number, type: string, count: number) => {
    try {
      const res = await fetch(`http://localhost:5000/api/coin/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          type === "upvotes" ? { upvotes: count + 1 } : { downvotes: count + 1 }
        ),
      });
      const coin = await res.json();
      setUpcomingCoins(
        upcomingCoins.map((pkg: any) => (pkg.id === id ? coin : pkg))
      );
      addToast("success", "vote cast successfully", 3000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div className="bg-black text-white py-16">
      <div className="overflow-x-auto my-10 w-[90%] mx-auto">
        <table className="min-w-full table-auto shadow-lg">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Logo
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Sticker
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Time
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Votes
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Social
              </th>
            </tr>
          </thead>
          <tbody>
            {upcomingCoins.length > 0 ? (
              upcomingCoins.map((pkg: any) => (
                <tr key={pkg.id} className="divide-x divide-slate-700">
                  <td className="px-6 py-3 text-gray-200 whitespace-nowrap ">
                    {pkg.launchDate.split("T")[0]}
                  </td>
                  <td className="px-6 py-3">
                    <img
                      src={pkg.symbol}
                      alt={pkg.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-3 font-semibold text-gray-200">
                    {pkg.name}
                  </td>
                  <td className="px-6 py-3 text-gray-200">{pkg.description}</td>
                  <td className="px-6 py-3 text-gray-200">
                    {pkg.launchDate.split("T")[1].split(".")[0]}
                  </td>
                  <td className="px-6 py-3 text-center font-bold text--200">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <GoThumbsup
                          className="w-6 h-6 hover:scale-125 cursor-pointer transition-all duration-300"
                          onClick={() =>
                            updateVotes(pkg.id, "upvotes", pkg.upvotes)
                          }
                        />
                        <span className="text-xs">{pkg.upvotes}</span>
                      </div>
                      {/* <div>
                        <GoThumbsdown
                          className="w-6 h-6 hover:scale-125 cursor-pointer transition-all duration-30"
                          onClick={() =>
                            updateVotes(pkg.id, "downvotes", pkg.downvotes)
                          }
                        />
                        <span className="text-xs">{pkg.downvotes}</span>
                      </div> */}
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center font-bold text--200">
                    <div className="flex items-center justify-between gap-3">
                      <a href={pkg.twitter} className="hover:scale-125 cursor-pointer transition-all duration-300">
                        <Image
                          src="/twitter.png"
                          alt="Twitter"
                          width={20}
                          height={20}
                        />
                      </a>
                      <a href={pkg.telegram} className="hover:scale-125 cursor-pointer transition-all duration-300">
                        <Image
                          src="/telegram.png"
                          alt="Telegram"
                          width={20}
                          height={20}
                        />
                      </a>
                      <a href={pkg.facebook} className="hover:scale-125 cursor-pointer transition-all duration-300">
                        <Image
                          src="/fb.png"
                          alt="Facebook"
                          width={8}
                          height={8}
                        />
                      </a>
                      <a href={pkg.instagram} className="hover:scale-125 cursor-pointer transition-all duration-300">
                        <Image
                          src="/instagram.png"
                          alt="Instagram"
                          width={20}
                          height={20}
                        />
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-5">
                  No upcoming coins
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
