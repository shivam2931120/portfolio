"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Code, Briefcase, Mail } from "lucide-react";

const navItems = [
    { name: "About", href: "#about", icon: User },
    { name: "Skills", href: "#skills", icon: Code },
    { name: "Projects", href: "#projects", icon: Briefcase },
    { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / scrollHeight) * 100;
            setScrollProgress(progress);

            const sections = ["contact", "projects", "skills", "about"];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            {/* Scroll Progress */}
            <div className="scroll-progress hidden md:block" style={{ width: `${scrollProgress}%` }} />

            {/* Desktop Navigation */}
            <motion.nav
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block"
            >
                <div className="flex items-center gap-1 px-2 py-2 rounded-full glass-card">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={(e) => handleClick(e, item.href)}
                            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${activeSection === item.href.slice(1)
                                ? "text-white bg-white/10"
                                : "text-[var(--text-muted)] hover:text-white"
                                }`}
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </motion.nav>

            {/* Mobile Hamburger - handled by MobileNav component */}
        </>
    );
}
