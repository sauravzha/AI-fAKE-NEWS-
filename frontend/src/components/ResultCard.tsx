"use client";

import { AlertTriangle, CheckCircle, Video, Image as ImageIcon, FileText, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResultCardProps {
    type: 'text' | 'image' | 'video';
    data: any;
}

export default function ResultCard({ type, data }: ResultCardProps) {
    if (!data) return null;

    const isFake = data.label === 'Fake' || data.label === 'Deepfake' || data.label === 'Manipulated';
    const confidence = data.confidence || 0;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl mx-auto mt-12 relative group"
        >
            {/* Glow Behind */}
            <div className={`absolute inset-0 blur-[50px] opacity-20 ${isFake ? 'bg-red-600' : 'bg-green-500'}`}></div>

            <div className="bg-black/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden relative shadow-2xl">

                {/* Header */}
                <div className={`px-8 py-6 flex items-center justify-between border-b border-white/5 ${isFake ? 'bg-red-950/30' : 'bg-green-950/30'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${isFake ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                            {isFake ? <AlertTriangle className="w-8 h-8" /> : <CheckCircle className="w-8 h-8" />}
                        </div>
                        <div>
                            <h3 className={`text-2xl font-bold ${isFake ? 'text-red-400' : 'text-green-400'}`}>
                                {data.label}
                            </h3>
                            <p className="text-gray-400 text-sm tracking-widest uppercase font-mono">Analysis Verdict</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className={`text-5xl font-mono font-bold ${isFake ? 'text-red-500' : 'text-green-500'}`}>{confidence}%</span>
                        <p className="text-gray-500 text-xs mt-1 uppercase tracking-wider">Confidence Score</p>
                    </div>
                </div>

                {/* Body */}
                <div className="p-8">
                    <h4 className="text-gray-300 text-lg mb-6 leading-relaxed font-light border-l-4 border-gray-700 pl-4">
                        {data.explanation}
                    </h4>

                    {/* Visual Evidence Section */}
                    {type === 'image' && data.ela_image && (
                        <div className="mt-8">
                            <h5 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">Forensic Evidence</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative group rounded-xl overflow-hidden border border-gray-700">
                                    <img src={`http://localhost:8000${data.original_image}`} alt="Original" className="w-full h-64 object-cover" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm px-4 py-2">
                                        <span className="text-white text-xs font-bold uppercase">Original Source</span>
                                    </div>
                                </div>
                                <div className="relative group rounded-xl overflow-hidden border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                                    <img src={`http://localhost:8000${data.ela_image}`} alt="ELA" className="w-full h-64 object-cover" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm px-4 py-2 flex justify-between items-center">
                                        <span className="text-blue-400 text-xs font-bold uppercase">ELA Heatmap</span>
                                        <span className="text-[10px] text-gray-400">High brightness = Manipulation</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {type === 'video' && data.frame_markers && (
                        <div className="mt-8">
                            <h5 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">Timeline Anomalies</h5>
                            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                                <div className="flex flex-wrap gap-2">
                                    {data.frame_markers.length > 0 ? data.frame_markers.map((time: number, i: number) => (
                                        <span key={i} className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-xs font-mono border border-red-500/40">
                                            {time.toFixed(1)}s
                                        </span>
                                    )) : <span className="text-green-500 text-sm flex items-center gap-2"><CheckCircle className="w-4 h-4" /> No temporal anomalies detected.</span>}
                                </div>
                                <div className="w-full h-1 bg-gray-800 mt-4 rounded-full relative overflow-hidden">
                                    {/* Mock Timeline Visualizer - using CSS vars for lint compliance */}
                                    {data.frame_markers.map((time: number, i: number) => (
                                        <div
                                            key={i}
                                            className="absolute top-0 bottom-0 bg-red-500 w-1 left-[var(--marker-pos)]"
                                            style={{ '--marker-pos': `${Math.min(time * 5, 100)}%` } as React.CSSProperties}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {type === 'text' && data.probs && (
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 text-center">
                                <p className="text-xs text-gray-500 uppercase">Real Probability</p>
                                <p className="text-2xl font-mono text-green-400 mt-1">{(data.probs.real * 100).toFixed(1)}%</p>
                            </div>
                            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 text-center">
                                <p className="text-xs text-gray-500 uppercase">Fake Probability</p>
                                <p className="text-2xl font-mono text-red-400 mt-1">{(data.probs.fake * 100).toFixed(1)}%</p>
                            </div>
                        </div>
                    )}

                    {/* Confidence Breakdown Section (Requested) */}
                    <div className="mt-8 pt-8 border-t border-white/5">
                        <h5 className="text-sm font-bold text-gray-500 mb-6 uppercase tracking-wider flex items-center gap-2">
                            Analysis Confidence
                        </h5>

                        <div className="space-y-6">
                            {/* Real Bar */}
                            <div>
                                <div className="flex justify-between text-xs uppercase tracking-wider text-gray-400 mb-2">
                                    <span className={!isFake ? "text-green-400 font-bold" : ""}>Real / Authentic</span>
                                    <span>{isFake ? (100 - confidence).toFixed(1) : confidence.toFixed(1)}%</span>
                                </div>
                                <div className="h-3 bg-gray-900 rounded-full overflow-hidden border border-white/5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${isFake ? 100 - confidence : confidence}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] relative"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Fake Bar */}
                            <div>
                                <div className="flex justify-between text-xs uppercase tracking-wider text-gray-400 mb-2">
                                    <span className={isFake ? "text-red-400 font-bold" : ""}>Fake / Manipulated</span>
                                    <span>{isFake ? confidence.toFixed(1) : (100 - confidence).toFixed(1)}%</span>
                                </div>
                                <div className="h-3 bg-gray-900 rounded-full overflow-hidden border border-white/5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${isFake ? confidence : 100 - confidence}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] relative"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                            <div className="p-2 bg-blue-500/20 rounded-full text-blue-400">
                                <Video className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm text-blue-200 font-medium">AI Analysis Insight</p>
                                <p className="text-xs text-blue-300/70 mt-0.5">
                                    {isFake
                                        ? `High probability of manipulation detected (${confidence.toFixed(1)}%). Review marked areas.`
                                        : `Content appears authentic with high confidence (${confidence.toFixed(1)}%). No anomalies found.`}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}
