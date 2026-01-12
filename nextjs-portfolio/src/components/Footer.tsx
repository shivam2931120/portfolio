"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 px-4 border-t border-[var(--border-color)]">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row items-center justify-between gap-4"
                >
                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                        <span>© {currentYear}</span>
                        <span className="gradient-text font-semibold">{personalInfo.name}</span>
                        <span>• Built with</span>
                        <Heart size={16} className="text-[var(--accent-pink)] fill-current" />
                    </div>

                    <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                        <span>Next.js</span>
                        <span>•</span>
                        <span>Tailwind CSS</span>
                        <span>•</span>
                        <span>Framer Motion</span>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
