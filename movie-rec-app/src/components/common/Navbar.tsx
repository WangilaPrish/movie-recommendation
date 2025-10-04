"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/favorites", label: "Favorites" },
    { href: "/about", label: "About" },
];

const Navbar: React.FC = () => {
    return (
        <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="w-full bg-black/90 backdrop-blur-xl border-b border-white/10 text-white px-8 py-4 flex items-center justify-between sticky top-0 z-50"
            style={{ fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
            <Link href="/" className="flex items-center gap-3">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3"
                >
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg font-bold">F</span>
                    </div>
                    <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        FilmFindr
                    </span>
                </motion.div>
            </Link>

            <motion.div
                className="flex gap-1"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, x: 40 },
                    visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.1 } },
                }}
            >
                {navLinks.map((link) => (
                    <motion.div
                        key={link.href}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <Link
                            href={link.href}
                            className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-200 rounded-lg hover:bg-white/10 group"
                        >
                            {link.label}
                            <motion.div
                                className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.2 }}
                            />
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </motion.nav>
    );
};

export default Navbar;
