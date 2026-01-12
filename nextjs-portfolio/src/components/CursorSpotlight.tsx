"use client";

import { useEffect, useState } from "react";

export default function CursorSpotlight() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Only on desktop
        if (window.innerWidth < 768) return;

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setVisible(true);
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
        <div
            style={{
                position: "fixed",
                left: position.x - 100,
                top: position.y - 100,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
                pointerEvents: "none",
                zIndex: 1,
                transition: "left 0.1s ease-out, top 0.1s ease-out",
            }}
            className="hidden md:block"
        />
    );
}
