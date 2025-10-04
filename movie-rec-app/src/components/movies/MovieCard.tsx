"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    overview?: string;
    release_date?: string;
}

interface Props {
    movie: Movie;
    isFavorite?: boolean;
    onToggleFavorite?: () => void;
}

export default function MovieCard({ movie, isFavorite = false, onToggleFavorite }: Props) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const imgSrc = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "/placeholder.png";

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{
                scale: 1.05,
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                duration: 0.3
            }}
            className="group relative bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 hover:ring-purple-500/30 transition-all duration-300"
            tabIndex={0}
            aria-labelledby={`title-${movie.id}`}
            style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" }}
        >
            {/* Image Container with Loading State */}
            <div className="relative aspect-[2/3] bg-gradient-to-br from-zinc-800 to-zinc-900 overflow-hidden">
                {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                    </div>
                )}
                <motion.img
                    src={imgSrc}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: imageLoaded ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>

                {/* Favorite Button - Top Right */}
                <motion.button
                    onClick={onToggleFavorite}
                    aria-pressed={isFavorite}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                        scale: isFavorite ? 1.05 : 1,
                        rotate: isFavorite ? [0, -10, 10, 0] : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 z-20 shadow-lg ${isFavorite
                        ? "bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-pink-500/25"
                        : "bg-black/40 text-white/80 hover:bg-black/60"
                        }`}
                    title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill={isFavorite ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        animate={{
                            fill: isFavorite ? "currentColor" : "none",
                            scale: isFavorite ? [1, 1.2, 1] : 1
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        <path d="M12 21s-7.5-4.95-9.5-8.13C.9 9.35 3.6 5 7.5 5c2.1 0 3.5 1.1 4.5 2.2C12.9 6.1 14.3 5 16.5 5 20.4 5 23.1 9.35 21.5 12.87 19.5 16.05 12 21 12 21z" />
                    </motion.svg>
                </motion.button>
            </div>

            {/* Content Section */}
            <div className="p-4 relative z-10">
                <motion.h3
                    id={`title-${movie.id}`}
                    className="text-white font-bold text-lg leading-tight mb-2 group-hover:text-purple-100 transition-colors duration-300"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                >
                    {movie.title}
                </motion.h3>

                <div className="flex items-center justify-between">
                    <motion.span
                        className="text-sm text-gray-400 font-medium"
                        whileHover={{ color: "#a855f7" }}
                    >
                        {movie.release_date?.slice(0, 4) || "TBA"}
                    </motion.span>

                    {/* Rating Badge (placeholder) */}
                    <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 rounded-full">
                        <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs text-yellow-300 font-semibold">8.5</span>
                    </div>
                </div>
            </div>

            {/* Hover Overlay with Description */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 z-15"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
            >
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-3"
                >
                    <h4 className="text-white font-bold text-lg">{movie.title}</h4>
                    <p className="text-gray-200 text-sm leading-relaxed line-clamp-4">
                        {movie.overview || "No description available."}
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg"
                    >
                        View Details
                    </motion.button>
                </motion.div>
            </motion.div>
        </motion.article>
    );
}
