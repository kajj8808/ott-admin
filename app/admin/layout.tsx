import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center bg-neutral-900">
      {children}
    </div>
  );
}
