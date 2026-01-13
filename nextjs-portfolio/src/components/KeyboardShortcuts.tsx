"use client";

import { useEffect, useCallback } from "react";

interface ShortcutConfig {
    key: string;
    ctrl?: boolean;
    shift?: boolean;
    action: () => void;
    description: string;
}

export default function KeyboardShortcuts() {
    const scrollTo = useCallback((id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, []);

    const shortcuts: ShortcutConfig[] = [
        { key: "a", description: "Go to About", action: () => scrollTo("about") },
        { key: "s", description: "Go to Skills", action: () => scrollTo("skills") },
        { key: "p", description: "Go to Projects", action: () => scrollTo("projects") },
        { key: "c", description: "Go to Contact", action: () => scrollTo("contact") },
        { key: "h", description: "Go to Home (top)", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    ];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't trigger if typing in input/textarea
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            const shortcut = shortcuts.find(
                (s) =>
                    s.key.toLowerCase() === e.key.toLowerCase() &&
                    (s.ctrl === undefined || s.ctrl === e.ctrlKey) &&
                    (s.shift === undefined || s.shift === e.shiftKey)
            );

            if (shortcut) {
                e.preventDefault();
                shortcut.action();
            }

            // Show shortcuts help with '?'
            if (e.key === "?") {
                showShortcutsHelp();
            }
        };

        const showShortcutsHelp = () => {
            // Could implement a modal, for now just console log
            console.log("Keyboard Shortcuts:");
            shortcuts.forEach((s) => console.log(`  ${s.key.toUpperCase()} - ${s.description}`));
            console.log("  ? - Show this help");
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [shortcuts]);

    // This component doesn't render anything visible
    return null;
}
