"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const VISITOR_ID_KEY = "portfolioVisitorId";

type VisitorCounterResponse = {
    success: boolean;
    total: number | null;
};

let visitorCounterRequest: Promise<VisitorCounterResponse> | null = null;

function createBrowserVisitorId() {
    if (typeof crypto === "undefined") {
        return null;
    }

    if (typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }

    const values = new Uint8Array(16);
    crypto.getRandomValues(values);

    return Array.from(values, (value) => value.toString(16).padStart(2, "0")).join("");
}

function getBrowserVisitorId() {
    try {
        const existingId = localStorage.getItem(VISITOR_ID_KEY);
        if (existingId) {
            return existingId;
        }

        const nextId = createBrowserVisitorId();
        if (nextId) {
            localStorage.setItem(VISITOR_ID_KEY, nextId);
        }

        return nextId;
    } catch {
        return null;
    }
}

function requestVisitorCount() {
    if (!visitorCounterRequest) {
        const visitorId = getBrowserVisitorId();

        visitorCounterRequest = fetch("/api/visitors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ visitorId }),
            cache: "no-store",
        }).then(async (response) => {
            const payload = (await response.json()) as VisitorCounterResponse;
            return response.ok ? payload : { success: false, total: null };
        });
    }

    return visitorCounterRequest;
}

export default function VisitorCounter() {
    const [total, setTotal] = useState<number | null>(null);
    const [isUnavailable, setIsUnavailable] = useState(false);

    useEffect(() => {
        let isMounted = true;

        requestVisitorCount()
            .then((payload) => {
                if (!isMounted) {
                    return;
                }

                if (payload.success && typeof payload.total === "number") {
                    setTotal(payload.total);
                    setIsUnavailable(false);
                    return;
                }

                setIsUnavailable(true);
            })
            .catch(() => {
                if (isMounted) {
                    setIsUnavailable(true);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const displayValue = isUnavailable ? "Unavailable" : total === null ? "..." : total.toLocaleString();

    return (
        <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card"
            aria-live="polite"
        >
            <Eye size={14} className="text-white/70" />
            <span className="text-xs text-white font-semibold font-mono">{displayValue}</span>
        </div>
    );
}
