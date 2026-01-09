import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import UploadBox from "../components/UploadBox";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#020617]">
      {/* Top Center Radial Blue Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      {/* Texture Overlays */}
      <div className="absolute inset-0 bg-noise opacity-20 z-0"></div>
      <div className="stars"></div>

      <main className="relative z-10">
        <Navbar />
        <Hero />
        <UploadBox />
        <Features />
        <HowItWorks />

        <div className="py-20 text-center text-gray-500 text-sm">
          <p className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            All Systems Operational
          </p>
          <p className="mt-4">&copy; 2026 Veritas AI. Created by <b>Saurav</b>. All rights reserved.</p>
          <p className="mt-2 text-xs text-gray-600">Disclaimer: AI results are probabilistic and should not be used as sole legal evidence.</p>
        </div>
      </main>
    </div>
  );
}
