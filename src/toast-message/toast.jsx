import React, { useState, useEffect } from "react";

const Toast = ({ toast, onClose }) => {
  const { id, type, message, duration } = toast;
  const [show, setShow] = useState(false);

  const typeStyles = {
    success: "bg-emerald-500 text-white border border-emerald-600 shadow-lg",
    error: "bg-rose-500 text-white border border-rose-600 shadow-lg",
    info: "bg-sky-500 text-white border border-sky-600 shadow-lg",
    warning: "bg-amber-500 text-white border border-amber-600 shadow-lg",
  };

  useEffect(() => {
    setShow(true);
    if (duration) {
      const timer = setTimeout(() => handleClose(), duration);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => onClose(id), 500);
  };

  return (
    <div
      className={`transform transition-all duration-500 ease-in-out ${
        show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
      } flex items-center justify-between max-w-sm w-full px-4 py-3 rounded shadow ${
        typeStyles[type] || "bg-gray-800 text-white"
      }`}
    >
      <span>{message}</span>
      <button
        onClick={handleClose}
        className="ml-4 text-xl font-bold focus:outline-none"
      >
        &times;
      </button>
    </div>
  );
};

export default Toast;
