import { cn } from "@/lib/utils";

export default function Card({
  children,
  className,
  as: Component = "div",
  padding = "md",
  ...props
}) {
  const paddingMap = {
    none: "",
    sm: "p-3.5",
    md: "p-4 sm:p-5",
    lg: "p-5 sm:p-6",
  };

  return (
    <Component
      className={cn(
        "rounded-[var(--radius-xl)] bg-[var(--bg-surface)]",
        "border border-[var(--border-subtle)] shadow-[var(--shadow-card)]",
        paddingMap[padding],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
