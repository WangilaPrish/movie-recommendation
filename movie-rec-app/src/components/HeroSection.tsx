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

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 10000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <section
                ref={containerRef}
                className={`relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 text-white px-4 sm:px-6 lg:px-8 ${inter.variable}`}
                style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
            >
                {/* Background */}
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

                {/* Static Orbs */}
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 lg:w-96 h-48 sm:h-64 lg:h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-32 sm:w-48 lg:w-80 h-32 sm:h-48 lg:h-80 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl" />
                </div>

                {/* Main Content */}
                <motion.div
                    className="relative z-10 text-center space-y-6 sm:space-y-8 w-full max-w-7xl mx-auto"
                    style={{ opacity }}
                >
                    {/* Status Bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6 sm:mb-8"
                    >
                        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                            <div className="w-2 h-2 bg-green-400 rounded-full" />
                            <span className="text-xs sm:text-sm text-white/80">Live Now</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                            <span className="text-xs sm:text-sm text-white/80">5.2M+ Users</span>
                        </div>
                    </motion.div>

                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center mb-6 sm:mb-8"
                    >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl border border-white/20">
                            <span className="text-2xl sm:text-3xl lg:text-4xl">🎬</span>
                        </div>
                    </motion.div>

                    {/* Title - Responsive Text Sizes */}
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-4 sm:mb-6 leading-tight tracking-tight"
                    >
                        <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                            FilmFindr
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-4 px-4 sm:px-0"
                    >
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-gray-200 max-w-4xl mx-auto leading-relaxed">
                            Discover cinematic masterpieces with AI-powered recommendations
                            <br className="hidden sm:block" />
                            and personalized insights that understand your taste.
                        </p>

                        {/* Feature Pills - Responsive Grid */}
                        <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-3 pt-4 max-w-2xl mx-auto">
                            {["AI Recommendations", "4K Streaming", "Offline Mode", "Social Reviews"].map((feature) => (
                                <div
                                    key={feature}
                                    className="px-2 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-xs sm:text-sm font-medium text-white/90 text-center"
                                >
                                    <span className="hidden sm:inline">{feature}</span>
                                    <span className="sm:hidden">
                                        {feature.split(' ')[0]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* CTA Buttons - Responsive Layout */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-6 sm:pt-8 px-4 sm:px-0"
                    >
                        <a
                            href="#movies"
                            className="w-full sm:w-auto group px-6 sm:px-10 py-3 sm:py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg shadow-2xl transition-all duration-300 hover:scale-105"
                        >
                            <span className="flex items-center justify-center gap-2 sm:gap-3">
                                <span>Start Exploring</span>
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                                </svg>
                            </span>
                        </a>

                        <button
                            onClick={() => setShowTrailer(true)}
                            className="w-full sm:w-auto group px-6 sm:px-10 py-3 sm:py-5 border-2 border-white/30 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-lg backdrop-blur-xl hover:border-white/50 hover:scale-105 transition-all duration-300"
                        >
                            <span className="flex items-center justify-center gap-2 sm:gap-3">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                                <span>Watch Demo</span>
                            </span>
                        </button>
                    </motion.div>

                    {/* Stats - Responsive Grid */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-12 sm:pt-16 max-w-2xl mx-auto px-4 sm:px-0"
                    >
                        {[
                            { value: "50K+", label: "Movies & Shows" },
                            { value: "2.5M+", label: "Active Users" },
                            { value: "4.9★", label: "User Rating" },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="text-center p-4 sm:p-6 bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
                            >
                                <div className="text-2xl sm:text-3xl font-black text-white mb-1 sm:mb-2">{stat.value}</div>
                                <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs sm:text-sm text-white/60 font-medium">Scroll to explore</span>
                    <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center">
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1 h-2 sm:h-3 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-1.5 sm:mt-2"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Responsive Trailer Modal */}
            <AnimatePresence>
                {showTrailer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
                        onClick={() => setShowTrailer(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowTrailer(false)}
                                className="absolute top-3 right-3 sm:top-6 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-black/70 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors border border-white/20"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
