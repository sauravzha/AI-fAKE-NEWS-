"use client";

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 px-6 overflow-hidden flex flex-col items-center text-center">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full -z-10"></div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-mono mb-8"
            >
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                SYSTEM ONLINE // V 2.0.4
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-6 tracking-tight"
            >
                AI-POWERED <span className="text-blue-500">FORENSICS</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed mb-12"
            >
                Advanced Deepfake Detection, Fake News analysis, and Image Forensics powered by state-of-the-art Transformer and Vision models.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
                <button
                    onClick={() => document.getElementById('analyze-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] flex items-center gap-2 group"
                >
                    Launch Detector <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link href="/docs" className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 rounded-full font-medium text-lg transition backdrop-blur-sm hover:text-white flex items-center gap-2">
                    View Documentation
                </Link>
            </motion.div>
        </section>
    );
}
