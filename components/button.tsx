import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { ButtonHTMLAttributes } from "react";
interface ButtonProps {
  pending?: boolean;
  text: string;
}

export default function Button({
  pending,
  text,
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="flex w-full justify-center rounded-sm border p-3 font-semibold uppercase outline-none transition hover:bg-white hover:text-neutral-900 disabled:animate-pulse"
      disabled={pending}
    >
      {pending ? (
        <div className="size-6 animate-spin">
          <ArrowPathIcon />
        </div>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
}
