"use client";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const HeroSection = () => {
    const [showTrailer, setShowTrailer] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    // Simplified real-time clock (only updates every 10 seconds to reduce re-renders)
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 10000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <section
                ref={containerRef}
                className={`relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 text-white ${inter.variable}`}
                style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
            >
                {/* Simplified Static Background */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)
                        `,
                        backgroundSize: "100% 100%",
                    }}
                />

                {/* Simplified Static Orbs - No Animation */}
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl" />
                </div>

                {/* Main Content */}
                <motion.div
                    className="relative z-10 text-center space-y-8 px-6 max-w-6xl"
                    style={{ opacity }}
                >


                    {/* Simplified Logo */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center mb-8 mt-5"
                    >
                        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl border border-white/20">
                            <span className="text-4xl">🎬</span>
                        </div>
                    </motion.div>

                    {/* Simplified Title */}
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-8xl font-black mb-6 leading-tight tracking-tight"
                    >
                        <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                            FilmFindr
                        </span>
                    </motion.h1>

                    {/* Simplified Subtitle */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-4"
                    >
                        <p className="text-xl md:text-2xl font-medium text-gray-200 max-w-4xl mx-auto leading-relaxed">
                            Discover cinematic masterpieces with AI-powered recommendations
                            and personalized insights that understand your taste.
                        </p>

                        {/* Static Feature Pills */}
                        <div className="flex flex-wrap justify-center gap-3 pt-4">
                            {["AI Recommendations", "4K Streaming", "Offline Mode", "Social Reviews"].map((feature) => (
                                <div
                                    key={feature}
                                    className="px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-sm font-medium text-white/90"
                                >
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Simplified CTA Buttons */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
                    >
                        <a
                            href="#movies"
                            className="group px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 border border-white/20 hover:scale-105"
                        >
                            <span className="flex items-center gap-3">
                                <span>Start Exploring</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                                </svg>
                            </span>
                        </a>

                        <button
                            onClick={() => setShowTrailer(true)}
                            className="group px-10 py-5 border-2 border-white/30 rounded-2xl font-semibold text-lg backdrop-blur-xl hover:border-white/50 hover:scale-105 transition-all duration-300"
                        >
                            <span className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                                <span>Watch Demo</span>
                            </span>
                        </button>
                    </motion.div>

                    {/* Simplified Stats */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 max-w-2xl mx-auto"
                    >
                        {[
                            { value: "50K+", label: "Movies & Shows" },
                            { value: "2.5M+", label: "Active Users" },
                            { value: "4.9★", label: "User Rating" },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
                            >
                                <div className="text-3xl font-black text-white mb-2">{stat.value}</div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Simplified Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-sm text-white/60 font-medium">Scroll to explore</span>
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1 h-3 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-2"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Simplified Trailer Modal */}
            <AnimatePresence>
                {showTrailer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl"
                        onClick={() => setShowTrailer(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full max-w-5xl mx-4 aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowTrailer(false)}
                                className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/70 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors border border-white/20"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <iframe
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=1&rel=0&modestbranding=1"
                                title="FilmFindr Demo"
                                className="w-full h-full"
                                allowFullScreen
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default HeroSection;
