"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorSpotlight() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Only on desktop
        if (typeof window === "undefined" || window.innerWidth < 768) return;

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setVisible(true);

            // Check if hovering over interactive element
            const target = e.target as HTMLElement;
            const isInteractive = target.closest("a, button, [role='button'], input, textarea");
            setIsHovering(!!isInteractive);
        };

        const handleMouseLeave = () => setVisible(false);
        const handleMouseEnter = () => setVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, []);

    if (!visible) return null;

    return (
        <motion.div
            animate={{
                scale: isHovering ? 1.3 : 1,
                opacity: isHovering ? 1 : 0.6,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
                position: "fixed",
                left: position.x - 120,
                top: position.y - 120,
                width: 240,
                height: 240,
                borderRadius: "50%",
                background: isHovering
                    ? "radial-gradient(circle, rgba(147,51,234,0.25) 0%, rgba(147,51,234,0.1) 40%, transparent 70%)"
                    : "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)",
                pointerEvents: "none",
                zIndex: 1,
                transition: "left 0.1s ease-out, top 0.1s ease-out, background 0.3s ease",
            }}
            className="hidden md:block"
        />
    );
}
