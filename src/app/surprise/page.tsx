"use client";

import React from "react";
import EnvelopeSurprise from "@/components/EnvelopeSurprise";

export default function SurprisePage() {
  return (
    <main className="min-h-screen w-full bg-[#F3ECE1] text-stone-900 flex flex-col items-center justify-center p-3 sm:p-6 overflow-x-hidden">
      {/* Background Soft Ambient Lights */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="w-full max-w-2xl">
        <EnvelopeSurprise />
      </div>
    </main>
  );
}
