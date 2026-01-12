"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { RefreshCw } from "lucide-react";

interface PullToRefreshProps {
    children: React.ReactNode;
}

export default function PullToRefresh({ children }: PullToRefreshProps) {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [pullDistance, setPullDistance] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const startY = useRef(0);
    const isPulling = useRef(false);

    const threshold = 80;

    useEffect(() => {
        // Only on mobile
        if (typeof window === "undefined" || window.innerWidth >= 768) return;

        const container = containerRef.current;
        if (!container) return;

        const handleTouchStart = (e: TouchEvent) => {
            if (window.scrollY === 0) {
                startY.current = e.touches[0].clientY;
                isPulling.current = true;
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isPulling.current) return;

            const currentY = e.touches[0].clientY;
            const distance = Math.max(0, currentY - startY.current);

            if (distance > 0 && window.scrollY === 0) {
                setPullDistance(Math.min(distance * 0.5, 120));
            }
        };

        const handleTouchEnd = () => {
            if (pullDistance >= threshold) {
                setIsRefreshing(true);
                // Simulate refresh
                setTimeout(() => {
                    setIsRefreshing(false);
                    setPullDistance(0);
                    // Optional: reload content
                    // window.location.reload();
                }, 1500);
            } else {
                setPullDistance(0);
            }
            isPulling.current = false;
        };

        container.addEventListener("touchstart", handleTouchStart, { passive: true });
        container.addEventListener("touchmove", handleTouchMove, { passive: true });
        container.addEventListener("touchend", handleTouchEnd);

        return () => {
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
            container.removeEventListener("touchend", handleTouchEnd);
        };
    }, [pullDistance]);

    const progress = Math.min(pullDistance / threshold, 1);

    return (
        <div ref={containerRef} className="relative">
            {/* Pull indicator */}
            <motion.div
                className="fixed top-0 left-0 right-0 flex items-center justify-center z-50 md:hidden"
                style={{
                    height: pullDistance,
                    opacity: progress,
                }}
            >
                <motion.div
                    animate={{
                        rotate: isRefreshing ? 360 : progress * 180,
                    }}
                    transition={{
                        rotate: isRefreshing
                            ? { duration: 1, repeat: Infinity, ease: "linear" }
                            : { duration: 0 },
                    }}
                >
                    <RefreshCw
                        size={20}
                        className={`${isRefreshing ? "text-white" : "text-[var(--text-muted)]"}`}
                    />
                </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
                style={{
                    transform: `translateY(${pullDistance}px)`,
                    transition: isPulling.current ? "none" : "transform 0.3s ease",
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
