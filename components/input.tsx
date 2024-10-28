import { InputHTMLAttributes } from "react";

interface InputProps {
  name: string;
  errors?: string[];
}

export default function Input({
  name,
  errors,
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1">
      <input
        name={name}
        {...rest}
        className="border border-neutral-500 bg-transparent px-3 py-1.5 text-sm outline-none transition-colors placeholder:text-neutral-500 focus:border-blue-500"
      />
      <div className="flex gap-1">
        {errors?.map((error, index) => (
          <span key={index} className="text-xs text-red-500">
            {error}
          </span>
        ))}
      </div>
    </div>
  );
}
