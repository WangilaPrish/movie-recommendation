"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const HeroSection = () => {
    const [showTrailer, setShowTrailer] = useState(false);

    return (
        <>
            <section
                className={`relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white ${inter.variable}`}
                style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
            >
                {/* Background Video Animation */}
                <div className="absolute inset-0 opacity-20">
                    <div className="relative w-full h-full">
                        {/* Floating Movie Elements */}
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{
                                    x: Math.random() * 1200,
                                    y: Math.random() * 800,
                                    opacity: 0,
                                    scale: 0
                                }}
                                animate={{
                                    x: Math.random() * 1200,
                                    y: Math.random() * 800,
                                    opacity: [0, 0.7, 0],
                                    scale: [0, 1, 0],
                                    rotate: [0, 180, 360]
                                }}
                                transition={{
                                    duration: Math.random() * 8 + 6,
                                    repeat: Infinity,
                                    delay: Math.random() * 4,
                                    ease: "easeInOut"
                                }}
                                className="absolute"
                            >
                                <div className="w-16 h-24 bg-gradient-to-br from-purple-500/40 to-pink-500/40 rounded-lg backdrop-blur-sm border border-white/10 flex items-center justify-center">
                                    <span className="text-2xl">🎬</span>
                                </div>
                            </motion.div>
                        ))}

                        {/* Floating UI Elements */}
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={`ui-${i}`}
                                initial={{
                                    x: Math.random() * 1200,
                                    y: Math.random() * 800,
                                    opacity: 0
                                }}
                                animate={{
                                    x: Math.random() * 1200,
                                    y: Math.random() * 800,
                                    opacity: [0, 0.5, 0]
                                }}
                                transition={{
                                    duration: Math.random() * 10 + 8,
                                    repeat: Infinity,
                                    delay: Math.random() * 3
                                }}
                                className="absolute"
                            >
                                <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                                    <span className="text-xs text-white/70">Playing...</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-30">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 0.4 }}
                        transition={{ duration: 3, ease: "easeOut" }}
                        className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"
                    />
                    <motion.div
                        initial={{ scale: 0.3, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.3 }}
                        transition={{ duration: 2.5, delay: 0.5, ease: "easeOut" }}
                        className="absolute bottom-32 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl"
                    />
                    <motion.div
                        initial={{ scale: 0.2, opacity: 0 }}
                        animate={{ scale: 0.8, opacity: 0.2 }}
                        transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur-3xl"
                    />
                </div>

                {/* Main Content */}
                <div className="relative z-10 text-center space-y-8 px-6 max-w-5xl">
                    {/* Logo Icon */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                            delay: 0.2
                        }}
                        className="flex justify-center mb-6"
                    >
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/25">
                            <motion.span
                                animate={{ rotate: [0, 15, -15, 0] }}
                                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                                className="text-3xl font-bold text-white"
                            >
                                🎬
                            </motion.span>
                        </div>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            delay: 0.3
                        }}
                        className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent leading-tight tracking-tight"
                    >
                        FilmFindr
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            delay: 0.5
                        }}
                        className="text-xl md:text-2xl font-medium text-gray-200 max-w-3xl mx-auto leading-relaxed"
                    >
                        Browse trending films, save your favorites, and get
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                            {" "}personalized recommendations
                        </span>
                        —all in one place.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            delay: 0.7
                        }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
                    >
                        <motion.a
                            href="#movies"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Get Started
                                <motion.span
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    →
                                </motion.span>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.a>

                        <motion.button
                            onClick={() => setShowTrailer(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-8 py-4 border-2 border-white/20 rounded-2xl font-semibold text-lg backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                <motion.div
                                    whileHover={{ scale: 1.2 }}
                                    className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
                                >
                                    <svg className="w-3 h-3 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </motion.div>
                                Watch Trailer
                            </span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                whileHover={{ scale: 1.02 }}
                            />
                        </motion.button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            delay: 0.9
                        }}
                        className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-16 text-gray-300"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-center"
                        >
                            <div className="text-3xl font-bold text-white">10K+</div>
                            <div className="text-sm">Movies Available</div>
                        </motion.div>
                        <div className="hidden sm:block w-px h-8 bg-white/20" />
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-center"
                        >
                            <div className="text-3xl font-bold text-white">50K+</div>
                            <div className="text-sm">Happy Users</div>
                        </motion.div>
                        <div className="hidden sm:block w-px h-8 bg-white/20" />
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-center"
                        >
                            <div className="text-3xl font-bold text-white">4.9★</div>
                            <div className="text-sm">User Rating</div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
                    >
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-1 h-3 bg-white/50 rounded-full mt-2"
                        />
                    </motion.div>
                </motion.div>
            </section>

            {/* Trailer Modal */}
            <AnimatePresence>
                {showTrailer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                        onClick={() => setShowTrailer(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="relative w-full max-w-4xl mx-4 aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setShowTrailer(false)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </motion.button>

                            {/* Video Player */}
                            <iframe
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=1&rel=0"
                                title="FilmFindr Trailer"
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
