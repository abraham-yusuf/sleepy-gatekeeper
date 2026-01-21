"use client";

interface Win95WindowProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
  titleBarColor?: "blue" | "retro-gray";
}

export function Win95Window({
  title,
  icon,
  children,
  onClose,
  className = "",
  titleBarColor = "blue",
}: Win95WindowProps) {
  const titleBarClass =
    titleBarColor === "blue"
      ? "bg-gradient-to-r from-blue-900 to-blue-600"
      : "bg-gradient-to-r from-[#000080] to-[#1084d0]";

  return (
    <div
      className={`win95-shadow bg-retro-gray rounded-sm flex flex-col ${className}`}
    >
      {/* Title Bar */}
      <div
        className={`${titleBarClass} px-2 py-1 flex items-center justify-between`}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-sm text-white">{icon}</span>}
          <span className="text-xs font-bold text-white">{title}</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="w-4 h-4 bg-retro-gray win95-shadow flex items-center justify-center text-black font-bold text-[10px] hover:bg-white transition-colors"
          >
            X
          </button>
        )}
      </div>
      {/* Content */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
