"use client";

import { motion } from "framer-motion";
import { Code2, Zap, Layers, Sparkles } from "lucide-react";

const stats = [
    { value: "3+", label: "Years Exp" },
    { value: "7", label: "Projects" },
    { value: "14+", label: "Tech Stack" },
];

const strengths = [
    { icon: Code2, label: "Full Stack" },
    { icon: Zap, label: "Performance" },
    { icon: Layers, label: "Scalable Systems" },
    { icon: Sparkles, label: "Clean Code" },
];

export default function About() {
    return (
        <section className="py-8 md:py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-6 md:mb-8"
                >
                    <h2 className="text-xl md:text-2xl font-heading font-bold text-white mb-2">
                        About <span className="text-[var(--text-secondary)]">Me</span>
                    </h2>
                    <p className="text-xs md:text-sm text-[var(--text-muted)] max-w-md mx-auto">
                        Developer passionate about building elegant solutions to complex problems
                    </p>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center gap-8 md:gap-16 mb-6 md:mb-8"
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-2xl md:text-3xl font-heading font-bold text-white">
                                {stat.value}
                            </div>
                            <div className="text-[10px] md:text-xs text-[var(--text-muted)] uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
