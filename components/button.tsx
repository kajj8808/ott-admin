"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}
export default function Button({ text }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-lime-500 text-white px-3.5 py-2 font-medium rounded-lg hover:bg-lime-400 transition-colors disabled:bg-neutral-600 disabled:hover:bg-neutral-600"
      disabled={pending}
    >
      {text}
    </button>
  );
}
