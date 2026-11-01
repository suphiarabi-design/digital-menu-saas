import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/70 bg-white/75 shadow-glass backdrop-blur-2xl",
        className,
      )}
      {...props}
    />
  );
}
