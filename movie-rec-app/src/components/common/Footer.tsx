"use client";
import React from "react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
    return (
        <motion.footer
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
            className="w-full bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 text-white py-6 flex items-center justify-center shadow-xl mt-8"
        >
            <span className="text-base font-semibold tracking-wide">
                &copy; {new Date().getFullYear()} FilmFindr. All rights reserved.
            </span>
        </motion.footer>
    );
};

export default Footer;
