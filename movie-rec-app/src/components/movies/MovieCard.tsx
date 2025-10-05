"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    overview?: string;
    release_date?: string;
    vote_average?: number;
}

interface Props {
    movie: Movie;
    isFavorite?: boolean;
    onToggleFavorite?: () => void;
}

export default function MovieCard({ movie, isFavorite = false, onToggleFavorite }: Props) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration] = useState(7830); // 2:15:30 in seconds
    const [volume, setVolume] = useState(80);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const imgSrc = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "/placeholder.png";

    // Format time helper
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        if (hours > 0) {
            return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Simulate video progress
    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
            const interval = setInterval(() => {
                setCurrentTime(prev => {
                    if (prev >= duration) {
                        setIsPlaying(false);
                        clearInterval(interval);
                        return duration;
                    }
                    return prev + 1;
                });
            }, 1000);
        }
    };

    return (
        <>
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

                    {/* Play Button - Center */}
                    <motion.button
                        onClick={() => setShowPlayer(true)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                    >
                        <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl">
                            <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </motion.button>

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

                    {/* Quality Badge - Top Left */}
                    <div className="absolute top-3 left-3 px-2 py-1 bg-green-500/90 rounded-md z-20">
                        <span className="text-xs font-bold text-white">HD</span>
                    </div>
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

                    <div className="flex items-center justify-between mb-3">
                        <motion.span
                            className="text-sm text-gray-400 font-medium"
                            whileHover={{ color: "#a855f7" }}
                        >
                            {movie.release_date?.slice(0, 4) || "TBA"}
                        </motion.span>

                        {/* Rating Badge */}
                        <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 rounded-full">
                            <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-xs text-yellow-300 font-semibold">
                                {movie.vote_average ? movie.vote_average.toFixed(1) : "8.5"}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <motion.button
                            onClick={() => setShowPlayer(true)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg text-sm flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            Watch
                        </motion.button>

                        <motion.button
                            onClick={() => setShowDetails(true)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-3 py-2 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-200 text-sm"
                        >
                            Details
                        </motion.button>
                    </div>
                </div>
            </motion.article>

            {/* Enhanced Movie Player Modal */}
            <AnimatePresence>
                {showPlayer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`fixed inset-0 z-50 bg-black ${isFullscreen ? '' : 'flex items-center justify-center p-4'}`}
                        onClick={() => !isFullscreen && setShowPlayer(false)}
                    >
                        <motion.div
                            initial={{ scale: isFullscreen ? 1 : 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: isFullscreen ? 1 : 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className={`relative bg-black overflow-hidden shadow-2xl ${isFullscreen
                                ? 'w-full h-full'
                                : 'w-full max-w-6xl aspect-video rounded-2xl'
                                }`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Movie Poster as Background/Placeholder */}
                            <div className="absolute inset-0">
                                <img
                                    src={imgSrc}
                                    alt={movie.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/60" />
                            </div>

                            {/* Video Player Interface */}
                            <div className="relative w-full h-full flex items-center justify-center">
                                {/* Center Play/Pause Button */}
                                <motion.button
                                    onClick={handlePlayPause}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-2xl"
                                >
                                    {isPlaying ? (
                                        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    )}
                                </motion.button>

                                {/* Movie Info Overlay (Top) */}
                                <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                                <span className="text-white font-bold text-lg">▶</span>
                                            </div>
                                            <div>
                                                <h2 className="text-white font-bold text-xl">{movie.title}</h2>
                                                <p className="text-gray-300 text-sm">{movie.release_date?.slice(0, 4)} • HD • Action, Drama</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {!isFullscreen && (
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => setIsFullscreen(true)}
                                                    className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
                                                    title="Fullscreen"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l4 4m12-4v4m0-4h-4m4 0l-4 4M4 16v4m0 0h4m-4 0l4-4m12 4l-4-4m4 4v-4m0 4h-4" />
                                                    </svg>
                                                </motion.button>
                                            )}

                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => {
                                                    setShowPlayer(false);
                                                    setIsFullscreen(false);
                                                    setIsPlaying(false);
                                                }}
                                                className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>

                                {/* Player Controls (Bottom) */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                                    {/* Progress Bar */}
                                    <div className="mb-4">
                                        <div className="w-full h-2 bg-white/20 rounded-full cursor-pointer">
                                            <div
                                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                                                style={{ width: `${(currentTime / duration) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        {/* Left Controls */}
                                        <div className="flex items-center gap-4">
                                            <motion.button
                                                onClick={handlePlayPause}
                                                whileHover={{ scale: 1.05 }}
                                                className="p-2 text-white hover:text-purple-400 transition-colors"
                                            >
                                                {isPlaying ? (
                                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                )}
                                            </motion.button>

                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                                                </svg>
                                                <div className="w-20 h-1 bg-white/20 rounded-full">
                                                    <div
                                                        className="h-full bg-white rounded-full"
                                                        style={{ width: `${volume}%` }}
                                                    />
                                                </div>
                                            </div>

                                            <span className="text-white text-sm font-medium">
                                                {formatTime(currentTime)} / {formatTime(duration)}
                                            </span>
                                        </div>

                                        {/* Right Controls */}
                                        <div className="flex items-center gap-3">
                                            <select className="bg-black/50 text-white text-sm rounded px-3 py-1 border border-white/20">
                                                <option>1080p HD</option>
                                                <option>720p</option>
                                                <option>480p</option>
                                            </select>

                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                className="px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-lg text-sm"
                                                onClick={() => alert('Redirecting to premium streaming...')}
                                            >
                                                Upgrade to HD
                                            </motion.button>

                                            {isFullscreen && (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    onClick={() => setIsFullscreen(false)}
                                                    className="p-2 text-white hover:text-purple-400 transition-colors"
                                                    title="Exit Fullscreen"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </motion.button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Movie Details Modal */}
            <AnimatePresence>
                {showDetails && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                        onClick={() => setShowDetails(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-2xl w-full bg-gradient-to-br from-zinc-900 to-black rounded-2xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-2xl font-bold text-white">{movie.title}</h2>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        onClick={() => setShowDetails(false)}
                                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </motion.button>
                                </div>

                                <p className="text-gray-300 mb-6 leading-relaxed">
                                    {movie.overview || "No description available for this movie."}
                                </p>

                                <div className="flex gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => {
                                            setShowDetails(false);
                                            setShowPlayer(true);
                                        }}
                                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg flex items-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                        Watch Now
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        onClick={onToggleFavorite}
                                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${isFavorite
                                            ? "bg-pink-600 text-white"
                                            : "border border-white/20 text-white hover:bg-white/10"
                                            }`}
                                    >
                                        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
