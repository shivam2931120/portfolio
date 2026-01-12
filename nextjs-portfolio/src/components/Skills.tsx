"use client";

import Image from "next/image";
import { skills } from "@/lib/data";
import { motion } from "framer-motion";

export default function Skills() {
    const doubledSkills = [...skills, ...skills];

    return (
        <section id="skills" className="py-8 md:py-12 overflow-hidden">
            {/* Section Title */}
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-heading font-bold text-white mb-6 text-center"
            >
                Tech <span className="text-[var(--text-secondary)]">Stack</span>
            </motion.h2>

            {/* Mobile: Horizontal Scrolling Chips */}
            <div className="md:hidden overflow-x-auto px-4 scrollbar-hide">
                <motion.div
                    className="flex gap-2 pb-2"
                    style={{ width: "max-content" }}
                    animate={{ x: [0, -600, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                    {doubledSkills.map((skill, index) => (
                        <div key={index} className="flex items-center gap-1.5 px-3 py-2 rounded-full glass-card flex-shrink-0">
                            <div className="relative w-4 h-4">
                                <Image src={skill.icon} alt={skill.name} fill className="object-contain" />
                            </div>
                            <span className="text-[var(--text-secondary)] text-xs whitespace-nowrap">{skill.name}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Desktop: Marquee Animation */}
            <div className="hidden md:block">
                <div className="marquee-container mb-3">
                    <div className="marquee-content">
                        {doubledSkills.map((skill, index) => (
                            <div key={`r1-${index}`} className="flex items-center gap-2 px-4 py-2 rounded-full glass-card">
                                <div className="relative w-5 h-5">
                                    <Image src={skill.icon} alt={skill.name} fill className="object-contain" />
                                </div>
                                <span className="text-[var(--text-secondary)] text-sm whitespace-nowrap">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="marquee-container">
                    <div className="marquee-content" style={{ animationDirection: "reverse" }}>
                        {[...doubledSkills].reverse().map((skill, index) => (
                            <div key={`r2-${index}`} className="flex items-center gap-2 px-4 py-2 rounded-full glass-card">
                                <div className="relative w-5 h-5">
                                    <Image src={skill.icon} alt={skill.name} fill className="object-contain" />
                                </div>
                                <span className="text-[var(--text-secondary)] text-sm whitespace-nowrap">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
