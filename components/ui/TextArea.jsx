import { cn } from "@/lib/utils";

export default function TextArea({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 5,
  className,
  error,
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium tracking-tight text-[var(--text-primary)]"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          "w-full resize-none rounded-[var(--radius-lg)]",
          "border border-[var(--border)] bg-[var(--bg-surface)]",
          "px-4 py-3.5 text-sm leading-relaxed tracking-tight text-[var(--text-primary)]",
          "placeholder:text-[var(--text-muted)] placeholder:font-normal",
          "shadow-[var(--shadow-xs)]",
          "transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "hover:border-[var(--border-strong)]",
          "focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--accent-ring)] focus:outline-none",
          error && "border-red-400 focus:shadow-[0_0_0_3px_rgba(248,113,113,0.25)]",
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-2 text-xs font-medium text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
