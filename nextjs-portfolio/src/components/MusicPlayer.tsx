"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Disc, ExternalLink, FastForward } from "lucide-react";
import { playlist } from "@/lib/data";

export default function MusicPlayer() {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-cycle songs every 2 minutes
    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            handleNext();
        }, 120000);

        return () => clearInterval(interval);
    }, [isPlaying, currentSongIndex]);

    const handleNext = () => {
        setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const currentSong = playlist[currentSongIndex];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-4 pr-6 pl-2 py-2 rounded-full glass-card border border-white/5 bg-black/40 backdrop-blur-md hover:bg-black/60 transition-colors group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Album Art / In-Control */}
            <div
                className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-[var(--text-secondary)] to-purple-500 overflow-hidden shadow-lg shadow-purple-500/20"
                onClick={(e) => { e.stopPropagation(); togglePlay(); }}
            >
                <motion.div
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className={`w-full h-full flex items-center justify-center opacity-80 ${!isPlaying ? "opacity-50" : ""}`}
                >
                    <Disc size={20} className="text-white mix-blend-overlay" />
                </motion.div>

                {/* Center dot of vinyl */}
                <div className="absolute w-3 h-3 bg-[#1a1a1a] rounded-full border border-white/20 z-10" />

                {/* Play/Pause Overlay on Hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className={`w-2 h-2 ${isPlaying ? 'bg-green-400' : 'bg-red-400'} rounded-full animate-pulse`} />
                </div>
            </div>

            {/* Song Info */}
            <a
                href={currentSong.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-0.5 min-w-[120px]"
            >
                <span className="text-xs font-medium text-white/90 truncate max-w-[140px] group-hover:text-[var(--text-secondary)] transition-colors">
                    {currentSong.title}
                </span>
                <span className="text-[10px] text-white/50 truncate max-w-[140px]">
                    {currentSong.artist}
                </span>
            </a>

            {/* Equalizer Visualizer */}
            <div className="flex items-end gap-[2px] h-4 mb-1">
                {[1, 2, 3, 4].map((bar) => (
                    <motion.div
                        key={bar}
                        animate={{
                            height: isPlaying ? [4, 12, 6, 14, 4] : 4,
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: bar * 0.1,
                            ease: "easeInOut"
                        }}
                        className="w-[2px] bg-[var(--text-secondary)] rounded-full opacity-80"
                    />
                ))}
            </div>

            {/* Next Button (Visible on Hover) */}
            {isHovered && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="absolute -right-3 -top-3 p-1.5 bg-white/10 rounded-full hover:bg-white/20 backdrop-blur-md border border-white/10 shadow-lg text-white"
                >
                    <FastForward size={10} />
                </motion.button>
            )}

            {/* Spotify Logo/Icon Hint */}
            <motion.div
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 pointer-events-none"
            >
                <ExternalLink size={12} className="text-white/40" />
            </motion.div>
        </motion.div>
    );
}
