"use client";

import { motion } from "framer-motion";
import { Clock, Code, Coffee, Flame, ExternalLink } from "lucide-react";

// Replace with your WakaTime username after setup
const WAKATIME_USERNAME = "shivam2931120";

export default function CodingStats() {
    return (
        <section id="coding-stats" className="py-8 md:py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card p-4 md:p-6 overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                <Flame size={20} className="text-purple-400" />
                            </div>
                            <div>
                                <h3 className="text-base md:text-lg font-heading font-semibold text-white">
                                    Coding Activity
                                </h3>
                                <p className="text-xs text-[var(--text-muted)]">
                                    Weekly stats
                                </p>
                            </div>
                        </div>
                        <a
                            href={`https://wakatime.com/@${WAKATIME_USERNAME}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-colors w-fit"
                        >
                            <span>WakaTime</span>
                            <ExternalLink size={12} />
                        </a>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/5"
                        >
                            <Clock size={20} className="text-blue-400 mb-2" />
                            <span className="text-lg font-bold text-white">20+</span>
                            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                                Hrs/Week
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/5"
                        >
                            <Code size={20} className="text-green-400 mb-2" />
                            <span className="text-lg font-bold text-white">5+</span>
                            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                                Languages
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/5"
                        >
                            <Flame size={20} className="text-orange-400 mb-2" />
                            <span className="text-lg font-bold text-white">30+</span>
                            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                                Day Streak
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/5"
                        >
                            <Coffee size={20} className="text-yellow-400 mb-2" />
                            <span className="text-lg font-bold text-white">∞</span>
                            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                                Coffees
                            </span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
