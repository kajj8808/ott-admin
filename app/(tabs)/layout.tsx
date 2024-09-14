import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-neutral-800 w-full h-dvh *:text-gray-200">
      {children}
    </div>
  );
}
