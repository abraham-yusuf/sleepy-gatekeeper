"use client";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "retro";
}

export function GlassPanel({
  children,
  className = "",
  variant = "default",
}: GlassPanelProps) {
  const variantClass =
    variant === "retro"
      ? "bg-retro-gray/70 border-primary/20"
      : "bg-[rgba(25,15,36,0.7)] border-primary/20";

  return (
    <div
      className={`glass-panel backdrop-filter backdrop-blur-12px border ${variantClass} ${className}`}
    >
      {children}
    </div>
  );
}
