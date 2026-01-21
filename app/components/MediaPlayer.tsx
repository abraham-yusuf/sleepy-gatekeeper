"use client";

import { useState } from "react";
import { Win95Window } from "./Win95Window";

interface MediaPlayerProps {
  title?: string;
  mediaUrl?: string;
  type?: "video" | "audio";
}

export function MediaPlayer({
  title = "Media Player",
  mediaUrl,
  type = "video",
}: MediaPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  return (
    <Win95Window
      title={title}
      icon={<span className="material-symbols-outlined text-sm">play_circle</span>}
      className="w-full max-w-3xl"
    >
      <div className="bg-black">
        {/* Media Display Area */}
        <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center border-b-2 border-gray-700">
          {mediaUrl ? (
            type === "video" ? (
              <video className="w-full h-full" controls>
                <source src={mediaUrl} />
              </video>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-6xl text-primary">
                  music_note
                </span>
                <audio className="w-full max-w-md" controls>
                  <source src={mediaUrl} />
                </audio>
              </div>
            )
          ) : (
            <div className="text-center p-8">
              <span className="material-symbols-outlined text-6xl text-gray-600 mb-4">
                {type === "video" ? "movie" : "music_note"}
              </span>
              <p className="text-gray-500 text-sm">No media loaded</p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="bg-retro-gray p-4 space-y-3">
          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-2">
            <button className="win95-shadow bg-retro-gray p-2 hover:bg-white transition-colors">
              <span className="material-symbols-outlined text-black text-xl">
                skip_previous
              </span>
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="win95-shadow bg-retro-gray p-3 hover:bg-white transition-colors"
            >
              <span className="material-symbols-outlined text-black text-2xl">
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </button>
            <button className="win95-shadow bg-retro-gray p-2 hover:bg-white transition-colors">
              <span className="material-symbols-outlined text-black text-xl">
                skip_next
              </span>
            </button>
            <button className="win95-shadow bg-retro-gray p-2 hover:bg-white transition-colors">
              <span className="material-symbols-outlined text-black text-xl">
                stop
              </span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="win95-recessed bg-white h-4 relative">
            <div
              className="absolute top-0 left-0 h-full bg-primary"
              style={{ width: "35%" }}
            ></div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-black text-sm">
              volume_up
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-300 rounded-none"
            />
            <span className="text-black text-xs font-mono w-8">{volume}%</span>
          </div>

          {/* Time Display */}
          <div className="text-center text-black text-xs font-mono">
            00:00 / 00:00
          </div>
        </div>
      </div>
    </Win95Window>
  );
}
