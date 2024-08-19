"use client";

import { useFormStatus } from "react-dom";

export default function Button({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      className="p-2 bg-amber-500 text-white rounded-md hover:bg-amber-400 disabled:bg-neutral-600 disabled:hover:bg-slate-600"
      disabled={pending}
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
