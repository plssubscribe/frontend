"use client";

import { useEffect, useState } from "react";
import { IoCloudUploadSharp } from "react-icons/io5";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  clusterApiUrl,
} from "@solana/web3.js";
import { useToast } from "../../toast-message/toastProvider";


declare global {
  interface Window {
    solana: any;
  }
  interface chargePhantomWalletResponse {
    confirmed: boolean;
    txId?: string;
    error?: Error;
  }
}

export default function AddCoinForm() {
  const { addToast } = useToast();
  const [coinData, setCoinData] = useState({
    name: "",
    description: "",
    launchDate: "",
    website: "",
    twitter: "",
    telegram: "",
    facebook: "",
    instagram: "",
  });

  const [symbolFile, setSymbolFile] = useState<File | null>(null);

  const reset = () => {
    setCoinData({
      name: "",
      description: "",
      launchDate: "",
      website: "",
      twitter: "",
      telegram: "",
      facebook: "",
      instagram: "",
    });
    setSymbolFile(null);
  }

  async function chargePhantomWallet(): Promise<chargePhantomWalletResponse> {
    // Check if Phantom Wallet is installed
    const provider = window.solana;
    if (!provider || !provider.isPhantom) {
      return {
        confirmed: false,
        error: new Error("Phantom Wallet not installed."),
      };
    }

    try {
      await provider.connect();
      const walletPublicKey = provider.publicKey.toString();
      console.log("Connected account:", walletPublicKey);

      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

      const recipientPublicKeyEnv =
        process.env.NEXT_PUBLIC_RECIPIENT_PUBLIC_KEY;
      if (!recipientPublicKeyEnv) {
        addToast("error", "Recipient public key is not defined.", 5000);
        console.error(
          "Recipient public key is not defined in environment variables."
        );
        return {
          confirmed: false,
          error: new Error("Recipient public key is not defined."),
        };
      }

      const recipientPublicKey = new PublicKey(recipientPublicKeyEnv);

      // Define the transaction amount in lamports (1 SOL = 1,000,000,000 lamports)
      const lamportsPerSol = process.env.NEXT_PUBLIC_LAMPORTS_PER_SOL ? parseInt(process.env.NEXT_PUBLIC_LAMPORTS_PER_SOL) : 0;
      const amount = lamportsPerSol * 0.25; // 0.25 SOL

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: provider.publicKey,
          toPubkey: recipientPublicKey,
          lamports: amount,
        })
      );

      transaction.feePayer = provider.publicKey;
      const latestBlockhash = await connection.getLatestBlockhash();
      transaction.recentBlockhash = latestBlockhash.blockhash;

      // Sign the transaction
      const signedTransaction = await provider.signTransaction(transaction);

      // Send the signed transaction
      const txId = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );
      console.log("Transaction sent with ID:", txId);

      // Confirm the transaction using the recommended approach
      const confirmation = await connection.confirmTransaction(
        {
          signature: txId,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        },
        "confirmed" // Commitment level
      );

      if (confirmation.value.err) {
        console.log("Transaction failed:", confirmation.value.err);
        addToast("error", "Transaction failed. Please try again.", 5000);
        return { confirmed: false, txId };
      } else {
        console.log("Transaction confirmed:", txId);
        addToast("success", "Transaction confirmed!", 5000);
        return { confirmed: true, txId };
      }
    } catch (error: any) {
      if (error.message && error.message.includes("User rejected the request")) {
        console.warn("User rejected the wallet request.");
        addToast("error", "You rejected the wallet request. Please try again if needed.", 5000);
      } else {
        console.error("An unexpected error occurred:", error);
        addToast("error", "An error occurred. Please try again.", 5000);
      }
      return {
        confirmed: false,
        error: new Error("Error charging the wallet."),
      };
    }
  }

  const handleSubmit = async () => {
    try {
      const transactionResponse: chargePhantomWalletResponse =
        await chargePhantomWallet();
      if (!transactionResponse.confirmed) {
        console.log("Transaction failed:", transactionResponse.txId);
        addToast("error", "Transaction failed.", 5000);
        // Reset the form
        reset();
        return;
      }
      const formData = new FormData();
      formData.append("name", coinData.name);
      if (symbolFile) formData.append("symbol", symbolFile);
      formData.append("description", coinData.description);
      formData.append("launchDate", coinData.launchDate);
      formData.append("website", coinData.website);
      formData.append("twitter", coinData.twitter);
      formData.append("telegram", coinData.telegram);
      formData.append("facebook", coinData.facebook);
      formData.append("instagram", coinData.instagram);

      const response = await fetch("http://localhost:5000/api/coin/create", {
        method: "POST",
        body: formData,
      });
      if (response.status !== 200) {
        addToast("error", "Failed to create the coin.", 5000);
        return;
      }
      await response.json();
      addToast("success", "Coin created successfully.");
    } catch (error) {
      console.log(error);
      alert("Failed to create the coin.");
    }

    // Reset the form
    reset();
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-gray-900 text-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center ">
        Add <span className="text-sky-500/80 text-4xl">Coins</span>
      </h1>

      {/* Token Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Token Name</label>
        <input
          type="text"
          placeholder="Doge"
          value={coinData.name}
          onChange={(e) => setCoinData({ ...coinData, name: e.target.value })}
          className="w-full p-3 border-2 border-sky-700 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300"
        />
      </div>

      {/* Symbol */}
      <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Symbol</label>
      <div className="flex items-center gap-2 rounded-lg p-4 border-2 border-sky-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300">
        <label
          htmlFor="fileInput"
          className="flex items-center gap-2 cursor-pointer"
        >
          <IoCloudUploadSharp className="h-8 w-8" />
          <span className="text-gray-300">
            {symbolFile ? symbolFile.name : "Upload"}
          </span>
        </label>
        <input
          id="fileInput"
          type="file"
          accept=".png, .jpg, .jpeg"
          className="absolute w-0 h-0 opacity-0"
          onChange={(e) => {
            if (e.target.files) {
              setSymbolFile(e.target.files[0]);
            }
          }}
        />
      </div>
    </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          placeholder="Dogecoin (DOGE) is an open-source, peer-to-peer cryptocurrency that was made as a parody of the crypto market following the establishment of Bitcoin."
          rows={3}
          className="w-full p-3 border-2 border-sky-700 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300"
          value={coinData.description}
          onChange={(e) =>
            setCoinData({ ...coinData, description: e.target.value })
          }
        ></textarea>
      </div>

      {/* Launch Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Launch Date & Time
        </label>
        <input
          type="datetime-local"
          className="w-full p-3 border-2 border-sky-700 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300"
          value={coinData.launchDate}
          onChange={(e) =>
            setCoinData({ ...coinData, launchDate: e.target.value })
          }
        />
      </div>

      {/* Purpose */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Purpose</label>
        <textarea
          placeholder="Dogecoin (DOGE) is an open-source, peer-to-peer cryptocurrency that..."
          rows={3}
          className="w-full p-3 border-2 border-sky-700 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300"
        ></textarea>
      </div>

      {/* Project Official Site Link */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Project Official Site Link
        </label>
        <input
          type="text"
          placeholder="Project Official Site Link"
          className="w-full p-3 border-2 border-sky-700 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300"
          value={coinData.website}
          onChange={(e) =>
            setCoinData({ ...coinData, website: e.target.value })
          }
        />
      </div>

      {/* Social Media Links */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-4">
          Social Media Links
        </label>
        <div className="space-y-4">
          <div className="flex items-center justify-between w-full p-2 border-2 border-sky-700 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300">
            <div className="flex items-center gap-2 basis-[80%]">
              <img src={"/twitter2.png"} alt="Twitter" className="h-6 w-6" />
              <input
                type="text"
                placeholder="Twitter"
                className="w-full bg-transparent focus:outline-none"
                value={coinData.twitter}
                onChange={(e) =>
                  setCoinData({ ...coinData, twitter: e.target.value })
                }
              />
            </div>
            <button
              type="button"
              className="basis-[20%] whitespace-nowrap bg-sky-500 p-2 rounded text-xs font-medium hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            >
              Connect with Twitter
            </button>
          </div>
          <div className="flex items-center justify-between w-full p-2 border-2 border-sky-700 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300">
            <div className="flex items-center gap-2 basis-[80%]">
              <img src={"/telegram2.png"} alt="Telegram" className="h-6 w-6" />
              <input
                type="text"
                placeholder="Telegram"
                className="w-full bg-transparent focus:outline-none"
                value={coinData.telegram}
                onChange={(e) =>
                  setCoinData({ ...coinData, telegram: e.target.value })
                }
              />
            </div>
            <button
              type="button"
              className="basis-[20%] whitespace-nowrap bg-sky-500 p-2 rounded text-xs font-medium hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            >
              Connect with Telegram
            </button>
          </div>
          <div className="flex items-center justify-between w-full p-2 border-2 border-sky-700 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300">
            <div className="flex items-center gap-2 basis-[80%]">
              <img src={"/fb2.png"} alt="Facebook" className="h-6 w-6 " />
              <input
                type="text"
                placeholder="Facebook"
                className="w-full bg-transparent focus:outline-none"
                value={coinData.facebook}
                onChange={(e) =>
                  setCoinData({ ...coinData, facebook: e.target.value })
                }
              />
            </div>
            <button
              type="button"
              className="basis-[20%] whitespace-nowrap bg-sky-500 p-2 rounded text-xs font-medium hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            >
              Connect with Facebook
            </button>
          </div>
          <div className="flex items-center justify-between w-full p-2 border-2 border-sky-700 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300">
            <div className="flex items-center gap-2 basis-[80%]">
              <img
                src={"/instagram2.png"}
                alt="Instagram"
                className="h-6 w-6"
              />
              <input
                type="text"
                placeholder="Instagram"
                className="w-full bg-transparent focus:outline-none"
                value={coinData.instagram}
                onChange={(e) =>
                  setCoinData({ ...coinData, instagram: e.target.value })
                }
              />
            </div>
            <button
              type="button"
              className="basis-[20%] whitespace-nowrap bg-sky-500 p-2 rounded text-xs font-medium hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            >
              Connect with Instagram
            </button>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          onClick={() =>
            // await chargePhantomWallet()
            Object.values(coinData).every((val) => val !== "") ? handleSubmit() : addToast("error", "Please fill all the fields.", 5000)
          }
          className="px-24 py-3 bg-sky-500 text-white font-medium rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
        >
          Create
        </button>
      </div>
    </div>
  );
}
