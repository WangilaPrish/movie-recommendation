"use client";
import { motion } from "framer-motion";

const HeroSection = () => (
    <section className="w-full flex flex-col items-center justify-center py-16 bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 text-white">
        <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="text-5xl md:text-6xl font-extrabold mb-4 text-center"
        >
            Discover Your Next Favorite Movie
        </motion.h1>
        <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="text-lg md:text-2xl font-medium mb-8 text-center max-w-2xl"
        >
            Browse trending films, save your favorites, and get personalized recommendations—all in one place.
        </motion.p>
    </section>
);

export default HeroSection;
