"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaCalendarAlt, FaHeart } from "react-icons/fa";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
}

interface MovieCardProps {
    movie: Movie;
    onFavorite?: (id: number) => void;
    favorites?: number[];
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onFavorite, favorites = [] }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isFavorite = favorites.includes(movie.id);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onFavorite) {
            onFavorite(movie.id);
        }
    };

    return (
        <motion.div
            className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ 
                y: -8, 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
            }}
            transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20 
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {/* Movie Poster */}
            <div className="relative aspect-[2/3] overflow-hidden">
                <motion.img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                />
                
                {/* Overlay on hover */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Favorite Button */}
                <motion.button
                    onClick={handleFavoriteClick}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-colors ${
                        isFavorite 
                            ? "bg-red-500 text-white" 
                            : "bg-white/20 text-white hover:bg-red-500/80"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                        opacity: isHovered || isFavorite ? 1 : 0,
                        scale: isHovered || isFavorite ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <FaHeart size={16} />
                </motion.button>

                {/* Rating Badge */}
                <motion.div
                    className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-sm font-semibold"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <FaStar size={12} />
                    <span>{movie.vote_average.toFixed(1)}</span>
                </motion.div>

                {/* Movie Info Overlay */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 p-4 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 20
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{movie.title}</h3>
                    {movie.overview && (
                        <p className="text-sm text-gray-200 mb-2 line-clamp-3">
                            {movie.overview}
                        </p>
                    )}
                    {movie.release_date && (
                        <div className="flex items-center gap-1 text-xs text-gray-300">
                            <FaCalendarAlt size={10} />
                            <span>{new Date(movie.release_date).getFullYear()}</span>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Movie Title (always visible) */}
            <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white text-center line-clamp-2">
                    {movie.title}
                </h3>
                <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <FaStar className="text-yellow-500" size={12} />
                    <span>{movie.vote_average.toFixed(1)}</span>
                    {movie.release_date && (
                        <>
                            <span>•</span>
                            <span>{new Date(movie.release_date).getFullYear()}</span>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default MovieCard;
