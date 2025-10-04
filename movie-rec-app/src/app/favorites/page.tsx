"use client";
import MovieGrid from '@/components/movies/MovieGrid';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<number[]>([]);
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem('favorites');
            const favs = raw ? JSON.parse(raw) : [];
            setFavorites(favs);
        } catch (e) {
            setFavorites([]);
        }
    }, []);

    useEffect(() => {
        if (!favorites.length) return setMovies([]);
        setLoading(true);
        Promise.all(
            favorites.map((id) => fetch(`/api/movies/${id}`).then((r) => r.json()))
        )
            .then((res) => setMovies(res))
            .catch(() => setMovies([]))
            .finally(() => setLoading(false));
    }, [favorites]);

    // Loading State
    if (loading) {
        return (
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-6 py-8"
                style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" }}
            >
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full"
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Loading Your Collection</h2>
                        <p className="text-gray-400">Fetching your favorite movies...</p>
                    </motion.div>
                </div>
            </motion.main>
        );
    }

    // Empty State
    if (!favorites.length) {
        return (
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-6 py-8"
                style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" }}
            >
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-12"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                                    Your Favorites
                                </h1>
                                <p className="text-gray-400 text-lg">Your personal movie collection</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Empty State */}
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-center py-20"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                                delay: 0.4
                            }}
                            className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center border border-purple-500/30"
                        >
                            <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="space-y-4"
                        >
                            <h2 className="text-3xl font-bold text-white">No Favorites Yet</h2>
                            <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
                                Start building your collection by adding movies you love to your favorites
                            </p>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="pt-6"
                            >
                                <motion.a
                                    href="/"
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Browse Movies
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.main>
        );
    }

    // Main Content
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-6 py-8"
            style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" }}
        >
            <div className="max-w-7xl mx-auto">
                {/* Hero Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="relative mb-12 p-8 rounded-3xl bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-pink-900/40 backdrop-blur-xl border border-white/10 overflow-hidden"
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 left-4 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl" />
                        <div className="absolute bottom-4 right-4 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl" />
                    </div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-4"
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent mb-2">
                                    Your Favorites
                                </h1>
                                <p className="text-gray-300 text-lg font-medium">
                                    Your curated collection of amazing films
                                </p>
                            </div>
                        </motion.div>

                        {/* Stats Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-6 p-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl"
                        >
                            <div className="text-center">
                                <motion.div
                                    key={favorites.length}
                                    initial={{ scale: 1.2, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-3xl font-bold text-purple-400"
                                >
                                    {favorites.length}
                                </motion.div>
                                <div className="text-sm text-gray-400">Movies Saved</div>
                            </div>
                            <div className="w-px h-8 bg-white/20" />
                            <div className="text-center">
                                <div className="text-3xl font-bold text-pink-400">★</div>
                                <div className="text-sm text-gray-400">Collection</div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Movie Grid */}
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <MovieGrid movies={movies} />
                </motion.div>
            </div>
        </motion.main>
    );
}
