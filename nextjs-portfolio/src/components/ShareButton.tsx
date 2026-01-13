"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, X, Copy, Check, Twitter, Linkedin } from "lucide-react";

export default function ShareButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const shareText = "Check out Shivam's portfolio - Full Stack Developer";

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Shivam | Developer Portfolio",
                    text: shareText,
                    url: shareUrl,
                });
            } catch (err) {
                // User cancelled or error
            }
        } else {
            setIsOpen(true);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            // Fallback
        }
    };

    const shareLinks = [
        {
            name: "Twitter",
            icon: Twitter,
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        },
    ];

    return (
        <>
            {/* Floating Share Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                onClick={handleNativeShare}
                className="fixed bottom-6 right-6 z-40 p-3 rounded-full glass-card hover:bg-white/15 transition-all shadow-lg md:bottom-8 md:right-8"
                title="Share Portfolio"
            >
                <Share2 size={20} className="text-white" />
            </motion.button>

            {/* Share Modal (fallback for non-native share) */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed bottom-24 right-6 z-50 glass-card p-4 rounded-2xl w-64 md:right-8"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white font-medium">Share</h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-white/10 rounded-lg"
                                >
                                    <X size={16} className="text-[var(--text-muted)]" />
                                </button>
                            </div>

                            {/* Copy Link */}
                            <button
                                onClick={copyToClipboard}
                                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors mb-2"
                            >
                                {copied ? (
                                    <Check size={18} className="text-green-400" />
                                ) : (
                                    <Copy size={18} className="text-[var(--text-muted)]" />
                                )}
                                <span className="text-sm text-white">
                                    {copied ? "Copied!" : "Copy Link"}
                                </span>
                            </button>

                            {/* Social Share Links */}
                            {shareLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                                >
                                    <link.icon size={18} className="text-[var(--text-muted)]" />
                                    <span className="text-sm text-white">{link.name}</span>
                                </a>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
