import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-dvh w-full flex-col items-center justify-center">
      {children}
    </div>
  );
}
