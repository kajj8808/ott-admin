"use client";
import { CheckBadgeIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

interface NotificationBoxProps {
  type: "error" | "success" | "edit";
  text: string;
}
export default function NotificationBox({ text, type }: NotificationBoxProps) {
  const [loaded, setLoaded] = useState(true);
  useEffect(() => {
    setLoaded(false);
  }, [loaded]);
  return (
    <div
      className={`absolute top-8 right-10 bg-neutral-600 px-4 py-3 rounded-2xl text-white flex gap-2 items-center transition-opacity before:opacity-0 delay-[6000ms] ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <CheckBadgeIcon className="size-5" />
      <span className="font-medium">{text}</span>
    </div>
  );
}
