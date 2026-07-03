import { cn } from "@/lib/utils";

export default function IconButton({
  children,
  label,
  className,
  size = "md",
  active = false,
  ...props
}) {
  const sizeMap = {
    sm: "h-8 w-8",
    md: "h-9 w-9",
    lg: "h-10 w-10",
  };

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--radius-lg)]",
        "text-[var(--text-secondary)]",
        "transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]",
        "active:scale-95",
        "focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-page)]",
        active && "bg-[var(--accent-soft)] text-[var(--accent)]",
        sizeMap[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
