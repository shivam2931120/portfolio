"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { certifications } from "@/lib/data";
import { useState } from "react";
import { X } from "lucide-react";

export default function Certifications() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <>
            <section id="certifications" className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="section-title"
                    >
                        <span>Certifications</span>
                    </motion.h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                onClick={() => setSelectedImage(cert.image)}
                                className="glass-card p-4 text-center cursor-pointer group"
                            >
                                <div className="relative w-24 h-24 mx-auto mb-4 overflow-hidden rounded-lg">
                                    <Image
                                        src={cert.image}
                                        alt={cert.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <h3 className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                                    {cert.name}
                                </h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Image Modal */}
            {selectedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="relative max-w-3xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-12 right-0 p-2 text-white hover:text-[var(--accent-primary)] transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <div className="relative aspect-video w-full">
                            <Image
                                src={selectedImage}
                                alt="Certificate"
                                fill
                                className="object-contain rounded-lg"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}
