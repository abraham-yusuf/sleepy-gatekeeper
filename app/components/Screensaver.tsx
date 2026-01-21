"use client";

import { useEffect, useRef } from "react";

interface ScreensaverProps {
  onExit?: () => void;
}

export function Screensaver({ onExit }: ScreensaverProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Animation state
    let animationFrame: number;
    let rotation = 0;

    // Draw vaporwave grid
    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      gradient.addColorStop(0, "#1a0b3a");
      gradient.addColorStop(1, "#05020a");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw perspective grid
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 1.5);
      ctx.scale(1, 0.5);
      ctx.rotate(-Math.PI / 6);

      // Grid lines
      ctx.strokeStyle = "rgba(91, 43, 238, 0.3)";
      ctx.lineWidth = 1;

      const gridSize = 60;
      const gridCount = 20;

      for (let i = -gridCount; i <= gridCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, -gridCount * gridSize);
        ctx.lineTo(i * gridSize, gridCount * gridSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-gridCount * gridSize, i * gridSize);
        ctx.lineTo(gridCount * gridSize, i * gridSize);
        ctx.stroke();
      }

      ctx.restore();

      // Draw rotating wireframe cube
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 3);

      const size = 100;
      rotation += 0.01;

      // Cube vertices
      const vertices = [
        [-1, -1, -1],
        [1, -1, -1],
        [1, 1, -1],
        [-1, 1, -1],
        [-1, -1, 1],
        [1, -1, 1],
        [1, 1, 1],
        [-1, 1, 1],
      ];

      // Rotate and project vertices
      const rotated = vertices.map(([x, y, z]) => {
        // Rotate around Y axis
        const rx = x * Math.cos(rotation) - z * Math.sin(rotation);
        const rz = x * Math.sin(rotation) + z * Math.cos(rotation);

        // Rotate around X axis
        const ry = y * Math.cos(rotation * 0.7) - rz * Math.sin(rotation * 0.7);
        const rzz = y * Math.sin(rotation * 0.7) + rz * Math.cos(rotation * 0.7);

        return [rx * size, ry * size, rzz];
      });

      // Draw cube edges
      ctx.strokeStyle = "#9d47ff";
      ctx.lineWidth = 2;

      const edges = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 4],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
      ];

      edges.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(rotated[a][0], rotated[a][1]);
        ctx.lineTo(rotated[b][0], rotated[b][1]);
        ctx.stroke();
      });

      ctx.restore();

      animationFrame = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#0a150a] via-[#102210] to-[#1a0a1a] cursor-pointer"
      onClick={onExit}
    >
      {/* Scanlines overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none scanlines"></div>

      {/* Canvas for animation */}
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Text overlay */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-4xl font-bold text-primary mb-4 font-mono animate-pulse">
          SLEEPY GATEKEEPER
        </div>
        <div className="text-sm text-primary/60 font-mono">
          Click anywhere to wake up...
        </div>
      </div>
    </div>
  );
}
