"use client";
import React from "react";
import { motion } from "framer-motion";
import MovieCard from "./MovieCard";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
}

interface MovieGridProps {
    movies: Movie[];
    onFavorite?: (id: number) => void;
    favorites?: number[];
    title?: string;
    showAnimation?: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({ 
    movies, 
    onFavorite, 
    favorites = [], 
    title = "Trending Movies",
    showAnimation = true 
}) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 24
            }
        }
    };

    return (
        <section className="py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        {title}
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
                    <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg max-w-2xl mx-auto">
                        Discover the latest and most popular movies, handpicked for your entertainment
                    </p>
                </motion.div>

                {/* Movies Grid */}
                {showAnimation ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                    >
                        {movies.map((movie) => (
                            <motion.div key={movie.id} variants={itemVariants}>
                                <MovieCard
                                    movie={movie}
                                    onFavorite={onFavorite}
                                    favorites={favorites}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onFavorite={onFavorite}
                                favorites={favorites}
                            />
                        ))}
                    </div>
                )}

                {/* Load More Button (placeholder for future pagination) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-12"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "#8b5cf6" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full shadow-lg transition-all duration-200"
                    >
                        Load More Movies
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default MovieGrid;
