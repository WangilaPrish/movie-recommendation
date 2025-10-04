"use client";
import { motion } from "framer-motion";
import React from "react";

const Footer: React.FC = () => {
    return (
        <motion.footer
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
            className="w-full bg-black/90 backdrop-blur-xl border-t border-white/10 text-white py-8 flex flex-col items-center justify-center mt-16"
            style={{ fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-bold">F</span>
                </div>
                <span className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    FilmFindr
                </span>
            </div>
            <p className="text-sm text-gray-400 tracking-wide">
                &copy; {new Date().getFullYear()} FilmFindr. All rights reserved.
            </p>
        </motion.footer>
    );
};

export default Footer;
