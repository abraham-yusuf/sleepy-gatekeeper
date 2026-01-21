"use client";

interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  selected?: boolean;
}

export function DesktopIcon({
  icon,
  label,
  onClick,
  selected = false,
}: DesktopIconProps) {
  return (
    <div
      className={`group flex flex-col items-center w-24 gap-1 cursor-pointer ${
        selected ? "desktop-icon-selected py-1" : ""
      }`}
      onClick={onClick}
    >
      <div className="size-12 flex items-center justify-center">{icon}</div>
      <span className="text-[11px] text-white text-center font-sans desktop-icon-label px-1 leading-tight">
        {label}
      </span>
    </div>
  );
}
