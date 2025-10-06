"use client";
import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

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
    const [trailerKey, setTrailerKey] = useState<string | null>(null);
    const [loadingTrailer, setLoadingTrailer] = useState(false);

    const imgSrc = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "/placeholder.png";

    const backdropSrc = movie.poster_path
        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
        : "/placeholder.png";

    // Fetch trailer
    useEffect(() => {
        const fetchTrailer = async () => {
            try {
                const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || 'your_api_key_here';
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
                );
                const data = await response.json();

                const trailer = data.results?.find(
                    (video: any) =>
                        video.type === 'Trailer' &&
                        video.site === 'YouTube'
                ) || data.results?.find(
                    (video: any) =>
                        video.type === 'Teaser' &&
                        video.site === 'YouTube'
                );

                if (trailer) {
                    setTrailerKey(trailer.key);
                }
            } catch (error) {
                console.error('Error fetching trailer:', error);
            }
        };

        fetchTrailer();
    }, [movie.id]);

    const streamingOptions = useCallback(() => {
        return [
            {
                name: "Netflix",
                available: true,
                url: `https://netflix.com/title/${movie.id}`,
                price: "Included",
                color: "from-red-600 to-red-700"
            },
            {
                name: "Amazon Prime",
                available: true,
                url: `https://amazon.com/dp/${movie.id}`,
                price: "$3.99",
                color: "from-blue-600 to-blue-700"
            },
            {
                name: "Disney+",
                available: true,
                url: `https://disneyplus.com/movies/${movie.id}`,
                price: "Included",
                color: "from-indigo-600 to-purple-700"
            },
        ];
    }, [movie.id]);

    const handleWatchClick = useCallback(() => {
        setShowDetails(true);
    }, []);

    const handleCloseDetails = useCallback(() => {
        setShowDetails(false);
    }, []);

    const handleClosePlayer = useCallback(() => {
        setShowPlayer(false);
        setLoadingTrailer(false);
    }, []);

    const handleTrailerClick = useCallback(() => {
        if (trailerKey) {
            setShowDetails(false);
            setLoadingTrailer(true);
            setShowPlayer(true);
        } else {
            const searchQuery = encodeURIComponent(`${movie.title} trailer`);
            window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, '_blank');
        }
    }, [trailerKey, movie.title]);

    // Responsive Modal
    const DetailsModal = () => (
        <AnimatePresence mode="wait">
            {showDetails && (
                <div
                    className="fixed inset-0 bg-black/90 z-[999999] p-4 sm:p-6 lg:p-8"
                    style={{ backdropFilter: 'blur(8px)' }}
                    onClick={handleCloseDetails}
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `url(${backdropSrc})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />

                    {/* Content Container */}
                    <div
                        className="relative z-10 h-full overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="min-h-full flex flex-col lg:flex-row max-w-7xl mx-auto">

                            {/* Movie Poster - Responsive */}
                            <div className="flex-shrink-0 mb-6 lg:mb-0 lg:mr-8 xl:mr-12">
                                <div className="relative flex justify-center lg:block">
                                    <img
                                        src={imgSrc}
                                        alt={movie.title}
                                        className="w-48 sm:w-64 lg:w-80 h-auto rounded-xl lg:rounded-2xl shadow-2xl"
                                        loading="eager"
                                    />

                                </div>
                            </div>

                            {/* Movie Details - Responsive */}
                            <div className="flex-1 space-y-4 lg:space-y-6">
                                {/* Close Button */}
                                <div className="flex justify-end">
                                    <button
                                        onClick={handleCloseDetails}
                                        className="p-2 lg:p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors duration-200"
                                    >
                                        <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Title & Info - Responsive */}
                                <div className="space-y-3 lg:space-y-4">
                                    <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight text-center lg:text-left">
                                        {movie.title}
                                    </h1>

                                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 lg:gap-6 text-gray-300">
                                        <span className="text-sm lg:text-lg font-semibold">{movie.release_date?.slice(0, 4)}</span>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="text-sm lg:text-lg font-bold">{movie.vote_average ? movie.vote_average.toFixed(1) : "8.5"}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="px-2 py-1 bg-blue-600/30 rounded-full text-blue-300 text-xs lg:text-sm font-semibold">Action</span>
                                            <span className="px-2 py-1 bg-purple-600/30 rounded-full text-purple-300 text-xs lg:text-sm font-semibold">Drama</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2 lg:space-y-3">
                                    <h2 className="text-lg lg:text-xl font-bold text-white">Overview</h2>
                                    <p className="text-sm lg:text-base text-gray-300 leading-relaxed">
                                        {movie.overview || "An epic adventure that will take you on a journey like no other. Experience breathtaking action, compelling characters, and a story that will keep you on the edge of your seat."}
                                    </p>
                                </div>

                                {/* Streaming Options - Responsive Grid */}
                                <div className="space-y-3 lg:space-y-4">
                                    <h2 className="text-lg lg:text-xl font-bold text-white">Watch Now</h2>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                                        {streamingOptions().map((service) => (
                                            <a
                                                key={service.name}
                                                href={service.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group relative p-3 lg:p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors duration-200"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center`}>
                                                            <span className="text-white font-bold text-sm lg:text-base">{service.name[0]}</span>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-white font-semibold text-sm lg:text-base">{service.name}</h3>
                                                            <p className="text-gray-400 text-xs lg:text-sm">Stream in HD</p>
                                                            <p className="text-green-400 text-xs lg:text-sm font-semibold">{service.price}</p>
                                                        </div>
                                                    </div>

                                                    <svg className="w-4 h-4 lg:w-5 lg:h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </div>
                                            </a>
                                        ))}
                                    </div>

                                    {/* Action Buttons - Responsive */}
                                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                        <button
                                            onClick={handleTrailerClick}
                                            disabled={loadingTrailer}
                                            className="flex-1 p-3 lg:p-4 bg-gradient-to-r from-red-600 to-red-700 rounded-xl hover:from-red-700 hover:to-red-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <div className="flex items-center justify-center gap-2 lg:gap-3">
                                                {loadingTrailer ? (
                                                    <div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                ) : (
                                                    <svg className="w-4 h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                )}
                                                <span className="text-white font-semibold text-sm lg:text-base">
                                                    {loadingTrailer ? "Loading..." : trailerKey ? "Watch Trailer" : "Search Trailer"}
                                                </span>
                                            </div>
                                        </button>

                                        <button
                                            onClick={onToggleFavorite}
                                            className={`flex-1 p-3 lg:p-4 rounded-xl font-semibold text-sm lg:text-base transition-colors duration-200 ${isFavorite
                                                ? "bg-gradient-to-r from-pink-600 to-red-600 text-white"
                                                : "border border-white/20 text-white hover:bg-white/10"
                                                }`}
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                <svg width="16" height="16" className="lg:w-5 lg:h-5" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path d="M12 21s-7.5-4.95-9.5-8.13C.9 9.35 3.6 5 7.5 5c2.1 0 3.5 1.1 4.5 2.2C12.9 6.1 14.3 5 16.5 5 20.4 5 23.1 9.35 21.5 12.87 19.5 16.05 12 21 12 21z" />
                                                </svg>
                                                <span className="hidden sm:inline">
                                                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                                                </span>
                                                <span className="sm:hidden">
                                                    {isFavorite ? "Remove" : "Add"}
                                                </span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );

    return (
        <>
            {/* Responsive Movie Card */}
            <article
                className="group relative bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-sm rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 hover:ring-purple-500/30 transition-all duration-300 hover:scale-105 hover:-translate-y-1 lg:hover:-translate-y-2"
                tabIndex={0}
                aria-labelledby={`title-${movie.id}`}
                style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" }}
            >
                {/* Image Container - Responsive Aspect Ratio */}
                <div className="relative aspect-[3/4] sm:aspect-[2/3] bg-gradient-to-br from-zinc-800 to-zinc-900 overflow-hidden">
                    {!imageLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-6 lg:w-8 lg:h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                        </div>
                    )}
                    <img
                        src={imgSrc}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        onLoad={() => setImageLoaded(true)}
                        style={{ opacity: imageLoaded ? 1 : 0 }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>

                    {/* Play Button - Responsive Size */}
                    <button
                        onClick={handleWatchClick}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    >
                        <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-200">
                            <svg className="w-6 h-6 lg:w-8 lg:h-8 text-black ml-0.5 lg:ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </button>

                    {/* Favorite Button - Responsive Size */}
                    <button
                        onClick={onToggleFavorite}
                        className={`absolute top-2 right-2 lg:top-3 lg:right-3 p-2 lg:p-2.5 rounded-full backdrop-blur-md transition-all duration-200 z-20 shadow-lg hover:scale-110 ${isFavorite
                            ? "bg-gradient-to-r from-pink-500 to-red-500 text-white"
                            : "bg-black/40 text-white/80 hover:bg-black/60"
                            }`}
                    >
                        <svg width="14" height="14" className="lg:w-4 lg:h-4" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M12 21s-7.5-4.95-9.5-8.13C.9 9.35 3.6 5 7.5 5c2.1 0 3.5 1.1 4.5 2.2C12.9 6.1 14.3 5 16.5 5 20.4 5 23.1 9.35 21.5 12.87 19.5 16.05 12 21 12 21z" />
                        </svg>
                    </button>


                </div>

                {/* Content Section - Responsive Padding */}
                <div className="p-3 lg:p-4 relative z-10">
                    <h3 className="text-white font-bold text-sm lg:text-lg leading-tight mb-2 group-hover:text-purple-100 transition-colors duration-200 line-clamp-2">
                        {movie.title}
                    </h3>

                    <div className="flex items-center justify-between mb-2 lg:mb-3">
                        <span className="text-xs lg:text-sm text-gray-400 font-medium">
                            {movie.release_date?.slice(0, 4) || "TBA"}
                        </span>
                        <div className="flex items-center gap-1 px-1.5 py-0.5 lg:px-2 lg:py-1 bg-yellow-500/20 rounded-full">
                            <svg className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-xs lg:text-xs text-yellow-300 font-semibold">
                                {movie.vote_average ? movie.vote_average.toFixed(1) : "8.5"}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons - Responsive */}
                    <div className="flex gap-2">
                        <button
                            onClick={handleWatchClick}
                            className="flex-1 px-2.5 py-1.5 lg:px-3 lg:py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-md lg:rounded-lg text-xs lg:text-sm flex items-center justify-center gap-1.5 lg:gap-2 hover:scale-105 transition-transform duration-200"
                        >
                            <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            <span className="hidden sm:inline">Watch</span>
                            <span className="sm:hidden">Play</span>
                        </button>

                        <button
                            onClick={() => setShowDetails(true)}
                            className="px-2.5 py-1.5 lg:px-3 lg:py-2 border border-white/20 text-white font-medium rounded-md lg:rounded-lg hover:bg-white/10 transition-colors duration-200 text-xs lg:text-sm"
                        >
                            Info
                        </button>
                    </div>
                </div>
            </article>

            {/* Render modals */}
            {typeof window !== 'undefined' && createPortal(<DetailsModal />, document.body)}

            {/* Responsive Trailer Player Modal */}
            {typeof window !== 'undefined' && createPortal(
                <AnimatePresence>
                    {showPlayer && (
                        <div
                            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[999999] p-4"
                            onClick={handleClosePlayer}
                        >
                            <div
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl aspect-video bg-black rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={handleClosePlayer}
                                    className="absolute top-2 right-2 lg:top-4 lg:right-4 z-20 w-10 h-10 lg:w-12 lg:h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                                >
                                    <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                {loadingTrailer && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-8 h-8 lg:w-12 lg:h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                            <p className="text-white text-sm lg:text-lg">Loading trailer...</p>
                                        </div>
                                    </div>
                                )}

                                {trailerKey ? (
                                    <iframe
                                        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1&rel=0&modestbranding=1`}
                                        title={`${movie.title} - Trailer`}
                                        className="w-full h-full"
                                        allowFullScreen
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        onLoad={() => setLoadingTrailer(false)}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <div className="text-center p-4 lg:p-8">
                                            <svg className="w-12 h-12 lg:w-16 lg:h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            <h3 className="text-lg lg:text-xl font-bold text-white mb-2">Trailer Not Available</h3>
                                            <p className="text-gray-400 mb-4 text-sm lg:text-base">Sorry, we couldn't find a trailer for this movie.</p>
                                            <button
                                                onClick={() => {
                                                    const searchQuery = encodeURIComponent(`${movie.title} trailer`);
                                                    window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, '_blank');
                                                    handleClosePlayer();
                                                }}
                                                className="px-4 py-2 lg:px-6 lg:py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition-colors text-sm lg:text-base"
                                            >
                                                Search on YouTube
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}
