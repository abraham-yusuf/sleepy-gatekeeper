"use client";

interface TaskbarButton {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

interface TaskbarProps {
  buttons?: TaskbarButton[];
  showStartMenu?: boolean;
  onStartClick?: () => void;
  children?: React.ReactNode;
}

export function Taskbar({
  buttons = [],
  showStartMenu = false,
  onStartClick,
  children,
}: TaskbarProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full h-10 bg-retro-gray/85 backdrop-blur-md taskbar-3d-border z-[1000] flex items-center justify-between px-1">
      <div className="flex items-center gap-1 h-full py-0.5">
        {/* Start Button */}
        <button
          onClick={onStartClick}
          className={`h-full flex items-center gap-2 px-2 bg-retro-gray transition-colors ${
            showStartMenu ? "win95-recessed translate-x-[1px] translate-y-[1px]" : "win95-shadow"
          } hover:bg-white`}
        >
          <div className="size-4 bg-primary flex items-center justify-center rounded-[1px]">
            <svg
              className="size-3 text-white"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <span className="text-sm font-black text-black tracking-tight leading-none pt-0.5">
            START
          </span>
        </button>

        {/* Separator */}
        <div className="w-1 h-2/3 border-l border-white border-r border-[#808080] mx-1"></div>

        {/* Taskbar Buttons */}
        <div className="flex items-center gap-1 h-full">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`h-full px-3 bg-retro-gray flex items-center gap-2 ${
                button.active
                  ? "win95-recessed bg-retro-gray/50"
                  : "win95-shadow"
              }`}
            >
              {button.icon}
              <span className="text-xs text-black font-semibold truncate max-w-[80px]">
                {button.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Right side content (system tray) */}
      {children && (
        <div className="flex items-center h-full py-0.5">{children}</div>
      )}
    </div>
  );
}
