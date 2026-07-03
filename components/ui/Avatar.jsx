import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Avatar({
  src = "https://i.pravatar.cc/80?img=32",
  alt = "User profile",
  size = 40,
  className,
}) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full",
        "ring-2 ring-[var(--bg-surface)] ring-offset-2 ring-offset-[var(--bg-page)]",
        "shadow-[var(--shadow-sm)]",
        "transition-shadow duration-200 hover:shadow-[var(--shadow-md)]",
        className
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-cover"
      />
    </div>
  );
}
