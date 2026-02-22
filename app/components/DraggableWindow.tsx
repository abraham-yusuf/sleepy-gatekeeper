"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { Rnd } from "react-rnd";

interface DraggableWindowProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClose?: () => void;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  minWidth?: number;
  minHeight?: number;
}

export function DraggableWindow({
  id,
  title,
  icon,
  children,
  onClose,
  defaultPosition,
  defaultSize = { width: 600, height: 400 },
  minWidth = 300,
  minHeight = 200,
}: DraggableWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [zIndex, setZIndex] = useState(100);
  const rndRef = useRef<Rnd>(null);
  const [prevState, setPrevState] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const bringToFront = useCallback(() => {
    setZIndex(Date.now() % 10000 + 100);
  }, []);

  const handleMaximize = () => {
    if (isMaximized) {
      // Restore
      if (prevState && rndRef.current) {
        rndRef.current.updateSize({ width: prevState.width, height: prevState.height });
        rndRef.current.updatePosition({ x: prevState.x, y: prevState.y });
      }
      setIsMaximized(false);
    } else {
      // Save current state and maximize
      if (rndRef.current) {
        const el = rndRef.current.getSelfElement();
        if (el) {
          setPrevState({
            x: parseInt(el.style.left) || 0,
            y: parseInt(el.style.top) || 0,
            width: el.offsetWidth,
            height: el.offsetHeight,
          });
        }
        rndRef.current.updateSize({
          width: window.innerWidth,
          height: window.innerHeight - 40,
        });
        rndRef.current.updatePosition({ x: 0, y: 0 });
      }
      setIsMaximized(true);
    }
  };

  // Calculate default position (centered with offset based on id hash)
  const hash = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const defPos = useMemo(() => {
    if (defaultPosition) return defaultPosition;
    const w = typeof window !== "undefined" ? window.innerWidth : 1024;
    const h = typeof window !== "undefined" ? window.innerHeight : 768;
    return {
      x: Math.max(20, (hash * 37) % Math.max(1, w - defaultSize.width - 40)),
      y: Math.max(20, (hash * 53) % Math.max(1, h - defaultSize.height - 80)),
    };
  }, [id, defaultPosition, defaultSize.width, defaultSize.height, hash]);

  return (
    <Rnd
      ref={rndRef}
      default={{
        x: defPos.x,
        y: defPos.y,
        width: defaultSize.width,
        height: defaultSize.height,
      }}
      minWidth={minWidth}
      minHeight={minHeight}
      bounds="parent"
      dragHandleClassName="drag-handle"
      style={{ zIndex }}
      onMouseDown={bringToFront}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
    >
      <div className="win95-shadow bg-retro-gray rounded-sm flex flex-col h-full w-full">
        {/* Title Bar (drag handle) */}
        <div className="drag-handle retro-title-gradient px-2 py-1 flex items-center justify-between cursor-move select-none shrink-0">
          <div className="flex items-center gap-2">
            {icon && <span className="text-sm text-white">{icon}</span>}
            <span className="text-xs font-bold text-white truncate">{title}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                /* minimize - could be implemented */
              }}
              className="w-4 h-4 bg-retro-gray win95-shadow flex items-center justify-center text-black font-bold text-[8px] hover:bg-white transition-colors"
            >
              _
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMaximize();
              }}
              className="w-4 h-4 bg-retro-gray win95-shadow flex items-center justify-center text-black font-bold text-[8px] hover:bg-white transition-colors"
            >
              □
            </button>
            {onClose && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-4 h-4 bg-retro-gray win95-shadow flex items-center justify-center text-black font-bold text-[10px] hover:bg-red-400 hover:text-white transition-colors"
              >
                X
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </Rnd>
  );
}
