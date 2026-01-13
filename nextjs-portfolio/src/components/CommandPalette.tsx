"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Code, Briefcase, Mail, ArrowRight, Command, FileText, Github, Linkedin } from "lucide-react";
import { personalInfo } from "@/lib/data";

interface CommandItem {
    id: string;
    title: string;
    description?: string;
    icon: React.ElementType;
    action: () => void;
    keywords?: string[];
}

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");

    const scrollTo = useCallback((id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
        setQuery("");
    }, []);

    const commands: CommandItem[] = [
        {
            id: "about",
            title: "Go to About",
            description: "Learn more about me",
            icon: User,
            action: () => scrollTo("about"),
            keywords: ["home", "intro", "profile"],
        },
        {
            id: "skills",
            title: "Go to Skills",
            description: "View my tech stack",
            icon: Code,
            action: () => scrollTo("skills"),
            keywords: ["tech", "technologies", "stack"],
        },
        {
            id: "projects",
            title: "Go to Projects",
            description: "See my work",
            icon: Briefcase,
            action: () => scrollTo("projects"),
            keywords: ["work", "portfolio", "apps"],
        },
        {
            id: "contact",
            title: "Go to Contact",
            description: "Get in touch",
            icon: Mail,
            action: () => scrollTo("contact"),
            keywords: ["email", "message", "hire"],
        },
        {
            id: "resume",
            title: "Download Resume",
            description: "View my CV",
            icon: FileText,
            action: () => {
                window.open(personalInfo.resume, "_blank");
                setIsOpen(false);
            },
            keywords: ["cv", "download", "pdf"],
        },
        {
            id: "github",
            title: "Open GitHub",
            description: "View my repositories",
            icon: Github,
            action: () => {
                window.open(personalInfo.github, "_blank");
                setIsOpen(false);
            },
            keywords: ["code", "repos", "git"],
        },
        {
            id: "linkedin",
            title: "Open LinkedIn",
            description: "Connect with me",
            icon: Linkedin,
            action: () => {
                window.open(personalInfo.linkedin, "_blank");
                setIsOpen(false);
            },
            keywords: ["connect", "network", "professional"],
        },
    ];

    const filteredCommands = query
        ? commands.filter(
            (cmd) =>
                cmd.title.toLowerCase().includes(query.toLowerCase()) ||
                cmd.description?.toLowerCase().includes(query.toLowerCase()) ||
                cmd.keywords?.some((k) => k.toLowerCase().includes(query.toLowerCase()))
        )
        : commands;

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Open with Cmd+K or Ctrl+K
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }

            // Close with Escape
            if (e.key === "Escape") {
                setIsOpen(false);
                setQuery("");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Handle command selection with Enter
    const handleKeyDownInput = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && filteredCommands.length > 0) {
            filteredCommands[0].action();
        }
    };

    return (
        <>
            {/* Trigger Button (optional, shows keyboard hint) */}
            <button
                onClick={() => setIsOpen(true)}
                className="hidden md:flex fixed top-4 right-4 z-40 items-center gap-2 px-3 py-1.5 rounded-lg glass-card text-xs text-[var(--text-muted)] hover:text-white transition-colors"
            >
                <Command size={12} />
                <span>⌘K</span>
            </button>

            {/* Command Palette Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                            onClick={() => {
                                setIsOpen(false);
                                setQuery("");
                            }}
                        />

                        {/* Palette */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ duration: 0.15 }}
                            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-lg mx-4"
                        >
                            <div className="glass-card rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-subtle)]">
                                {/* Search Input */}
                                <div className="flex items-center gap-3 p-4 border-b border-[var(--border-subtle)]">
                                    <Search size={18} className="text-[var(--text-muted)]" />
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyDown={handleKeyDownInput}
                                        placeholder="Search commands..."
                                        className="flex-1 bg-transparent text-white placeholder:text-[var(--text-muted)] outline-none text-sm"
                                        autoFocus
                                    />
                                    <kbd className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-[var(--text-muted)]">
                                        ESC
                                    </kbd>
                                </div>

                                {/* Commands List */}
                                <div className="max-h-80 overflow-y-auto p-2">
                                    {filteredCommands.length > 0 ? (
                                        filteredCommands.map((cmd) => (
                                            <button
                                                key={cmd.id}
                                                onClick={cmd.action}
                                                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                                    <cmd.icon size={16} className="text-[var(--text-secondary)]" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm text-white">{cmd.title}</p>
                                                    {cmd.description && (
                                                        <p className="text-xs text-[var(--text-muted)]">{cmd.description}</p>
                                                    )}
                                                </div>
                                                <ArrowRight size={14} className="text-[var(--text-faint)] opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                        ))
                                    ) : (
                                        <p className="text-center text-sm text-[var(--text-muted)] py-8">
                                            No commands found
                                        </p>
                                    )}
                                </div>

                                {/* Footer hint */}
                                <div className="p-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] text-[var(--text-faint)]">
                                    <span>↑↓ Navigate</span>
                                    <span>↵ Select</span>
                                    <span>ESC Close</span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
