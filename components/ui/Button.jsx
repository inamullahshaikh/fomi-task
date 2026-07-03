import { cn } from "@/lib/utils";

const variants = {
  primary: [
    "bg-[var(--accent)] text-[var(--text-inverse)]",
    "shadow-[var(--shadow-sm)]",
    "hover:bg-[var(--accent-hover)] hover:shadow-[var(--shadow-md)]",
    "active:scale-[0.98] active:shadow-[var(--shadow-xs)]",
  ].join(" "),
  secondary: [
    "bg-[var(--bg-surface)] text-[var(--text-primary)]",
    "border border-[var(--border)] shadow-[var(--shadow-xs)]",
    "hover:bg-[var(--bg-hover)] hover:border-[var(--border-strong)]",
    "active:scale-[0.98]",
  ].join(" "),
  ghost: [
    "bg-transparent text-[var(--text-secondary)]",
    "hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]",
    "active:scale-[0.98]",
  ].join(" "),
};

const sizes = {
  sm: "h-8 px-3 text-[0.8125rem] gap-1.5 rounded-[var(--radius-md)]",
  md: "h-10 px-4 text-sm gap-2 rounded-[var(--radius-lg)]",
  lg: "h-11 px-5 text-sm font-semibold gap-2 rounded-[var(--radius-lg)]",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  disabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center font-medium",
        "transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-page)]",
        "disabled:opacity-45 disabled:cursor-not-allowed disabled:pointer-events-none disabled:scale-100",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <span
          className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin"
          aria-hidden="true"
        />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
}
