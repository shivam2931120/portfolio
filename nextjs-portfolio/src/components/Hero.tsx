"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, ArrowRight, X, ChevronDown, Code2, Zap, Users, Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { createPortal } from "react-dom";
import Typewriter from "./Typewriter";

function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 21) return "Good evening";
    return "Good night";
}

const aboutItems = [
    { icon: Code2, label: "Full Stack" },
    { icon: Zap, label: "Performance" },
    { icon: Users, label: "Collaboration" },
];

function ResumeModal({ onClose, onDownload }: { onClose: () => void; onDownload: () => void }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return createPortal(
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 99999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px",
            }}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.85)",
                    backdropFilter: "blur(8px)",
                }}
                onClick={onClose}
            />
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "800px",
                    height: "85vh",
                    backgroundColor: "var(--bg-secondary)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    zIndex: 1,
                }}
            >
                <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)]">
                    <span className="text-white font-medium">Resume Preview</span>
                    <div className="flex gap-2">
                        <a href={personalInfo.resume} download onClick={onDownload} className="btn-primary text-xs py-2 px-3">
                            <Download size={14} /> Download
                        </a>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
                            <X size={18} className="text-[var(--text-muted)]" />
                        </button>
                    </div>
                </div>
                <iframe
                    src={personalInfo.resume}
                    style={{ width: "100%", height: "calc(100% - 60px)", backgroundColor: "white" }}
                    title="Resume"
                />
            </motion.div>
        </div>,
        document.body
    );
}

export default function Hero() {
    const [greeting, setGreeting] = useState("Hello");
    const [showResumeModal, setShowResumeModal] = useState(false);
    const [currentLine, setCurrentLine] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [localTime, setLocalTime] = useState("");
    const [downloadCount, setDownloadCount] = useState(0);

    // Load download count on mount
    useEffect(() => {
        const stored = localStorage.getItem("resumeDownloads");
        if (stored) setDownloadCount(parseInt(stored));
    }, []);

    const trackDownload = () => {
        const newCount = downloadCount + 1;
        setDownloadCount(newCount);
        localStorage.setItem("resumeDownloads", newCount.toString());
    };

    const terminalLines = [
        "$ who am i?",
        "→ Shivam — Developer",
        "$ status",
        "→ Available for opportunities ✓",
    ];

    useEffect(() => {
        setMounted(true);
        setGreeting(getGreeting());

        // Update time every second
        const updateTime = () => {
            const now = new Date();
            const time = now.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            });
            setLocalTime(time);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLine((prev) => (prev < terminalLines.length ? prev + 1 : prev));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const scrollToProjects = () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            {/* Floating Social Icons - Right Side */}


            <section id="about" className="min-h-[65vh] md:min-h-[70vh] flex items-center px-4 md:px-8 pt-16 md:pt-20 pb-4">
                <div className="max-w-6xl mx-auto w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 items-center">

                        {/* Left Column - 3 cols */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="lg:col-span-3"
                        >
                            {/* Greeting Badge with Live Time */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card mb-3">
                                <span className="text-xs text-[var(--text-muted)]">{greeting}</span>
                                <span className="w-1 h-1 rounded-full bg-[var(--text-faint)]" />
                                <span className="text-xs text-white font-medium font-mono">{localTime || "..."}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            </div>

                            {/* Name + Title */}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-1.5">
                                Shivam
                            </h1>
                            <p className="text-base md:text-lg text-[var(--text-secondary)] mb-4 h-7">
                                <Typewriter
                                    words={["Full Stack Developer", "React Enthusiast", "Problem Solver", "Open Source Contributor"]}
                                    typingSpeed={80}
                                    deletingSpeed={40}
                                    pauseDuration={2500}
                                />
                            </p>

                            {/* Terminal */}
                            <div className="glass-card p-3 md:p-4 rounded-xl mb-4 max-w-md">
                                <div className="flex items-center gap-1.5 mb-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#27ca40]" />
                                </div>
                                <div className="font-mono text-xs md:text-sm space-y-0.5">
                                    {terminalLines.slice(0, currentLine).map((line, i) => (
                                        <p key={i} className={line.startsWith("$") ? "text-white" : "text-[var(--text-muted)]"}>
                                            {line}
                                        </p>
                                    ))}
                                    {currentLine < terminalLines.length && (
                                        <span className="inline-block w-2 h-3.5 bg-white animate-pulse" />
                                    )}
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="flex gap-2.5 items-center">
                                <button onClick={() => setShowResumeModal(true)} className="btn-primary text-sm">
                                    <Download size={15} /> Resume
                                </button>
                                {downloadCount > 0 && (
                                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white/70 font-mono">
                                        ↓ {downloadCount}
                                    </span>
                                )}
                                <button onClick={scrollToProjects} className="btn-secondary text-sm">
                                    Projects <ArrowRight size={15} />
                                </button>
                            </div>
                        </motion.div>

                        {/* Right Column - About Card - 2 cols */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="lg:col-span-2 glass-card p-4 md:p-5"
                        >
                            <h3 className="text-base md:text-lg font-heading font-semibold text-white mb-2">About Me</h3>
                            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                                Developer with 2+ years of experience building elegant solutions.
                                I focus on creating performant, user-friendly applications.
                            </p>

                            <div className="grid grid-cols-3 gap-2">
                                {aboutItems.map((item, i) => (
                                    <div key={i} className="text-center p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                        <item.icon size={18} className="mx-auto mb-1 text-white" />
                                        <p className="text-[9px] md:text-[10px] text-[var(--text-secondary)]">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="flex justify-center mt-4"
                    >
                        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                            <ChevronDown size={18} className="text-[var(--text-faint)]" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Resume Modal using Portal */}
            {mounted && showResumeModal && <ResumeModal onClose={() => setShowResumeModal(false)} onDownload={trackDownload} />}
        </>
    );
}
