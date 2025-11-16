"use client";
import React from "react";
import Link from "next/link";

export default function InteractiveCard({
  children,
  contentName,
}: {
  children: React.ReactNode;
  contentName: string;
}) {
  function onCardSelected() {
    alert("You selected " + contentName);
  }

  return (
    <div className="w-full max-w-sm bg-white shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
      {children}
    </div>
  );
}
