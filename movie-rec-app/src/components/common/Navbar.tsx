"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

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
            className="w-full bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 text-white px-8 py-4 flex items-center justify-between shadow-xl sticky top-0 z-50"
        >
            <Link href="/" className="flex items-center gap-2">
                <motion.span
                    whileHover={{ scale: 1.08, color: "#a78bfa" }}
                    className="text-3xl font-black tracking-tight transition-colors duration-200"
                >
                    🎬 FilmFindr
                </motion.span>
            </Link>
            <motion.div
                className="flex gap-8"
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
                        whileHover={{ y: -3, scale: 1.1, color: "#a78bfa" }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Link
                            href={link.href}
                            className="text-lg font-semibold hover:text-purple-400 transition-colors duration-200 px-2 py-1 rounded-lg"
                        >
                            {link.label}
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </motion.nav>
    );
};

export default Navbar;
