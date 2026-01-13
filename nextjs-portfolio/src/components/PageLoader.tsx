"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time and then hide
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const letters = "Shivam".split("");

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center"
                >
                    <div className="flex flex-col items-center gap-8">
                        {/* Animated Name */}
                        <div className="relative">
                            {/* Glow effect behind text */}
                            <motion.div
                                animate={{
                                    opacity: [0.3, 0.6, 0.3],
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute inset-0 blur-2xl bg-gradient-to-r from-purple-500/20 via-white/10 to-blue-500/20"
                            />

                            {/* Letter-by-letter animation */}
                            <div className="relative flex">
                                {letters.map((letter, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: index * 0.1,
                                            duration: 0.5,
                                            ease: "easeOut",
                                        }}
                                        className="text-5xl md:text-6xl font-heading font-bold text-white tracking-tight"
                                        style={{
                                            fontFamily: "'Outfit', sans-serif",
                                            letterSpacing: "-0.02em",
                                        }}
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        {/* Elegant loading indicator */}
                        <div className="flex items-center gap-1">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0.3 }}
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                    }}
                                    className="w-1.5 h-1.5 rounded-full bg-white/60"
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
