"use client";

import { useState, useEffect } from "react";

export function useDownloadCounter() {
    const [downloadCount, setDownloadCount] = useState<number>(0);

    useEffect(() => {
        // Get stored count
        const stored = localStorage.getItem("resumeDownloads");
        if (stored) {
            setDownloadCount(parseInt(stored));
        }
    }, []);

    const incrementDownload = () => {
        const newCount = downloadCount + 1;
        setDownloadCount(newCount);
        localStorage.setItem("resumeDownloads", newCount.toString());
    };

    return { downloadCount, incrementDownload };
}

// Standalone component to display download count
export default function DownloadCounter({ count }: { count: number }) {
    return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white/70 font-mono">
            ↓ {count}
        </span>
    );
}
