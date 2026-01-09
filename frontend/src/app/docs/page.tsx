"use client";

import Navbar from "@/components/Navbar";
import { ArrowLeft, Book, Code, Shield, Cpu, Image as ImageIcon, Video } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DocsPage() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-[#020617] text-gray-300">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/20 blur-[100px] rounded-full -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-900/10 blur-[100px] rounded-full -z-10"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

            <Navbar />

            <main className="container mx-auto px-6 pt-32 pb-20">

                {/* Header */}
                <div className="mb-16">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        System Documentation
                    </motion.h1>
                    <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
                        Comprehensive guide to the VeritasAI forensic detection system. Learn how our multi-modal architecture detects synthetic media anomalies.
                    </p>
                </div>

                <div className="grid lg:grid-cols-4 gap-12">

                    {/* Sidebar Navigation */}
                    <div className="hidden lg:block space-y-2 sticky top-32 h-fit border-r border-white/10 pr-6">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Core Modules</p>
                        <a href="#overview" className="block text-white font-medium border-l-2 border-blue-500 pl-4 py-1">Overview</a>
                        <a href="#text-analysis" className="block text-gray-400 hover:text-white border-l-2 border-transparent hover:border-white/20 pl-4 py-1 transition-colors">Text Analysis</a>
                        <a href="#image-forensics" className="block text-gray-400 hover:text-white border-l-2 border-transparent hover:border-white/20 pl-4 py-1 transition-colors">Image Forensics</a>
                        <a href="#deepfake-detection" className="block text-gray-400 hover:text-white border-l-2 border-transparent hover:border-white/20 pl-4 py-1 transition-colors">Deepfake Detection</a>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-20">

                        {/* Section: Overview */}
                        <section id="overview" className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                            <div className="relative">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                                        <Shield className="w-8 h-8" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-white">Platform Overview</h2>
                                </div>
                                <p className="text-lg leading-relaxed text-gray-300 mb-6">
                                    VeritasAI is an advanced forensic platform designed to combat the rise of synthetic media.
                                    It utilizes a tiered architecture combining <span className="text-blue-400 font-mono">Transformer-based NLP</span>,
                                    <span className="text-blue-400 font-mono">CNN Image Processing</span>, and
                                    <span className="text-blue-400 font-mono">Temporal Video Analysis</span> to identify machine-generated content with high precision.
                                </p>
                                <div className="grid md:grid-cols-2 gap-6 mt-8">
                                    <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                        <h4 className="font-bold text-white mb-2 flex items-center gap-2"><Cpu className="w-4 h-4 text-cyan-400" /> AI Engine</h4>
                                        <p className="text-sm text-gray-400">Powered by RoBERTa and XceptionNet specialized models.</p>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                        <h4 className="font-bold text-white mb-2 flex items-center gap-2"><Code className="w-4 h-4 text-cyan-400" /> Secure API</h4>
                                        <p className="text-sm text-gray-400">FastAPI backend with minimal latency and high throughput.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <hr className="border-white/10" />

                        {/* Section: Text Analysis */}
                        <section id="text-analysis">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-green-500/10 rounded-lg text-green-400">
                                    <Book className="w-8 h-8" />
                                </div>
                                <h2 className="text-3xl font-bold text-white">Text Analysis Module</h2>
                            </div>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                The text analysis engine detects AI-generated text patterns such as perplexity bursts and low burstiness,
                                which are characteristic of LLMs like GPT-4.
                            </p>
                            <div className="bg-[#0f172a] rounded-xl border border-white/10 overflow-hidden">
                                <div className="bg-black/40 px-6 py-3 border-b border-white/10 flex items-center gap-2">
                                    <span className="text-xs font-mono text-gray-500">model_config.json</span>
                                </div>
                                <pre className="p-6 text-sm font-mono text-blue-300 overflow-x-auto">
                                    {`{
  "model_type": "roberta-base-openai-detector",
  "max_length": 512,
  "features": [
    "perplexity_score",
    "burstiness_index",
    "semantic_coherence"
  ]
}`}
                                </pre>
                            </div>
                        </section>

                        <hr className="border-white/10" />

                        {/* Section: Image Forensics */}
                        <section id="image-forensics">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                                    <ImageIcon className="w-8 h-8" />
                                </div>
                                <h2 className="text-3xl font-bold text-white">Image Forensics (ELA)</h2>
                            </div>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                We employ <b>Error Level Analysis (ELA)</b> to identify manipulated areas in an image.
                                When an image is edited and re-saved, the compression artifacts differ between the original and modified regions.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex gap-4">
                                    <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                                    <span className="text-gray-400">Image is re-compressed at a known error rate (95%).</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                                    <span className="text-gray-400">Pixel differences are calculated and amplified.</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs shrink-0">3</span>
                                    <span className="text-gray-400">High-contrast regions in the heatmap indicate likely manipulation.</span>
                                </li>
                            </ul>
                        </section>

                        <hr className="border-white/10" />

                        {/* Section: Deepfake Detection */}
                        <section id="deepfake-detection">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-red-500/10 rounded-lg text-red-400">
                                    <Video className="w-8 h-8" />
                                </div>
                                <h2 className="text-3xl font-bold text-white">Deepfake Video Scan</h2>
                            </div>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                Our video pipeline extracts frames at 1-second intervals and runs them through a specialized
                                <b> MesoNet / Xception</b> ensemble model trained on the FaceForensics++ dataset.
                            </p>
                            <div className="p-6 bg-red-950/10 border border-red-500/20 rounded-xl">
                                <h4 className="text-red-400 font-bold mb-2">Supported Formats</h4>
                                <p className="text-gray-400 text-sm">MP4, MOV, AVI (H.264 Codec recommended). Max file size: 50MB.</p>
                            </div>
                        </section>

                        <div className="py-20 text-center text-gray-500 text-sm">
                            <p>&copy; 2026 Veritas AI Documentation. All rights reserved.</p>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
