"use client";
import { motion } from "framer-motion";

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
    const imgSrc = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "/placeholder.png";

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            className="relative bg-white/5 rounded-lg overflow-hidden shadow-md ring-1 ring-white/6"
            tabIndex={0}
            aria-labelledby={`title-${movie.id}`}
        >
            <div className="aspect-[2/3] bg-gray-800">
                <img
                    src={imgSrc}
                    alt={movie.title}
                    className="w-full h-full object-cover block"
                    loading="lazy"
                />
            </div>

            <div className="p-2 md:p-3">
                <h3 id={`title-${movie.id}`} className="text-sm md:text-base font-semibold truncate">
                    {movie.title}
                </h3>
                <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">{movie.release_date?.slice(0, 4)}</span>
                    <motion.button
                        onClick={onToggleFavorite}
                        aria-pressed={isFavorite}
                        whileTap={{ scale: 0.9 }}
                        animate={{ scale: isFavorite ? 1.05 : 1 }}
                        className={`ml-2 inline-flex items-center justify-center p-1 rounded-md transition-colors text-sm ${isFavorite ? "bg-pink-600 text-white" : "bg-white/5 text-white/80"
                            }`}
                        title={isFavorite ? "Remove favorite" : "Add to favorites"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 21s-7.5-4.95-9.5-8.13C.9 9.35 3.6 5 7.5 5c2.1 0 3.5 1.1 4.5 2.2C12.9 6.1 14.3 5 16.5 5 20.4 5 23.1 9.35 21.5 12.87 19.5 16.05 12 21 12 21z" />
                        </svg>
                    </motion.button>
                </div>
            </div>

            {/* overlay with description on hover (visible for pointer devices) */}
            <div className="pointer-events-none md:pointer-events-auto absolute inset-0 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 flex items-end">
                    <p className="text-xs text-gray-200 line-clamp-3">{movie.overview}</p>
                </div>
            </div>
        </motion.article>
    );
}
