"use client";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const HeroSection = () => {
    const [showTrailer, setShowTrailer] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [currentTime, setCurrentTime] = useState(new Date());
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    // Mouse tracking for parallax effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Real-time clock
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const trendingMovies = [
        { title: "Dune: Part Two", rating: "8.9", genre: "Sci-Fi" },
        { title: "Oppenheimer", rating: "8.3", genre: "Biography" },
        { title: "Spider-Verse", rating: "8.7", genre: "Animation" },
        { title: "The Batman", rating: "7.8", genre: "Action" },
        { title: "Everything Everywhere", rating: "7.8", genre: "Comedy" },
    ];

    return (
        <>
            <section
                ref={containerRef}
                className={`relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 text-white ${inter.variable}`}
                style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
            >
                {/* Dynamic Background Grid */}
                <div className="absolute inset-0 opacity-20">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
                                radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.2) 0%, transparent 50%),
                                radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
                                linear-gradient(90deg, transparent 49%, rgba(255, 255, 255, 0.02) 50%, transparent 51%),
                                linear-gradient(0deg, transparent 49%, rgba(255, 255, 255, 0.02) 50%, transparent 51%)
                            `,
                            backgroundSize: "100% 100%, 100% 100%, 50px 50px, 50px 50px",
                        }}
                    />
                </div>

                {/* Floating Movie Cards */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        x: mousePosition.x,
                        y: mousePosition.y,
                    }}
                >
                    {trendingMovies.map((movie, i) => (
                        <motion.div
                            key={movie.title}
                            initial={{
                                x: Math.random() * window.innerWidth,
                                y: Math.random() * window.innerHeight,
                                opacity: 0,
                                scale: 0
                            }}
                            animate={{
                                opacity: [0, 0.8, 0.8, 0],
                                scale: [0, 1, 1, 0],
                                rotate: [0, 360],
                                x: Math.random() * (window.innerWidth || 1200),
                                y: Math.random() * (window.innerHeight || 800),
                            }}
                            transition={{
                                duration: 15 + Math.random() * 10,
                                repeat: Infinity,
                                delay: i * 2,
                                ease: "easeInOut"
                            }}
                            className="absolute"
                        >
                            <div className="w-20 h-28 bg-gradient-to-br from-purple-600/30 to-pink-600/30 backdrop-blur-xl rounded-xl border border-white/20 p-3 shadow-2xl">
                                <div className="text-xs font-bold text-white/90 mb-1 truncate">
                                    {movie.title}
                                </div>
                                <div className="flex items-center gap-1 mb-1">
                                    <span className="text-yellow-400">⭐</span>
                                    <span className="text-xs text-white/70">{movie.rating}</span>
                                </div>
                                <div className="text-xs text-purple-300 bg-purple-500/20 rounded px-1 py-0.5">
                                    {movie.genre}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Animated Orbs with Parallax */}
                <motion.div
                    className="absolute inset-0 opacity-40"
                    style={{ y }}
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"
                        style={{
                            x: mousePosition.x * 0.5,
                            y: mousePosition.y * 0.5,
                        }}
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            rotate: [360, 180, 0],
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl"
                        style={{
                            x: mousePosition.x * -0.3,
                            y: mousePosition.y * -0.3,
                        }}
                    />
                </motion.div>

                {/* Main Content */}
                <motion.div
                    className="relative z-10 text-center space-y-8 px-6 max-w-6xl"
                    style={{ opacity }}
                >
                    {/* Real-time Status Bar */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center justify-center gap-6 mb-8"
                    >
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-sm text-white/80">Live Now</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                            <span className="text-sm text-white/80">
                                {currentTime.toLocaleTimeString()}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                            <span className="text-sm text-white/80">5.2M+ Active Users</span>
                        </div>
                    </motion.div>

                    {/* Logo with Advanced Animation */}
                    <motion.div
                        initial={{ scale: 0, rotateY: -180 }}
                        animate={{ scale: 1, rotateY: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                            delay: 0.2
                        }}
                        className="flex justify-center mb-8"
                    >
                        <motion.div
                            whileHover={{
                                scale: 1.1,
                                rotateY: 15,
                                boxShadow: "0 25px 50px rgba(168, 85, 247, 0.5)"
                            }}
                            className="relative"
                        >
                            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/25 border border-white/20">
                                <motion.span
                                    animate={{
                                        rotate: [0, 10, -10, 0],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="text-4xl font-bold text-white"
                                >
                                    🎬
                                </motion.span>
                            </div>
                            <motion.div
                                className="absolute -inset-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl opacity-0 blur-xl"
                                whileHover={{ opacity: 0.6 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Enhanced Title with Text Reveal */}
                    <div className="relative">
                        <motion.h1
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                delay: 0.3
                            }}
                            className="text-7xl md:text-9xl font-black mb-6 leading-tight tracking-tight"
                        >
                            <span className="relative inline-block">
                                <motion.span
                                    className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
                                    whileHover={{
                                        backgroundImage: "linear-gradient(90deg, #ffffff 0%, #a855f7 50%, #ec4899 100%)",
                                    }}
                                >
                                    Film
                                </motion.span>
                                <motion.span
                                    className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    Findr
                                </motion.span>
                            </span>
                        </motion.h1>

                        {/* Glowing underline */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-sm"
                        />
                    </div>

                    {/* Enhanced Subtitle */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            delay: 0.5
                        }}
                        className="space-y-4"
                    >
                        <p className="text-xl md:text-2xl font-medium text-gray-200 max-w-4xl mx-auto leading-relaxed">
                            Discover cinematic masterpieces with AI-powered recommendations,
                            <br />
                            curated collections, and
                            <motion.span
                                className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold"
                                whileHover={{ scale: 1.05 }}
                            >
                                {" "}personalized insights
                            </motion.span>
                            {" "}that understand your taste.
                        </p>

                        {/* Feature Pills */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-wrap justify-center gap-3 pt-4"
                        >
                            {["AI Recommendations", "4K Streaming", "Offline Mode", "Social Reviews"].map((feature, i) => (
                                <motion.div
                                    key={feature}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 + i * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-sm font-medium text-white/90"
                                >
                                    {feature}
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Enhanced CTA Buttons */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            delay: 0.9
                        }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
                    >
                        <motion.a
                            href="#movies"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 25px 50px rgba(168, 85, 247, 0.4)",
                                rotateX: 5,
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 overflow-hidden border border-white/20"
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                whileHover={{ scale: 1.05 }}
                            />
                            <span className="relative z-10 flex items-center gap-3">
                                <span>Start Exploring</span>
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center"
                                >
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                                    </svg>
                                </motion.div>
                            </span>
                        </motion.a>

                        <motion.button
                            onClick={() => setShowTrailer(true)}
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: "rgba(255, 255, 255, 0.1)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-10 py-5 border-2 border-white/30 rounded-2xl font-semibold text-lg backdrop-blur-xl hover:border-white/50 transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                <motion.div
                                    whileHover={{ scale: 1.2, rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                                >
                                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </motion.div>
                                <span>Watch Demo</span>
                            </span>
                        </motion.button>
                    </motion.div>

                    {/* Enhanced Stats with Real-time Feel */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            delay: 1.1
                        }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto"
                    >
                        {[
                            { value: "50K+", label: "Movies & Shows", trend: "+12%" },
                            { value: "2.5M+", label: "Active Users", trend: "+24%" },
                            { value: "4.9★", label: "User Rating", trend: "+0.3" },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 1.2 + i * 0.1 }}
                                whileHover={{
                                    scale: 1.05,
                                    y: -5,
                                    boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)"
                                }}
                                className="text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
                            >
                                <div className="text-3xl font-black text-white mb-2">{stat.value}</div>
                                <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
                                <div className="text-xs text-green-400 font-semibold">
                                    ↗ {stat.trend} this month
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Enhanced Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-sm text-white/60 font-medium">Scroll to explore</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center relative overflow-hidden"
                    >
                        <motion.div
                            animate={{ y: [-20, 30] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1 h-3 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-2"
                        />
                    </motion.div>
                </motion.div>
            </section>

            {/* Enhanced Trailer Modal */}
            <AnimatePresence>
                {showTrailer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl"
                        onClick={() => setShowTrailer(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
                            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                            exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="relative w-full max-w-5xl mx-4 aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Enhanced Close Button */}
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setShowTrailer(false)}
                                className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/70 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors border border-white/20"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </motion.button>

                            {/* Video Player */}
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
