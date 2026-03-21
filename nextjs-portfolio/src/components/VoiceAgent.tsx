"use client";

import { useEffect, useState, useRef } from "react";
import { RetellWebClient } from "retell-client-js-sdk";
import { Mic, PhoneOff, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const agentId = process.env.NEXT_PUBLIC_RETELL_AGENT_ID;

export default function VoiceAgent() {
    const [isCalling, setIsCalling] = useState(false);
    const [isInitializing, setIsInitializing] = useState(false);
    const retellWebClientRef = useRef<RetellWebClient | null>(null);

    useEffect(() => {
        // Initialize the Retell Client
        const retellWebClient = new RetellWebClient();
        retellWebClientRef.current = retellWebClient;

        // Set up event listeners
        retellWebClient.on("call_started", () => {
            console.log("Call started");
            setIsCalling(true);
            setIsInitializing(false);
        });

        retellWebClient.on("call_ended", () => {
            console.log("Call ended");
            setIsCalling(false);
            setIsInitializing(false);
        });

        retellWebClient.on("error", (error) => {
            console.error("Retell Client Error:", error);
            setIsCalling(false);
            setIsInitializing(false);
            retellWebClient.stopCall();
            alert("An error occurred with the voice agent. Please try again.");
        });

        return () => {
            retellWebClient.stopCall();
        };
    }, []);

    const toggleCall = async () => {
        if (isCalling) {
            retellWebClientRef.current?.stopCall();
            setIsCalling(false);
        } else {
            if (!agentId || agentId === "your_agent_id_here") {
                alert("Voice Agent is not fully configured. Please update NEXT_PUBLIC_RETELL_AGENT_ID in .env.local.");
                return;
            }

            setIsInitializing(true);
            try {
                // Fetch access token
                const response = await fetch("/api/retell", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ agentId }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch access token");
                }

                const data = await response.json();

                // Start web call
                await retellWebClientRef.current?.startCall({
                    accessToken: data.access_token,
                    sampleRate: 16000,
                });

            } catch (error) {
                console.error("Failed to start call:", error);
                alert("Could not connect to the voice agent. Check console for details.");
                setIsInitializing(false);
            }
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {isCalling && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl w-64"
                    >
                        <div className="flex flex-col items-center gap-3">
                            <div className="relative">
                                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center animate-pulse">
                                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                                        <Mic className="text-white w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <h4 className="font-semibold text-white">Shivam&apos;s Assistant</h4>
                                <p className="text-xs text-zinc-400 mt-1">Listening and speaking...</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={toggleCall}
                disabled={isInitializing}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${isCalling
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-white hover:bg-zinc-200 text-black"
                    }`}
                aria-label={isCalling ? "End Voice Call" : "Start Voice Call"}
            >
                {isInitializing ? (
                    <Loader2 className="w-6 h-6 animate-spin text-zinc-500" />
                ) : isCalling ? (
                    <PhoneOff className="w-6 h-6" />
                ) : (
                    <Mic className="w-6 h-6" />
                )}
            </button>
        </div>
    );
}
