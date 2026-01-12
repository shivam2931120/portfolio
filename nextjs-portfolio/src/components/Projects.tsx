"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, ArrowUpRight } from "lucide-react";
import { createPortal } from "react-dom";

const projects = [
    {
        title: "Neo - AI Voice Assistant",
        desc: "Intelligent personal assistant for desktop automation with voice commands",
        tech: [
            { name: "Python", icon: "/images/python.png" },
        ],
        link: "https://shivam-portfolio.netlify.app/",
        github: "https://github.com/shivam2931120",
    },
    {
        title: "Live Weather App",
        desc: "Real-time weather tracking with air quality index and forecasts",
        tech: [
            { name: "JavaScript", icon: "/images/js.png" },
            { name: "HTML", icon: "/images/html.png" },
        ],
        link: "https://shivam2931120.github.io/weather_app/",
        github: "https://github.com/shivam2931120/weather_app",
    },
    {
        title: "Currency Converter",
        desc: "Quick currency conversion with real-time exchange rates",
        tech: [
            { name: "JavaScript", icon: "/images/js.png" },
            { name: "HTML", icon: "/images/html.png" },
        ],
        link: "https://shivam2931120.github.io/currency-converter/",
        github: "https://github.com/shivam2931120/currency-converter",
    },
    {
        title: "Student Management",
        desc: "Streamlined student record management with CRUD operations",
        tech: [
            { name: "Python", icon: "/images/python.png" },
            { name: "SQLite", icon: "/images/mysql.png" },
        ],
        link: "https://shivam-portfolio.netlify.app/",
        github: "https://github.com/shivam2931120/student_management_system",
    },
];

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return createPortal(
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 99999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px",
            }}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.85)",
                    backdropFilter: "blur(8px)",
                }}
                onClick={onClose}
            />
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-card p-6"
                style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "480px",
                    zIndex: 1,
                }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg"
                >
                    <X size={18} className="text-[var(--text-muted)]" />
                </button>

                <div className="flex gap-2 mb-4">
                    {project.tech.map((t, i) => (
                        <div key={i} className="w-10 h-10 p-2 rounded-xl bg-white/10">
                            <div className="relative w-full h-full">
                                <Image src={t.icon} alt={t.name} fill className="object-contain" />
                            </div>
                        </div>
                    ))}
                </div>

                <h3 className="text-xl font-heading font-bold text-white mb-2">
                    {project.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
                    {project.desc}
                </p>

                <div className="flex gap-3">
                    <a href={project.link} target="_blank" className="flex-1 btn-primary justify-center">
                        <ExternalLink size={16} /> Live Demo
                    </a>
                    <a href={project.github} target="_blank" className="flex-1 btn-secondary justify-center">
                        <Github size={16} /> Source Code
                    </a>
                </div>
            </motion.div>
        </div>,
        document.body
    );
}

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            <section id="projects" className="py-12 md:py-16 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl font-heading font-bold text-white mb-8 text-center"
                    >
                        Featured <span className="text-[var(--text-secondary)]">Projects</span>
                    </motion.h2>

                    {/* Bento Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative glass-card overflow-hidden hover:border-white/20 transition-colors"
                            >
                                {/* Content */}
                                <div className="p-5 md:p-6">
                                    {/* Header with tech icons */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex gap-2">
                                            {project.tech.map((t, i) => (
                                                <div key={i} className="w-8 h-8 p-1.5 rounded-lg bg-white/5">
                                                    <div className="relative w-full h-full">
                                                        <Image src={t.icon} alt={t.name} fill className="object-contain" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => setSelectedProject(project)}
                                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <ArrowUpRight size={16} className="text-white" />
                                        </button>
                                    </div>

                                    {/* Title & Description */}
                                    <h3 className="text-lg md:text-xl font-heading font-semibold text-white mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-[var(--text-muted)] mb-4 leading-relaxed">
                                        {project.desc}
                                    </p>

                                    {/* Actions */}
                                    <div className="flex gap-3">
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
                                        >
                                            <ExternalLink size={14} />
                                            Live Demo
                                        </a>
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors"
                                        >
                                            <Github size={14} />
                                            Code
                                        </a>
                                    </div>
                                </div>

                                {/* Decorative gradient */}
                                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Modal using Portal */}
            <AnimatePresence>
                {mounted && selectedProject && (
                    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                )}
            </AnimatePresence>
        </>
    );
}
