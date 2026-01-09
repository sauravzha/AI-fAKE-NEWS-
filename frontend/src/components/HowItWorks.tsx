"use client";

import { Upload, Cpu, FileCheck } from 'lucide-react';

export default function HowItWorks() {
    const steps = [
        {
            id: 1,
            icon: <Upload className="w-6 h-6 text-white" />,
            title: "Upload & Preprocessing",
            desc: "User uploads text, image, or video. The system securely hashes and preprocesses the file for analysis."
        },
        {
            id: 2,
            icon: <Cpu className="w-6 h-6 text-white" />,
            title: "Multi-Model AI Analysis",
            desc: "Content is routed to specialized models: RoBERTa for text, ELA/CNN for images, and Frame-CNN for videos."
        },
        {
            id: 3,
            icon: <FileCheck className="w-6 h-6 text-white" />,
            title: "Verdict & Explanation",
            desc: "The system aggregates scores and generates a visual report highlighting manipulated regions."
        }
    ];

    return (
        <section id="how-it-works" className="py-20 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full bg-blue-900/5 -z-10"></div>

            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-16 text-white">
                    How It Works
                </h2>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-gray-800 -translate-y-1/2 z-0"></div>

                    <div className="grid md:grid-cols-3 gap-12 relative z-10">
                        {steps.map((step) => (
                            <div key={step.id} className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-900/50 mb-6 border-4 border-black text-xl font-bold">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-gray-400 text-sm max-w-xs">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
