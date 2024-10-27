import React from "react";

export default function GradientText({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
      {children}
    </div>
  );
}
