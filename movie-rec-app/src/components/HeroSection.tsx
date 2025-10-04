"use client";
import { motion } from "framer-motion";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const HeroSection = () => (
    <section
        className={`relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white ${inter.variable}`}
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
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

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: window.innerHeight + 100,
                        opacity: 0
                    }}
                    animate={{
                        y: -100,
                        opacity: [0, 1, 0],
                        x: Math.random() * window.innerWidth
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        delay: Math.random() * 5
                    }}
                    className="absolute w-1 h-1 bg-white rounded-full"
                />
            ))}
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
                    <span className="text-3xl font-bold text-white">🎬</span>
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-white/20 rounded-2xl font-semibold text-lg backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                >
                    Watch Trailer
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
                <div className="text-center">
                    <div className="text-3xl font-bold text-white">10K+</div>
                    <div className="text-sm">Movies Available</div>
                </div>
                <div className="hidden sm:block w-px h-8 bg-white/20" />
                <div className="text-center">
                    <div className="text-3xl font-bold text-white">50K+</div>
                    <div className="text-sm">Happy Users</div>
                </div>
                <div className="hidden sm:block w-px h-8 bg-white/20" />
                <div className="text-center">
                    <div className="text-3xl font-bold text-white">4.9★</div>
                    <div className="text-sm">User Rating</div>
                </div>
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
);

export default HeroSection;
