"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, RefreshCw } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function GitHubGraph() {
    const [timestamp, setTimestamp] = useState<number | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Only set timestamp on client side to avoid hydration mismatch
    useEffect(() => {
        setTimestamp(Date.now());
    }, []);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimestamp(Date.now());
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    return (
        <section id="github" className="py-8 md:py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card p-4 md:p-6 overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <h3 className="text-base md:text-lg font-heading font-semibold text-white">
                            GitHub Activity
                        </h3>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleRefresh}
                                className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                                title="Refresh contributions"
                            >
                                <RefreshCw
                                    size={14}
                                    className={`text-white/60 ${isRefreshing ? 'animate-spin' : ''}`}
                                />
                            </button>
                            <a
                                href={personalInfo.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-colors w-fit"
                            >
                                <span>@{personalInfo.githubUsername}</span>
                                <ExternalLink size={12} />
                            </a>
                        </div>
                    </div>

                    {/* GitHub Activity Graph */}
                    <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
                        {timestamp && (
                            <img
                                key={timestamp}
                                src={`https://github-readme-activity-graph.vercel.app/graph?username=${personalInfo.githubUsername}&bg_color=0a0a0a&color=ffffff&line=22c55e&point=ffffff&area=true&area_color=22c55e&hide_border=true&custom_title=&t=${timestamp}`}
                                alt="GitHub Activity Graph"
                                className="w-full min-w-[600px] md:min-w-0 h-auto rounded-lg"
                            />
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
