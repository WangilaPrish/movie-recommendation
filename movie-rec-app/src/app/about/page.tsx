"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Inter } from "next/font/google";
import { useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const AboutPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        {
            icon: "🤖",
            title: "AI-Powered Recommendations",
            description: "Our advanced machine learning algorithms analyze your viewing patterns, preferences, and ratings to suggest movies you'll love.",
            tech: ["TensorFlow", "Python", "Neural Networks"]
        },
        {
            icon: "🎬",
            title: "Vast Movie Database",
            description: "Access to over 50,000 movies and TV shows with detailed information, cast details, reviews, and streaming availability.",
            tech: ["TMDB API", "Real-time Data", "Cloud Storage"]
        },
        {
            icon: "📱",
            title: "Cross-Platform Experience",
            description: "Seamless experience across all devices with responsive design, offline capabilities, and synchronized preferences.",
            tech: ["React", "Next.js", "PWA"]
        },
        {
            icon: "👥",
            title: "Social Features",
            description: "Share reviews, create watchlists, follow friends, and discover what others are watching in your network.",
            tech: ["Real-time Chat", "Social Graph", "WebSockets"]
        }
    ];

    const teamMembers = [
        {
            name: "Alex Chen",
            role: "AI/ML Engineer",
            avatar: "👨‍💻",
            bio: "Specializes in recommendation algorithms and machine learning models.",
            social: { github: "#", linkedin: "#", twitter: "#" }
        },
        {
            name: "Sarah Johnson",
            role: "Frontend Lead",
            avatar: "👩‍💻",
            bio: "Creates beautiful, intuitive user experiences and interfaces.",
            social: { github: "#", linkedin: "#", twitter: "#" }
        },
        {
            name: "Marcus Williams",
            role: "Backend Engineer",
            avatar: "👨‍🔧",
            bio: "Builds scalable systems and APIs that power our platform.",
            social: { github: "#", linkedin: "#", twitter: "#" }
        },
        {
            name: "Emma Davis",
            role: "UX Designer",
            avatar: "👩‍🎨",
            bio: "Designs user-centered experiences that delight and engage.",
            social: { github: "#", linkedin: "#", twitter: "#" }
        }
    ];

    const stats = [
        { value: "2.5M+", label: "Active Users", description: "Monthly active users worldwide" },
        { value: "50K+", label: "Movies & Shows", description: "In our comprehensive database" },
        { value: "99.9%", label: "Uptime", description: "Reliable service you can count on" },
        { value: "4.9★", label: "User Rating", description: "Average rating on app stores" }
    ];

    const timeline = [
        { year: "2020", event: "Founded", description: "Started with a vision to revolutionize movie discovery" },
        { year: "2021", event: "AI Launch", description: "Launched our first AI recommendation engine" },
        { year: "2022", event: "1M Users", description: "Reached our first million users milestone" },
        { year: "2023", event: "Global Expansion", description: "Expanded to 50+ countries worldwide" },
        { year: "2024", event: "Next-Gen AI", description: "Introduced advanced personalization features" }
    ];

    return (
        <div className={`min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 text-white overflow-hidden ${inter.variable}`}>
            {/* Responsive Header Section */}
            <section className="relative pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-6 sm:space-y-8"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05, rotateY: 10 }}
                            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl sm:rounded-3xl shadow-2xl"
                        >
                            <span className="text-2xl sm:text-3xl lg:text-4xl">🎬</span>
                        </motion.div>

                        <div className="space-y-4">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight">
                                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                                    About
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                                    FilmFindr
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
                                We're revolutionizing how people discover movies and TV shows through
                                <motion.span
                                    className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {" "}AI-powered recommendations
                                </motion.span>
                                {" "}and personalized experiences that understand your unique taste.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Floating Elements */}
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 pointer-events-none opacity-20"
                >
                    <div className="absolute top-1/4 left-1/4 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-24 sm:w-32 lg:w-48 h-24 sm:h-32 lg:h-48 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl" />
                </motion.div>
            </section>

            {/* Responsive Mission Section */}
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-6 lg:space-y-8 order-2 lg:order-1"
                        >
                            <div>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 lg:mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                                    Our Mission
                                </h2>
                                <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed mb-4 lg:mb-6">
                                    In a world overflowing with content, finding the perfect movie or show shouldn't be a chore.
                                    We believe everyone deserves a personalized entertainment experience that adapts to their
                                    mood, preferences, and viewing history.
                                </p>
                                <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
                                    Our mission is to eliminate decision fatigue and help you discover hidden gems,
                                    trending hits, and everything in between through intelligent technology and
                                    human-centered design.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl sm:text-2xl font-bold text-white">Our Values</h3>
                                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                    {["Innovation", "Privacy", "Quality", "Community"].map((value, index) => (
                                        <motion.div
                                            key={value}
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            className="p-3 sm:p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 text-center"
                                        >
                                            <span className="font-semibold text-purple-300 text-sm sm:text-base">{value}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative order-1 lg:order-2"
                        >
                            <div className="relative bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-white/20">
                                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                                    {stats.map((stat, index) => (
                                        <motion.div
                                            key={stat.label}
                                            initial={{ scale: 0, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ scale: 1.05 }}
                                            className="text-center p-3 sm:p-4 bg-white/5 rounded-xl lg:rounded-2xl border border-white/10"
                                        >
                                            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-1 sm:mb-2">{stat.value}</div>
                                            <div className="text-xs sm:text-sm font-semibold text-purple-300 mb-1">{stat.label}</div>
                                            <div className="text-xs text-gray-400 leading-tight">{stat.description}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Responsive Features Section */}
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8" ref={containerRef}>
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-black text-center mb-12 lg:mb-16 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                    >
                        What Makes Us Different
                    </motion.h2>

                    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                        {/* Feature List */}
                        <div className="space-y-3 lg:space-y-4 order-2 lg:order-1">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02, x: 10 }}
                                    onClick={() => setActiveFeature(index)}
                                    className={`p-4 lg:p-6 rounded-xl lg:rounded-2xl border transition-all duration-300 cursor-pointer ${activeFeature === index
                                        ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/50"
                                        : "bg-white/5 border-white/10 hover:border-white/20"
                                        }`}
                                >
                                    <div className="flex items-start gap-3 lg:gap-4">
                                        <div className="text-2xl lg:text-3xl">{feature.icon}</div>
                                        <div className="flex-1">
                                            <h3 className="text-lg lg:text-xl font-bold text-white mb-2">{feature.title}</h3>
                                            <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-3">{feature.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {feature.tech.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-md text-xs font-medium"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Feature Display */}
                        <motion.div
                            key={activeFeature}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="relative order-1 lg:order-2"
                        >
                            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-white/20 h-full flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-6xl lg:text-8xl mb-4 lg:mb-6">{features[activeFeature].icon}</div>
                                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">{features[activeFeature].title}</h3>
                                    <p className="text-gray-300 text-sm lg:text-base leading-relaxed max-w-md mx-auto">
                                        {features[activeFeature].description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Responsive Team Section */}
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-black text-center mb-12 lg:mb-16 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                    >
                        Meet Our Team
                    </motion.h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -10 }}
                                viewport={{ once: true }}
                                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 text-center"
                            >
                                <div className="text-4xl lg:text-5xl mb-4">{member.avatar}</div>
                                <h3 className="text-lg lg:text-xl font-bold text-white mb-2">{member.name}</h3>
                                <p className="text-purple-300 font-semibold mb-3 text-sm lg:text-base">{member.role}</p>
                                <p className="text-gray-400 text-xs lg:text-sm leading-relaxed mb-4">{member.bio}</p>

                                <div className="flex justify-center gap-3">
                                    {Object.entries(member.social).map(([platform, url]) => (
                                        <motion.a
                                            key={platform}
                                            href={url}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-colors"
                                        >
                                            <span className="text-xs font-bold">{platform.slice(0, 2).toUpperCase()}</span>
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Responsive Timeline Section */}
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-black text-center mb-12 lg:mb-16 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                    >
                        Our Journey
                    </motion.h2>

                    <div className="space-y-6 lg:space-y-8">
                        {timeline.map((item, index) => (
                            <motion.div
                                key={item.year}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex flex-col sm:flex-row items-start gap-4 lg:gap-6"
                            >
                                <div className="flex-shrink-0 w-20 lg:w-24 text-center">
                                    <div className="text-2xl lg:text-3xl font-black text-purple-400">{item.year}</div>
                                </div>
                                <div className="flex-1 bg-white/5 backdrop-blur-xl rounded-2xl p-4 lg:p-6 border border-white/10">
                                    <h3 className="text-lg lg:text-xl font-bold text-white mb-2">{item.event}</h3>
                                    <p className="text-gray-300 text-sm lg:text-base leading-relaxed">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Responsive CTA Section */}
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-8 lg:p-12 border border-white/20"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 lg:mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                            Ready to Discover?
                        </h2>
                        <p className="text-lg lg:text-xl text-gray-300 mb-6 lg:mb-8 leading-relaxed">
                            Join millions of users who have already transformed their entertainment experience.
                            Your next favorite movie is just a click away.
                        </p>
                        <motion.a
                            href="/"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 px-8 lg:px-12 py-4 lg:py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-xl lg:rounded-2xl font-bold text-lg lg:text-xl text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
                        >
                            <span>Start Exploring</span>
                            <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                            </svg>
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
