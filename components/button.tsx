"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="flex h-9 w-full items-center justify-center bg-blue-500 text-sm text-white transition-colors hover:bg-blue-600 disabled:bg-neutral-400 disabled:text-neutral-300"
    >
      {pending ? (
        <div className="size-5 animate-spin">
          <ArrowPathIcon />
        </div>
      ) : (
        text
      )}
    </button>
  );
}
