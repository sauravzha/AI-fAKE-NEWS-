"use client";

import { useState } from 'react';
import { UploadCloud, FileType, Image as ImageIcon, FileText, Loader2, Video, ChevronRight, Search, Check } from 'lucide-react';
import { analyzeText, analyzeImage, analyzeVideo } from '../utils/api';
import ResultCard from './ResultCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function UploadBox() {
    const [activeTab, setActiveTab] = useState<'text' | 'image' | 'video'>('text');
    const [inputText, setInputText] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleAnalyze = async () => {
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            let res;
            if (activeTab === 'text') {
                if (!inputText) throw new Error("Please enter text to analyze.");
                // Simulate network delay for effect if needed, or just call API
                res = await analyzeText(inputText);
            } else if (activeTab === 'image') {
                if (!selectedFile) throw new Error("Please select an image.");
                res = await analyzeImage(selectedFile);
            } else if (activeTab === 'video') {
                if (!selectedFile) throw new Error("Please select a video.");
                res = await analyzeVideo(selectedFile);
            }
            setResult(res);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "An error occurred during analysis.");
        } finally {
            setIsLoading(false);
        }
    };

    const tabs = [
        { id: 'text', label: 'Text Analysis', icon: <FileText className="w-4 h-4" /> },
        { id: 'image', label: 'Image Forensics', icon: <ImageIcon className="w-4 h-4" /> },
        { id: 'video', label: 'Deepfake Scan', icon: <Video className="w-4 h-4" /> },
    ];

    return (
        <div id="analyze-section" className="w-full max-w-5xl mx-auto relative z-20 px-6 pb-20">

            {/* Main Glass Floating Card */}
            <motion.div
                layout
                className="relative bg-[#0f172a]/60 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] overflow-hidden"
            >
                {/* Top Gradient Line */}
                <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 opacity-50"></div>

                {/* Tab Header */}
                <div className="flex border-b border-white/5 bg-black/20">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id as any); setResult(null); setError(null); }}
                            className={`flex-1 flex items-center justify-center gap-3 py-6 text-sm font-medium transition-all duration-300 relative ${activeTab === tab.id
                                ? 'text-white'
                                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                }`}
                        >
                            <span className={`p-2 rounded-lg ${activeTab === tab.id ? 'bg-blue-500/20 text-blue-400' : 'bg-transparent'}`}>
                                {tab.icon}
                            </span>
                            {tab.label}

                            {/* Active Bottom Bar */}
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="active-tab-bar"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                />
                            )}
                        </button>
                    ))}
                </div>

                <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center relative">

                    {/* Ambient Lighting inside card */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-radial from-blue-500/5 to-transparent opacity-30 pointer-events-none"></div>

                    {/* Scanning Overlay */}
                    <AnimatePresence>
                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-50 bg-[#020617]/90 backdrop-blur-md flex flex-col items-center justify-center"
                            >
                                <div className="relative w-32 h-32 mb-8">
                                    <motion.div
                                        className="absolute inset-0 border-4 border-blue-500/20 rounded-full"
                                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                    <motion.div
                                        className="absolute inset-0 border-t-4 border-cyan-400 rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Search className="w-10 h-10 text-cyan-400" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 tracking-widest">ANALYZING FORENSICS...</h3>
                                <p className="text-blue-400/60 font-mono text-sm">Processing neural patterns</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Content Area */}
                    <div className={`transition-all duration-500 relative z-10 ${isLoading ? 'blur-md scale-95 opacity-50' : ''}`}>

                        {activeTab === 'text' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Input Text</label>
                                    <span className="text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded">Supports 10k+ Chars (Multi-Segment Analysis)</span>
                                </div>
                                <textarea
                                    className="w-full bg-[#020617] border border-white/10 rounded-xl p-6 text-lg text-gray-300 placeholder-gray-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 resize-none h-48 shadow-inner transition-all font-mono leading-relaxed"
                                    placeholder="Paste suspicious article text, tweet, or statement..."
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                />
                            </motion.div>
                        )}

                        {(activeTab === 'image' || activeTab === 'video') && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full"
                            >
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 block">Upload Evidence</label>
                                <input
                                    type="file"
                                    id="file-upload"
                                    accept={activeTab === 'image' ? "image/*" : "video/*"}
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="file-upload" className="cursor-pointer group/upload block">
                                    <div className={`border-2 border-dashed rounded-2xl p-16 flex flex-col items-center justify-center transition-all duration-300 ${selectedFile
                                        ? 'border-green-500/50 bg-green-500/5'
                                        : 'border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5'
                                        }`}>
                                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors ${selectedFile ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-500 group-hover/upload:text-blue-400 group-hover/upload:bg-blue-500/20'
                                            }`}>
                                            {selectedFile ? <Check className="w-10 h-10" /> : <UploadCloud className="w-10 h-10" />}
                                        </div>
                                        <p className="text-xl font-medium text-white mb-2">
                                            {selectedFile ? selectedFile.name : `Drag & Drop or Click to Upload`}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {activeTab === 'image' ? 'Compatible with JPG, PNG, TIFF, WEBP' : 'Compatible with MP4, MOV, AVI'}
                                        </p>
                                    </div>
                                </label>
                            </motion.div>
                        )}

                        {/* Footer Actions */}
                        <div className="flex justify-end mt-10">
                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(59,130,246,0.5)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleAnalyze}
                                disabled={isLoading}
                                className={`px-10 py-4 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center gap-3 transition-all ${isLoading
                                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20'
                                    }`}
                            >
                                Start Analysis <ChevronRight className="w-4 h-4" />
                            </motion.button>
                        </div>
                    </div>

                    {error && (
                        <div className="absolute bottom-6 left-6 right-6 z-50">
                            <div className="p-4 bg-red-950/90 border border-red-500/30 text-red-200 rounded-xl text-sm flex items-center gap-3 backdrop-blur-md shadow-lg animate-in slide-in-from-bottom-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_red]"></div>
                                {error}
                            </div>
                        </div>
                    )}

                </div>
            </motion.div>

            {/* Results Section */}
            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        <ResultCard type={activeTab} data={result} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
