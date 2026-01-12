"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function GitHubGraph() {
    return (
        <section id="github" className="py-8 md:py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card p-4 md:p-6 overflow-hidden"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base md:text-lg font-heading font-semibold text-white">
                            GitHub Contributions
                        </h3>
                        <a
                            href={personalInfo.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-white transition-colors"
                        >
                            @shivam2931120
                            <ExternalLink size={10} />
                        </a>
                    </div>

                    {/* Colorful GitHub Contribution Graph */}
                    <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
                        <img
                            src="https://ghchart.rshah.org/22c55e/shivam2931120"
                            alt="GitHub Contribution Graph"
                            className="w-full min-w-[600px] md:min-w-0 h-auto"
                            style={{ filter: "brightness(1.1)" }}
                        />
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-end gap-1 mt-3 text-[10px] text-[var(--text-muted)]">
                        <span>Less</span>
                        <div className="flex gap-0.5">
                            <div className="w-2.5 h-2.5 rounded-sm bg-[#161b22]" />
                            <div className="w-2.5 h-2.5 rounded-sm bg-[#0e4429]" />
                            <div className="w-2.5 h-2.5 rounded-sm bg-[#006d32]" />
                            <div className="w-2.5 h-2.5 rounded-sm bg-[#26a641]" />
                            <div className="w-2.5 h-2.5 rounded-sm bg-[#39d353]" />
                        </div>
                        <span>More</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
