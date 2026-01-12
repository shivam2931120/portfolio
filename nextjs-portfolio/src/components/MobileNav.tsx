"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, Code, Briefcase, Mail, Github, Linkedin, FileText, ExternalLink } from "lucide-react";
import { personalInfo } from "@/lib/data";

const navItems = [
    { id: "about", icon: User, label: "About" },
    { id: "skills", icon: Code, label: "Skills" },
    { id: "projects", icon: Briefcase, label: "Projects" },
    { id: "contact", icon: Mail, label: "Contact" },
];

export default function MobileNav() {
    const [menuOpen, setMenuOpen] = useState(false);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
    };

    return (
        <>
            {/* Hamburger Button - Fixed Top Right */}
            <button
                onClick={() => setMenuOpen(true)}
                className="md:hidden fixed top-4 right-4 z-50 p-2.5 rounded-xl glass-card"
            >
                <Menu size={20} className="text-white" />
            </button>

            {/* Sidebar Drawer */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                            onClick={() => setMenuOpen(false)}
                        />

                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="md:hidden fixed top-0 right-0 bottom-0 w-72 bg-[var(--bg-primary)] border-l border-[var(--border-subtle)] z-50 p-6 overflow-y-auto"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-heading font-bold text-white">Menu</h2>
                                <button
                                    onClick={() => setMenuOpen(false)}
                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    <X size={20} className="text-white" />
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <div className="space-y-1 mb-8">
                                <p className="text-[10px] text-[var(--text-faint)] uppercase tracking-wider mb-3 px-3">Navigation</p>
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollTo(item.id)}
                                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                            <item.icon size={16} className="text-[var(--text-secondary)]" />
                                        </div>
                                        <span className="text-white font-medium">{item.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Social Links */}
                            <div className="space-y-1 mb-8">
                                <p className="text-[10px] text-[var(--text-faint)] uppercase tracking-wider mb-3 px-3">Connect</p>
                                <a
                                    href={personalInfo.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                        <Github size={16} className="text-[var(--text-secondary)]" />
                                    </div>
                                    <span className="text-white font-medium">GitHub</span>
                                    <ExternalLink size={12} className="text-[var(--text-faint)] ml-auto" />
                                </a>
                                <a
                                    href={personalInfo.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                        <Linkedin size={16} className="text-[var(--text-secondary)]" />
                                    </div>
                                    <span className="text-white font-medium">LinkedIn</span>
                                    <ExternalLink size={12} className="text-[var(--text-faint)] ml-auto" />
                                </a>
                                <a
                                    href={`mailto:${personalInfo.email}`}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                        <Mail size={16} className="text-[var(--text-secondary)]" />
                                    </div>
                                    <span className="text-white font-medium">Email</span>
                                </a>
                            </div>

                            {/* Resume Button */}
                            <a
                                href={personalInfo.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-colors"
                            >
                                <FileText size={16} /> View Resume
                            </a>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
