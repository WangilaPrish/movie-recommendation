"use client";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import MovieGrid from "./MovieGrid";

interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    overview?: string;
    release_date?: string;
}

interface Props {
    movies: Movie[];
}

export default function MoviesShell({ movies }: Props) {
    const [favorites, setFavorites] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showToast, setShowToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

    // Initialize favorites from localStorage
    useEffect(() => {
        const initializeFavorites = () => {
            try {
                const raw = localStorage.getItem("favorites");
                const savedFavorites = raw ? JSON.parse(raw) : [];
                setFavorites(savedFavorites);
            } catch (error) {
                console.warn("Failed to load favorites from localStorage:", error);
                setFavorites([]);
            } finally {
                setIsLoading(false);
            }
        };

        // Small delay to prevent hydration mismatch
        const timer = setTimeout(initializeFavorites, 100);
        return () => clearTimeout(timer);
    }, []);

    // Persist favorites to localStorage
    useEffect(() => {
        if (!isLoading) {
            try {
                localStorage.setItem("favorites", JSON.stringify(favorites));
            } catch (error) {
                console.warn("Failed to save favorites to localStorage:", error);
            }
        }
    }, [favorites, isLoading]);

    // Show toast notification
    const showNotification = useCallback((message: string, type: 'success' | 'info' = 'success') => {
        setShowToast({ message, type });
        setTimeout(() => setShowToast(null), 3000);
    }, []);

    // Toggle favorite with optimistic updates and notifications
    const toggleFavorite = useCallback((id: number) => {
        const movie = movies.find(m => m.id === id);
        const movieTitle = movie?.title || 'Movie';

        setFavorites((prev) => {
            const isCurrentlyFavorited = prev.includes(id);
            const newFavorites = isCurrentlyFavorited
                ? prev.filter((x) => x !== id)
                : [...prev, id];

            // Show notification
            showNotification(
                isCurrentlyFavorited
                    ? `Removed "${movieTitle}" from favorites`
                    : `Added "${movieTitle}" to favorites`,
                isCurrentlyFavorited ? 'info' : 'success'
            );

            return newFavorites;
        });
    }, [movies, showNotification]);

    // Loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3"
                >
                    <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                    <span className="text-gray-400 font-medium">Loading your favorites...</span>
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
        >
            {/* Toast Notification */}
            {showToast && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.9 }}
                    className="fixed top-6 right-6 z-[9999] max-w-sm"
                >
                    <div className={`
                        px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md border
                        ${showToast.type === 'success'
                            ? 'bg-green-500/20 border-green-500/30 text-green-100'
                            : 'bg-blue-500/20 border-blue-500/30 text-blue-100'
                        }
                    `}>
                        <div className="flex items-center gap-3">
                            <div className={`
                                w-2 h-2 rounded-full
                                ${showToast.type === 'success' ? 'bg-green-400' : 'bg-blue-400'}
                            `} />
                            <p className="font-medium text-sm">{showToast.message}</p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Favorites Stats */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 backdrop-blur-sm"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold">Your Collection</h3>
                            <p className="text-gray-400 text-sm">
                                {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} saved
                            </p>
                        </div>
                    </div>
                    <motion.div
                        key={favorites.length}
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-2xl font-bold text-purple-400"
                    >
                        {favorites.length}
                    </motion.div>
                </div>
            </motion.div>

            {/* Movie Grid */}
            <MovieGrid
                movies={movies}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
            />
        </motion.div>
    );
}
