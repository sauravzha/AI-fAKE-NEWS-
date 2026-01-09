"use client";

import { ScanFace, FileChartColumn, ScanSearch } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Features() {
    const features = [
        {
            icon: <FileChartColumn className="w-12 h-12 text-blue-400" />,
            title: "Fake News Analysis",
            description: "Detects linguistic patterns and semantic inconsistencies in articles using NLP transformers."
        },
        {
            icon: <ScanFace className="w-12 h-12 text-blue-400" />,
            title: "Deepfake Detection",
            description: "Analyzes video frames for facial warping, lip-sync errors, and artifacts."
        },
        {
            icon: <ScanSearch className="w-12 h-12 text-blue-400" />,
            title: "Image Forensics",
            description: "Uses Error Level Analysis (ELA) to highlight pixel-level manipulations."
        }
    ];

    return (
        <section id="features" className="py-20 relative z-10 -mt-10">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.2 }}
                            whileHover={{ y: -10 }}
                            className="relative p-1 rounded-3xl transition duration-500 group"
                        >
                            {/* Soft Glow Background */}
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

                            <div className="h-full bg-[#0b101b]/40 backdrop-blur-xl rounded-3xl p-8 flex flex-col items-center text-center group-hover:bg-[#0b101b]/60 transition duration-300">
                                <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent shadow-[inset_0_0_20px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition duration-300">
                                    {f.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{f.title}</h3>
                                <p className="text-gray-400 leading-relaxed font-light">{f.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
