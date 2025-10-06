"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: [
            { label: "Features", href: "/features" },
            { label: "Pricing", href: "/pricing" },
            { label: "API", href: "/api" },
            { label: "Downloads", href: "/downloads" }
        ],
        company: [
            { label: "About", href: "/about" },
            { label: "Blog", href: "/blog" },
            { label: "Press", href: "/press" }
        ],
        support: [
            { label: "Help Center", href: "/help" },
            { label: "Contact", href: "/contact" },
        ],
        legal: [
            { label: "Privacy", href: "/privacy" },
        ]
    };

    const socialLinks = [
        { name: "Twitter", href: "#", icon: "tw" },
        { name: "GitHub", href: "#", icon: "gh" },
        { name: "Discord", href: "#", icon: "dc" },
        { name: "LinkedIn", href: "#", icon: "li" }
    ];

    return (
        <footer className="relative w-full bg-gradient-to-t from-black via-gray-950 to-gray-900 border-t border-white/10 text-white overflow-hidden">
            {/* Background Elements - Responsive */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content - Responsive Grid */}
                <div className="py-8 sm:py-12 lg:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-12">
                    {/* Brand Section - Responsive Spanning */}
                    <div className="sm:col-span-2 lg:col-span-2 space-y-4 sm:space-y-6 text-center sm:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Link href="/" className="inline-flex items-center gap-2 sm:gap-3 group mb-4 sm:mb-6">
                                <div className="relative">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-md flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-sm"></div>
                                        </div>
                                    </div>
                                    <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300" />
                                </div>
                                <span
                                    className="text-xl sm:text-2xl font-black tracking-tight"
                                    style={{
                                        background: "linear-gradient(135deg, #ffffff 0%, #a855f7 50%, #ec4899 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    FilmFindr
                                </span>
                            </Link>

                            <p className="text-gray-400 leading-relaxed text-sm sm:text-base max-w-sm mx-auto sm:mx-0">
                                Discover your next favorite movie with AI-powered recommendations.
                                Join millions of users finding their perfect entertainment match.
                            </p>


                        </motion.div>
                    </div>

                    {/* Links Sections - Responsive */}
                    {Object.entries(footerLinks).map(([category, links], index) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                            viewport={{ once: true }}
                            className="space-y-3 sm:space-y-4"
                        >
                            <h3 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider">
                                {category}
                            </h3>
                            <div className="space-y-2 sm:space-y-3">
                                {links.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className="block text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Newsletter Section - Responsive */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="py-6 sm:py-8 border-t border-white/10"
                >
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
                        <div className="text-center lg:text-left">
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Stay Updated</h3>
                            <p className="text-gray-400 text-sm sm:text-base">Get the latest movie recommendations and platform updates.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto max-w-md">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 backdrop-blur-sm text-sm sm:text-base"
                            />
                            <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg sm:rounded-xl font-semibold text-white hover:scale-105 transition-transform duration-200 whitespace-nowrap text-sm sm:text-base">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom Section - Responsive */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="py-6 sm:py-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6"
                >
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs sm:text-sm text-gray-400 text-center sm:text-left">
                        <span>&copy; {currentYear} FilmFindr. All rights reserved.</span>

                    </div>

                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
