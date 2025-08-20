"use client";
import { motion } from "framer-motion";

const HeroSection = () => (
    <section className="w-full flex flex-col items-center justify-center py-20 bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 text-white relative overflow-hidden">
        {/* Decorative blurred circle */}
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 pointer-events-none"
        />
        <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 text-center drop-shadow-lg"
        >
            🎬 FilmFindr
        </motion.h1>
        <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="text-lg md:text-2xl font-medium mb-10 text-center max-w-2xl drop-shadow"
        >
            Browse trending films, save your favorites, and get personalized recommendations—all in one place.
        </motion.p>
        <motion.a
            href="#movies"
            whileHover={{ scale: 1.08, backgroundColor: "#a78bfa", color: "#fff" }}
            className="px-8 py-3 rounded-full bg-purple-600 text-white font-bold text-lg shadow-lg transition-all duration-200"
        >
            Get Started
        </motion.a>
    </section>
);

export default HeroSection;
