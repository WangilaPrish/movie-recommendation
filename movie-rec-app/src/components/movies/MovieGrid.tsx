"use client";
import { motion, Variants } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import MovieCard from "./MovieCard";

interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    overview?: string;
    release_date?: string;
}

interface Props {
    movies: Movie[];
    favorites?: number[];
    onToggleFavorite?: (id: number) => void;
    onFavorite?: (id: number) => void;
}

export default function MovieGrid({ movies = [], favorites: favProp, onToggleFavorite, onFavorite }: Props) {
    const [favorites, setFavorites] = useState<number[]>(() => {
        try {
            if (typeof window === "undefined") return [];
            const raw = localStorage.getItem("favorites");
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    });

    useEffect(() => {
        try {
            if (!favProp) localStorage.setItem("favorites", JSON.stringify(favorites));
        } catch (e) { }
    }, [favorites, favProp]);

    const toggleFavorite = (id: number) => {
        if (favProp && (onToggleFavorite || onFavorite)) {
            (onToggleFavorite || onFavorite)!(id);
            return;
        }
        setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };

    const [query, setQuery] = useState<string>("");
    const [sort, setSort] = useState<SortOpt>("relevance");
    const [view, setView] = useState<"grid" | "list">("grid");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        let list = movies.slice();
        if (q) {
            list = list.filter((m) => (m.title || "").toLowerCase().includes(q));
        }
        if (sort === "newest") {
            list.sort((a, b) => (b.release_date || "").localeCompare(a.release_date || ""));
        } else if (sort === "oldest") {
            list.sort((a, b) => (a.release_date || "").localeCompare(b.release_date || ""));
        }
        return list;
    }, [movies, query, sort]);

    useEffect(() => {
        const updateOffset = () => {
            const nav = document.querySelector('nav') as HTMLElement | null;
            const el = document.getElementById('movies');
            const navHeight = (nav?.offsetHeight ?? 0);
            const offset = Math.max(64, navHeight + 12);
            if (el) el.style.scrollMarginTop = `${offset}px`;
        };
        updateOffset();
        window.addEventListener('resize', updateOffset);
        return () => window.removeEventListener('resize', updateOffset);
    }, []);

    return (
        <section
            id="movies"
            aria-label="Trending movies"
            className="mt-8 pt-6"
            style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" }}
        >
            {/* Header with Animated Background */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative mb-8 p-8 rounded-3xl bg-gradient-to-br from-purple-900/30 via-indigo-900/20 to-pink-900/30 backdrop-blur-xl border border-white/10 overflow-hidden"
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
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent mb-2">
                            Trending Now
                        </h2>
                        <p className="text-gray-300 text-lg font-medium">
                            Discover the latest blockbusters and hidden gems
                        </p>
                    </motion.div>

                    {/* Modern Toolbar */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full lg:w-auto"
                    >
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl">

                            {/* Search Input */}
                            <motion.div
                                whileFocus={{ scale: 1.02 }}
                                className="relative flex-1 sm:flex-none group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                                <input
                                    id="movie-search"
                                    type="search"
                                    placeholder="Search movies..."
                                    className="relative w-full sm:w-80 py-3 pl-12 pr-4 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder:text-gray-400 border border-white/20 focus:border-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all duration-300"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </motion.div>

                            <SortListbox sort={sort} setSort={setSort} />

                            {/* View Toggle */}
                            <div className="flex items-center bg-white/10 rounded-xl p-1 border border-white/20">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setView("grid")}
                                    className={`flex items-center justify-center p-2.5 rounded-lg transition-all duration-200 ${view === "grid"
                                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                                        : "text-gray-400 hover:text-white hover:bg-white/10"
                                        }`}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="3" width="7" height="7" />
                                        <rect x="14" y="3" width="7" height="7" />
                                        <rect x="3" y="14" width="7" height="7" />
                                        <rect x="14" y="14" width="7" height="7" />
                                    </svg>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setView("list")}
                                    className={`flex items-center justify-center p-2.5 rounded-lg transition-all duration-200 ${view === "list"
                                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                                        : "text-gray-400 hover:text-white hover:bg-white/10"
                                        }`}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="8" y1="6" x2="21" y2="6" />
                                        <line x1="8" y1="12" x2="21" y2="12" />
                                        <line x1="8" y1="18" x2="21" y2="18" />
                                        <line x1="3" y1="6" x2="3.01" y2="6" />
                                        <line x1="3" y1="12" x2="3.01" y2="12" />
                                        <line x1="3" y1="18" x2="3.01" y2="18" />
                                    </svg>
                                </motion.button>
                            </div>

                            {/* Results Counter */}
                            <motion.div
                                key={filtered.length}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30"
                            >
                                <span className="text-gray-300 text-sm font-medium">Showing</span>
                                <span className="bg-white/20 px-2 py-1 rounded-lg text-white font-bold text-sm">
                                    {filtered.length}
                                </span>
                                <span className="text-gray-400 text-sm">of {movies.length}</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Movies Grid/List */}
            <motion.div
                layout
                initial="hidden"
                animate="visible"
                variants={container}
                className={
                    view === "grid"
                        ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
                        : "flex flex-col gap-4"
                }
            >
                {filtered.map((m, i) => (
                    <motion.div
                        key={m.id ?? `movie-${i}`}
                        variants={item}
                        whileHover={{ y: -8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="will-change-transform"
                    >
                        <MovieCard
                            movie={m}
                            isFavorite={(favProp ?? favorites).includes(m.id)}
                            onToggleFavorite={() => toggleFavorite(m.id)}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Empty State */}
            {filtered.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                >
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
                    <p className="text-gray-400">Try adjusting your search or filter criteria</p>
                </motion.div>
            )}
        </section>
    );
}

// Types and Variants
type SortOpt = "relevance" | "newest" | "oldest";

const item: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    },
};

const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    },
};

// Modern Sort Listbox Component
function SortListbox({ sort, setSort }: { sort: SortOpt; setSort: (s: SortOpt) => void }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-medium hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                onClick={() => setOpen(!open)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span>{sort.charAt(0).toUpperCase() + sort.slice(1)}</span>
                <motion.svg
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
            </motion.button>

            {open && (
                <motion.ul
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute top-full left-0 mt-2 w-40 bg-zinc-900/95 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-[99999] overflow-hidden"
                    role="listbox"
                >
                    {["relevance", "newest", "oldest"].map((opt) => (
                        <motion.li
                            key={opt}
                            whileHover={{ backgroundColor: "rgba(139, 92, 246, 0.3)" }}
                            className={`px-4 py-3 cursor-pointer transition-all duration-150 ${sort === opt ? "bg-purple-600/50 text-white font-semibold" : "text-gray-300 hover:text-white"
                                }`}
                            role="option"
                            aria-selected={sort === opt}
                            onClick={() => {
                                setSort(opt as SortOpt);
                                setOpen(false);
                            }}
                        >
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                        </motion.li>
                    ))}
                </motion.ul>
            )}
        </div>
    );
}
