"use client";

interface TerminalLine {
  prefix?: string;
  text: string;
  color?: "neon-green" | "primary" | "white";
}

interface TerminalProps {
  lines: TerminalLine[];
  showCursor?: boolean;
  className?: string;
}

export function Terminal({
  lines,
  showCursor = true,
  className = "",
}: TerminalProps) {
  const getColorClass = (color?: string) => {
    switch (color) {
      case "primary":
        return "text-purple-400";
      case "white":
        return "text-white";
      case "neon-green":
      default:
        return "text-neon-green";
    }
  };

  return (
    <div
      className={`bg-black p-6 font-mono text-sm text-neon-green terminal-glow ${className}`}
    >
      {lines.map((line, index) => (
        <div key={index} className="flex items-start gap-2 mb-2">
          {line.prefix && <span className="text-primary">{line.prefix}</span>}
          <p className={`text-sm ${getColorClass(line.color)}`}>{line.text}</p>
        </div>
      ))}
      {showCursor && (
        <div className="w-2 h-4 bg-neon-green animate-pulse"></div>
      )}
    </div>
  );
}
