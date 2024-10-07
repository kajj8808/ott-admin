import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-dvh justify-center items-center bg-neutral-800 *:text-white *:font-medium">
      {children}
    </div>
  );
}
