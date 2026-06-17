import React from "react";

export default function IntroCard() {
  return (
    <div className="relative max-w-xl mx-auto overflow-hidden rounded-2xl p-7 text-center bg-gradient-to-br from-white via-gray-50 to-white shadow-md border border-gray-100">
      
      {/* subtle glow effect */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_#60a5fa,_transparent_60%)] pointer-events-none" />

      <div className="relative">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3 tracking-tight">
          What's in your fridge?
        </h2>

        <p className="text-gray-600 leading-relaxed mb-4">
          Tell us what ingredients you have, and we’ll turn them into recipe ideas instantly.
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <span className="px-2 py-1 rounded-full bg-gray-100">Simple</span>
          <span className="px-2 py-1 rounded-full bg-gray-100">Fast</span>
          <span className="px-2 py-1 rounded-full bg-gray-100">Smart cooking</span>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          Waste less. Cook better.
        </p>
      </div>
    </div>
  );
}