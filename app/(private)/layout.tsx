import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh w-full justify-center overflow-scroll">
      {children}
    </div>
  );
}
