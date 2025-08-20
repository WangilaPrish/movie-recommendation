import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80 }}
            className="w-full bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-lg sticky top-0 z-50"
        >
            <Link href="/">
                <span className="text-2xl font-extrabold tracking-tight hover:text-purple-400 transition-colors duration-200">MovieRec</span>
            </Link>
            <div className="flex gap-6">
                <Link href="/favorites" className="hover:underline hover:text-purple-400 transition-colors duration-200">Favorites</Link>
                <Link href="/about" className="hover:underline hover:text-purple-400 transition-colors duration-200">About</Link>
            </div>
        </motion.nav>
    );
};

export default Navbar;
