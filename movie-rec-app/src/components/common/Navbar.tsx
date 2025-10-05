"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/movies", label: "Movies" },
    { href: "/favorites", label: "Favorites" },
    { href: "/about", label: "About" },
];

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                        ? "bg-black/95 backdrop-blur-2xl border-b border-white/20 shadow-xl"
                        : "bg-black/70 backdrop-blur-xl border-b border-white/10"
                    }`}
                style={{ fontFamily: "'Inter Variable', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-18">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: 3 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative"
                            >
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-300">
                                    <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                                        <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-sm"></div>
                                    </div>
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300" />
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="hidden sm:block"
                            >
                                <span
                                    className="text-2xl font-black tracking-tight"
                                    style={{
                                        background: "linear-gradient(135deg, #ffffff 0%, #a855f7 50%, #ec4899 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    FilmFindr
                                </span>
                            </motion.div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link, index) => {
                                const isActive = pathname === link.href;
                                return (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index + 0.2 }}
                                        whileHover={{ y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className={`relative group px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center ${isActive
                                                    ? "text-white bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30"
                                                    : "text-gray-300 hover:text-white hover:bg-white/10"
                                                }`}
                                        >
                                            <span className="relative z-10">{link.label}</span>

                                            {/* Active indicator */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl border border-purple-500/50"
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            )}

                                            {/* Hover underline for non-active items */}
                                            {!isActive && (
                                                <motion.div
                                                    className="absolute bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                                    initial={{ width: 0, x: "-50%" }}
                                                    whileHover={{ width: "70%" }}
                                                    transition={{ duration: 0.2 }}
                                                />
                                            )}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-3">
                            {/* Search Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300"
                                aria-label="Search movies"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <span className="text-sm font-medium hidden lg:block">Search</span>
                            </motion.button>

                            {/* User Avatar */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative"
                            >
                                <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer ring-2 ring-white/20 hover:ring-purple-500/50 transition-all duration-300">
                                    <span className="text-sm">U</span>
                                </div>
                            </motion.div>

                            {/* Mobile Menu Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300"
                                aria-label="Toggle mobile menu"
                            >
                                <motion.div
                                    animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {mobileMenuOpen ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    )}
                                </motion.div>
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-2xl"
                        >
                            <div className="px-4 py-6 space-y-2">
                                {navLinks.map((link, index) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * index }}
                                        >
                                            <Link
                                                href={link.href}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                                        ? "text-white bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30"
                                                        : "text-gray-300 hover:text-white hover:bg-white/10"
                                                    }`}
                                            >
                                                <span className="font-semibold">{link.label}</span>
                                                {isActive && (
                                                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                                                )}
                                            </Link>
                                        </motion.div>
                                    );
                                })}

                                {/* Mobile Search */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="pt-4 border-t border-white/10"
                                >
                                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <span className="font-semibold">Search Movies</span>
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Spacer to prevent content from hiding behind fixed navbar */}
            <div className="h-16 lg:h-18" />
        </>
    );
};

export default Navbar;
