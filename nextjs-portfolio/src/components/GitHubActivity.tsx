"use client";

import { motion } from "framer-motion";
import { GitBranch, Star, GitFork, Code, Activity, Calendar } from "lucide-react";
import { personalInfo } from "@/lib/data";

// Featured repositories data (can be fetched via GitHub API in production)
const featuredRepos = [
    {
        name: "Neo",
        description: "Personal Voice Assistant with AI capabilities",
        language: "Python",
        stars: 0,
        forks: 0,
    },
    {
        name: "weather_app",
        description: "Live Weather App with forecasts and air quality",
        language: "JavaScript",
        stars: 0,
        forks: 0,
    },
    {
        name: "student_management_system",
        description: "Desktop application for managing student records",
        language: "Python",
        stars: 0,
        forks: 0,
    },
];

const stats = [
    { icon: Code, label: "Repositories", value: "15+" },
    { icon: GitBranch, label: "Contributions", value: "200+" },
    { icon: Star, label: "Proficient Languages", value: "7" },
    { icon: Activity, label: "Active Years", value: "3+" },
];

export default function GitHubActivity() {
    const { githubUsername, github } = personalInfo;

    return (
        <section id="github" className="py-20 px-4">
            <div className="max-w-5xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="section-title"
                >
                    GitHub <span>Activity</span>
                </motion.h2>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-6 text-center group"
                        >
                            <stat.icon className="w-8 h-8 mx-auto mb-3 text-[var(--text-muted)] group-hover:text-white transition-colors" />
                            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Contribution Graph */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="glass-card p-6 mb-8"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Calendar className="w-5 h-5 text-[var(--text-muted)]" />
                        <h3 className="text-lg font-semibold text-white">Contribution Activity</h3>
                    </div>

                    <div className="flex justify-center overflow-x-auto pb-4">
                        <img
                            src={`https://ghchart.rshah.org/888888/${githubUsername}`}
                            alt="GitHub Contribution Graph"
                            className="max-w-full h-auto rounded-lg opacity-90 hover:opacity-100 transition-opacity"
                        />
                    </div>

                    <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[var(--text-muted)]">
                        <span>Less</span>
                        <div className="flex gap-1">
                            {["#1a1a1a", "#333", "#555", "#888", "#bbb"].map((color, i) => (
                                <div
                                    key={i}
                                    className="w-3 h-3 rounded-sm"
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                        <span>More</span>
                    </div>
                </motion.div>

                {/* Featured Repositories */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h3 className="text-xl font-semibold text-white mb-6 text-center">
                        Featured Repositories
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {featuredRepos.map((repo, index) => (
                            <motion.a
                                key={repo.name}
                                href={`${github}/${repo.name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card p-5 group block"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <GitBranch className="w-4 h-4 text-[var(--text-muted)]" />
                                        <span className="font-medium text-white group-hover:text-[var(--accent-secondary)] transition-colors">
                                            {repo.name}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2">
                                    {repo.description}
                                </p>

                                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                                    <span className="flex items-center gap-1">
                                        <span className="w-3 h-3 rounded-full bg-[var(--accent-secondary)]" />
                                        {repo.language}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Star className="w-3 h-3" />
                                        {repo.stars}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <GitFork className="w-3 h-3" />
                                        {repo.forks}
                                    </span>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Profile Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-10 text-center"
                >
                    <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] text-sm font-medium hover:border-white hover:text-white hover:bg-white/5 transition-all group"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="group-hover:scale-110 transition-transform"
                        >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        View Full GitHub Profile
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
