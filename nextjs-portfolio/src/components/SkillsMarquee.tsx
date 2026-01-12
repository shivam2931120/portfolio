"use client";

import Image from "next/image";
import { skills } from "@/lib/data";

export default function SkillsMarquee() {
    const doubledSkills = [...skills, ...skills];

    return (
        <section id="skills" className="py-8 sm:py-12 overflow-hidden">
            <h2 className="section-title">
                <span>Tech Stack</span>
            </h2>

            {/* Skills Grid for better visual */}
            <div className="max-w-5xl mx-auto px-4 mb-6">
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-3 sm:gap-4">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="glass-card p-3 sm:p-4 flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform cursor-pointer group"
                        >
                            <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                                <Image
                                    src={skill.icon}
                                    alt={skill.name}
                                    fill
                                    className="object-contain grayscale-icon group-hover:brightness-150"
                                />
                            </div>
                            <span className="text-[10px] sm:text-xs text-[var(--text-muted)] group-hover:text-white text-center transition-colors">
                                {skill.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Marquee for visual flair */}
            <div className="marquee-container opacity-50">
                <div className="marquee-content">
                    {doubledSkills.map((skill, index) => (
                        <div
                            key={`marquee-${index}`}
                            className="flex items-center gap-2 px-4 py-2 min-w-fit"
                        >
                            <div className="relative w-5 h-5">
                                <Image
                                    src={skill.icon}
                                    alt={skill.name}
                                    fill
                                    className="object-contain grayscale-icon"
                                />
                            </div>
                            <span className="text-[var(--text-muted)] text-xs whitespace-nowrap">
                                {skill.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
