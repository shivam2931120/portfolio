"use client";

import { motion } from "framer-motion";
import { Linkedin, Github, Mail, Code, FileText } from "lucide-react";
import { personalInfo } from "@/lib/data";

const links = [
    { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
    { icon: Github, href: personalInfo.github, label: "GitHub" },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
    { icon: Code, href: "https://leetcode.com/u/shivam2931120/", label: "LeetCode" },
    { icon: FileText, href: personalInfo.resume, label: "Resume" },
];

export default function SocialLinks() {
    return (
        <div
            className="hidden md:flex flex-col items-center gap-1"
            style={{
                position: "fixed",
                left: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 9998,
            }}
        >
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center gap-3 p-2 rounded-full glass-card"
            >
                {links.map((link, i) => (
                    <a
                        key={i}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative p-2.5 rounded-full hover:bg-white/10 transition-colors"
                        title={link.label}
                    >
                        <link.icon size={18} className="text-[var(--text-muted)] group-hover:text-white transition-colors" />

                        {/* Tooltip */}
                        <span className="absolute left-full ml-3 px-2 py-1 bg-white text-black text-[10px] font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {link.label}
                        </span>
                    </a>
                ))}
            </motion.div>

            {/* Vertical Line */}
            <div className="w-px h-16 bg-gradient-to-b from-[var(--border-subtle)] to-transparent mt-2" />
        </div>
    );
}
