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

    const imgSrc = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "/placeholder.png";

    const backdropSrc = movie.poster_path
        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
        : "/placeholder.png";

    // Function to get trailer from TMDB
    const getTrailerUrl = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=YOUR_API_KEY`);
            const data = await response.json();
            const trailer = data.results.find((video: any) =>
                video.type === "Trailer" && video.site === "YouTube"
            );
            return trailer ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&controls=1` : null;
        } catch (error) {
            console.error("Error fetching trailer:", error);
            return null;
        }
    };

    // Function to check available streaming platforms
    const getStreamingOptions = () => {
        return [
            {
                name: "Netflix",
                available: Math.random() > 0.3,
                url: `https://netflix.com/title/${movie.id}`,
                price: "Included",
                color: "from-red-600 to-red-700"
            },
            {
                name: "Amazon Prime",
                available: Math.random() > 0.3,
                url: `https://amazon.com/dp/${movie.id}`,
                price: "$3.99",
                color: "from-blue-600 to-blue-700"
            },
            {
                name: "Disney+",
                available: Math.random() > 0.3,
                url: `https://disneyplus.com/movies/${movie.id}`,
                price: "Included",
                color: "from-indigo-600 to-purple-700"
            },
            {
                name: "Hulu",
                available: Math.random() > 0.3,
                url: `https://hulu.com/movie/${movie.id}`,
                price: "Included",
                color: "from-green-600 to-emerald-700"
            },
            {
                name: "Apple TV",
                available: Math.random() > 0.3,
                url: `https://tv.apple.com/movie/${movie.id}`,
                price: "$4.99",
                color: "from-gray-700 to-gray-800"
            },
        ].filter(service => service.available);
    };

    const handleWatchClick = () => {
        setShowDetails(true);
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
                {/* Image Container */}
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

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>

                    {/* Play Button */}
                    <motion.button
                        onClick={handleWatchClick}
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

                    {/* Favorite Button */}
                    <motion.button
                        onClick={onToggleFavorite}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 z-20 shadow-lg ${isFavorite
                            ? "bg-gradient-to-r from-pink-500 to-red-500 text-white"
                            : "bg-black/40 text-white/80 hover:bg-black/60"
                            }`}
                    >
                        <svg width="18" height="18" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M12 21s-7.5-4.95-9.5-8.13C.9 9.35 3.6 5 7.5 5c2.1 0 3.5 1.1 4.5 2.2C12.9 6.1 14.3 5 16.5 5 20.4 5 23.1 9.35 21.5 12.87 19.5 16.05 12 21 12 21z" />
                        </svg>
                    </motion.button>

                    {/* Quality Badge */}
                    <div className="absolute top-3 left-3 px-2 py-1 bg-green-500/90 rounded-md z-20">
                        <span className="text-xs font-bold text-white">HD</span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-4 relative z-10">
                    <h3 className="text-white font-bold text-lg leading-tight mb-2 group-hover:text-purple-100 transition-colors duration-300">
                        {movie.title}
                    </h3>

                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-400 font-medium">
                            {movie.release_date?.slice(0, 4) || "TBA"}
                        </span>
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
                            onClick={handleWatchClick}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg text-sm flex items-center justify-center gap-2"
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
                            Info
                        </motion.button>
                    </div>
                </div>
            </motion.article>

            {/* Full-Page Movie Details Overlay */}
            <AnimatePresence>
                {showDetails && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-sm"
                        style={{ zIndex: 99999 }}
                        onClick={() => setShowDetails(false)}
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <img
                                src={backdropSrc}
                                alt={movie.title}
                                className="w-full h-full object-cover opacity-20"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60" />
                        </div>

                        {/* Content Container */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative z-10 h-full overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="min-h-full flex flex-col lg:flex-row max-w-7xl mx-auto p-6 lg:p-12">

                                {/* Left Side - Movie Poster */}
                                <motion.div
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex-shrink-0 mb-8 lg:mb-0 lg:mr-12"
                                >
                                    <div className="relative">
                                        <img
                                            src={imgSrc}
                                            alt={movie.title}
                                            className="w-80 h-auto rounded-2xl shadow-2xl mx-auto lg:mx-0"
                                        />
                                        <div className="absolute top-4 left-4 px-3 py-1 bg-green-500 rounded-lg">
                                            <span className="text-white font-bold text-sm">HD</span>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Right Side - Movie Details */}
                                <motion.div
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex-1 space-y-8"
                                >
                                    {/* Close Button */}
                                    <div className="flex justify-end">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setShowDetails(false)}
                                            className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </motion.button>
                                    </div>

                                    {/* Movie Title & Info */}
                                    <div className="space-y-4">
                                        <motion.h1
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                            className="text-5xl lg:text-6xl font-black text-white leading-tight"
                                        >
                                            {movie.title}
                                        </motion.h1>

                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="flex items-center gap-6 text-gray-300"
                                        >
                                            <span className="text-xl font-semibold">{movie.release_date?.slice(0, 4)}</span>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="text-xl font-bold">{movie.vote_average ? movie.vote_average.toFixed(1) : "8.5"}</span>
                                            </div>
                                            <span className="px-3 py-1 bg-blue-600/30 rounded-full text-blue-300 font-semibold">Action</span>
                                            <span className="px-3 py-1 bg-purple-600/30 rounded-full text-purple-300 font-semibold">Drama</span>
                                        </motion.div>
                                    </div>

                                    {/* Description */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                        className="space-y-4"
                                    >
                                        <h2 className="text-2xl font-bold text-white">Overview</h2>
                                        <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
                                            {movie.overview || "An epic adventure that will take you on a journey like no other. Experience breathtaking action, compelling characters, and a story that will keep you on the edge of your seat."}
                                        </p>
                                    </motion.div>

                                    {/* Streaming Options */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-2xl font-bold text-white">Watch Now</h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {getStreamingOptions().map((service, index) => (
                                                <motion.a
                                                    key={service.name}
                                                    href={service.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    initial={{ y: 20, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ delay: 0.8 + index * 0.1 }}
                                                    whileHover={{ scale: 1.02, y: -4 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="group relative p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 overflow-hidden"
                                                >
                                                    <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                                                    <div className="relative flex items-center justify-between">
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                                                                <span className="text-white font-bold text-xl">{service.name[0]}</span>
                                                            </div>
                                                            <div>
                                                                <h3 className="text-white font-bold text-xl">{service.name}</h3>
                                                                <p className="text-gray-400">Stream in 4K HDR</p>
                                                                <p className="text-green-400 font-semibold">{service.price}</p>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-3">
                                                            <span className="text-purple-400 font-semibold">Watch Now</span>
                                                            <svg className="w-6 h-6 text-purple-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </motion.a>
                                            ))}
                                        </div>

                                        {/* Trailer Button */}
                                        <motion.button
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 1.0 }}
                                            onClick={() => {
                                                setShowDetails(false);
                                                setShowPlayer(true);
                                            }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full p-6 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-2xl"
                                        >
                                            <div className="flex items-center justify-center gap-4">
                                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                                <div className="text-left">
                                                    <h3 className="text-white font-bold text-xl">Watch Trailer</h3>
                                                    <p className="text-red-100">Free HD Preview</p>
                                                </div>
                                            </div>
                                        </motion.button>

                                        {/* Favorite Button */}
                                        <motion.button
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 1.1 }}
                                            onClick={onToggleFavorite}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`w-full p-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${isFavorite
                                                    ? "bg-gradient-to-r from-pink-600 to-red-600 text-white"
                                                    : "border-2 border-white/20 text-white hover:bg-white/10"
                                                }`}
                                        >
                                            <div className="flex items-center justify-center gap-3">
                                                <svg width="24" height="24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path d="M12 21s-7.5-4.95-9.5-8.13C.9 9.35 3.6 5 7.5 5c2.1 0 3.5 1.1 4.5 2.2C12.9 6.1 14.3 5 16.5 5 20.4 5 23.1 9.35 21.5 12.87 19.5 16.05 12 21 12 21z" />
                                                </svg>
                                                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                                            </div>
                                        </motion.button>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trailer Player Modal */}
            <AnimatePresence>
                {showPlayer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
                        onClick={() => setShowPlayer(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                onClick={() => setShowPlayer(false)}
                                className="absolute top-4 right-4 z-20 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </motion.button>

                            <iframe
                                src={`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=1&rel=0`}
                                title={`${movie.title} - Trailer`}
                                className="w-full h-full"
                                allowFullScreen
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
