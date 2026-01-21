"use client";

interface PopupDialogProps {
  show: boolean;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClose?: () => void;
  onRetry?: () => void;
  onAbort?: () => void;
  className?: string;
}

export function PopupDialog({
  show,
  title,
  icon,
  children,
  onClose,
  onRetry,
  onAbort,
  className = "",
}: PopupDialogProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
      <div
        className={`w-[520px] glass-modal border-2 border-white win95-bevel hard-shadow p-1 ${className}`}
      >
        {/* Title Bar */}
        <div className="retro-title-gradient h-7 flex items-center justify-between px-2 mb-4">
          <div className="flex items-center gap-2">
            {icon && <span className="text-white text-[16px]">{icon}</span>}
            <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
              {title}
            </span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="w-5 h-5 bg-retro-gray win95-shadow flex items-center justify-center text-black font-bold text-xs hover:bg-white transition-colors"
            >
              X
            </button>
          )}
        </div>

        {/* Content */}
        <div className="glass-panel p-6 flex flex-col gap-6 bg-retro-gray/90">
          {children}

          {/* Action Buttons */}
          {(onRetry || onAbort) && (
            <div className="flex justify-end gap-3 pt-2">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="px-6 py-1.5 bg-retro-gray text-black text-xs font-bold win95-shadow win95-button-active neon-glow-green hover:bg-white transition-colors"
                >
                  RETRY
                </button>
              )}
              {onAbort && (
                <button
                  onClick={onAbort}
                  className="px-6 py-1.5 bg-retro-gray text-black text-xs font-bold win95-shadow win95-button-active hover:bg-white transition-colors"
                >
                  ABORT
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
