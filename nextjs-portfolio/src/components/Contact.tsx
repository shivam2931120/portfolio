"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Mail, Copy, Check, GitBranch, Briefcase } from "lucide-react";
import { personalInfo } from "@/lib/data";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<FormStatus>("idle");
    const [lastCommit, setLastCommit] = useState<string>("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Fetch latest commit from GitHub
        fetch("https://api.github.com/repos/shivam2931120/portfolio/commits?per_page=1")
            .then(res => res.json())
            .then(data => {
                if (data[0]?.commit?.author?.date) {
                    const commitDate = new Date(data[0].commit.author.date);
                    const now = new Date();
                    const diffTime = Math.abs(now.getTime() - commitDate.getTime());
                    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

                    if (diffDays === 0) {
                        setLastCommit(diffHours === 0 ? "Just now" : `${diffHours}h ago`);
                    } else if (diffDays === 1) {
                        setLastCommit("Yesterday");
                    } else {
                        setLastCommit(`${diffDays} days ago`);
                    }
                }
            })
            .catch(() => setLastCommit("Recently"));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            const response = await fetch("https://formspree.io/f/mojjqeep", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
                setTimeout(() => setStatus("idle"), 3000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 3000);
            }
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    const copyEmail = async () => {
        await navigator.clipboard.writeText(personalInfo.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="py-8 md:py-12 px-4 pb-24 md:pb-12">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-3xl font-heading font-bold text-white mb-2 text-center"
                >
                    Get In <span className="text-[var(--text-secondary)]">Touch</span>
                </motion.h2>
                <p className="text-xs md:text-sm text-[var(--text-muted)] text-center mb-6">
                    Available for internships, freelance & full-time roles
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Left: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-3"
                    >
                        {/* Email Card */}
                        <div className="glass-card p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                                    <Mail size={18} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-[var(--text-faint)] uppercase tracking-wider">Email</p>
                                    <p className="text-white text-sm font-medium">{personalInfo.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={copyEmail}
                                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs transition-colors ${copied ? "bg-green-500/20 text-green-400" : "bg-white/5 text-[var(--text-muted)] hover:bg-white/10"
                                    }`}
                            >
                                {copied ? <Check size={12} /> : <Copy size={12} />}
                                {copied ? "Copied" : "Copy"}
                            </button>
                        </div>

                        {/* Location Card */}
                        {/* Last Updated Card */}
                        <div className="glass-card p-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                <GitBranch size={18} className="text-purple-400" />
                            </div>
                            <div>
                                <p className="text-[10px] text-[var(--text-faint)] uppercase tracking-wider">Last Updated</p>
                                <p className="text-white text-sm font-medium">
                                    {lastCommit || "Loading..."}
                                </p>
                            </div>
                        </div>

                        {/* Status Card */}
                        <div className="glass-card p-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                                <Briefcase size={18} className="text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] text-[var(--text-faint)] uppercase tracking-wider">Status</p>
                                <p className="text-white text-sm font-medium flex items-center gap-1.5">
                                    Open to Work
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.form
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        onSubmit={handleSubmit}
                        className="glass-card p-4 md:p-5 space-y-3"
                    >
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-[var(--border-subtle)] text-white text-sm placeholder:text-[var(--text-faint)] focus:border-white/30 focus:outline-none"
                                placeholder="Name"
                            />
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-[var(--border-subtle)] text-white text-sm placeholder:text-[var(--text-faint)] focus:border-white/30 focus:outline-none"
                                placeholder="Email"
                            />
                        </div>

                        <textarea
                            required
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-[var(--border-subtle)] text-white text-sm placeholder:text-[var(--text-faint)] focus:border-white/30 focus:outline-none resize-none"
                            placeholder="Your message..."
                        />

                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className={`w-full py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all ${status === "success" ? "bg-green-500/20 text-green-400"
                                : status === "error" ? "bg-red-500/20 text-red-400"
                                    : "bg-white text-black hover:bg-white/90"
                                }`}
                        >
                            {status === "idle" && <><Send size={14} /> Send Message</>}
                            {status === "loading" && <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full" />}
                            {status === "success" && <><CheckCircle size={14} /> Message Sent!</>}
                            {status === "error" && <><AlertCircle size={14} /> Failed to Send</>}
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
