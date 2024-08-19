import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center w-full pt-14 flex-col">
      <div className="max-w-2xl w-full">{children}</div>
    </div>
  );
}
