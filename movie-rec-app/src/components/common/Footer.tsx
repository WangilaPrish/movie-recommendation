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
            { label: "Careers", href: "/careers" },
            { label: "Press", href: "/press" }
        ],
        support: [
            { label: "Help Center", href: "/help" },
            { label: "Contact", href: "/contact" },
            { label: "Status", href: "/status" },
            { label: "Documentation", href: "/docs" }
        ],
        legal: [
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
            { label: "Security", href: "/security" },
            { label: "Cookies", href: "/cookies" }
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
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Main Footer Content */}
                <div className="py-16 grid grid-cols-1 lg:grid-cols-6 gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Link href="/" className="flex items-center gap-3 group mb-6">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                                        <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                                            <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-sm"></div>
                                        </div>
                                    </div>
                                    <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300" />
                                </div>
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
                            </Link>

                            <p className="text-gray-400 leading-relaxed max-w-sm">
                                Discover your next favorite movie with AI-powered recommendations.
                                Join millions of users finding their perfect entertainment match.
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    <span className="text-green-300 text-sm font-medium">Live Service</span>
                                </div>
                                <div className="text-sm text-gray-500">
                                    <span className="text-white font-semibold">2.5M+</span> active users
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Links Sections */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h3 className="text-white font-bold text-sm uppercase tracking-wider">Product</h3>
                        <div className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h3 className="text-white font-bold text-sm uppercase tracking-wider">Company</h3>
                        <div className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h3 className="text-white font-bold text-sm uppercase tracking-wider">Support</h3>
                        <div className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h3 className="text-white font-bold text-sm uppercase tracking-wider">Legal</h3>
                        <div className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Newsletter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="py-8 border-t border-white/10"
                >
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
                            <p className="text-gray-400">Get the latest movie recommendations and platform updates.</p>
                        </div>

                        <div className="flex gap-3 w-full lg:w-auto max-w-md">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 backdrop-blur-sm"
                            />
                            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:scale-105 transition-transform duration-200 whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="py-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6"
                >
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                        <span>&copy; {currentYear} FilmFindr. All rights reserved.</span>
                        <div className="hidden lg:flex items-center gap-4">
                            <span>Built with React 19</span>
                            <div className="w-1 h-1 bg-gray-600 rounded-full" />
                            <span>Powered by TMDB</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                className="w-10 h-10 bg-white/5 border border-white/20 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-200 group"
                                aria-label={social.name}
                            >
                                <span className="text-xs font-bold group-hover:scale-110 transition-transform duration-200">
                                    {social.icon.toUpperCase()}
                                </span>
                            </a>
                        ))}

                        <div className="w-px h-6 bg-white/20 mx-2" />

                        <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500">Made with</span>
                            <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-sm animate-pulse" />
                            <span className="text-xs text-gray-500">for movie lovers</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
