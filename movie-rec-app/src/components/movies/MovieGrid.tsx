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
    onFavorite?: (id: number) => void; // alias for callers using different name
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

    // persist favorites to localStorage whenever they change
    useEffect(() => {
        try {
            // Only persist when uncontrolled (no favProp passed)
            if (!favProp) localStorage.setItem("favorites", JSON.stringify(favorites));
        } catch (e) {
            // ignore write errors (e.g., storage disabled)
        }
    }, [favorites, favProp]);

    const toggleFavorite = (id: number) => {
        // If controlled via props, call parent callback
        if (favProp && (onToggleFavorite || onFavorite)) {
            (onToggleFavorite || onFavorite)!(id);
            return;
        }

        setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };

    // UI controls: search, sort, view
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

    // ensure anchor scroll offsets account for sticky nav height
    useEffect(() => {
        const updateOffset = () => {
            const nav = document.querySelector('nav') as HTMLElement | null;
            const el = document.getElementById('movies');
            const navHeight = (nav?.offsetHeight ?? 0);
            // add small extra gap so the heading isn't flush against the nav
            const offset = Math.max(64, navHeight + 12);
            if (el) el.style.scrollMarginTop = `${offset}px`;
        };

        // run on mount and when window resizes
        updateOffset();
        window.addEventListener('resize', updateOffset);
        return () => window.removeEventListener('resize', updateOffset);
    }, []);

    return (
        <section id="movies" aria-label="Trending movies" className="mt-8 pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">Trending Now</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 hidden md:block mt-1">Hover a poster to see details. Tap to favorite.</p>
                </div>

                {/* toolbar: frosted glass container */}
                <div className="ml-auto w-full sm:w-auto">
                    <div className="flex items-center gap-3 bg-black/40 backdrop-blur-sm border border-white/6 rounded-xl px-3 py-2 shadow-sm">
                        <label className="relative flex-1 sm:flex-none" htmlFor="movie-search">
                            <input
                                id="movie-search"
                                type="search"
                                placeholder="Search movies..."
                                className="w-full sm:w-72 py-2 pl-10 pr-3 rounded-lg bg-transparent text-sm placeholder:text-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                aria-label="Search movies by title"
                            />
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.35-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </label>

                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value as SortOpt)}
                            className="bg-white/5 text-sm py-2 px-3 rounded-lg text-gray-900 dark:text-white"
                            aria-label="Sort movies"
                        >
                            <option value="relevance">Relevance</option>
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                        </select>

                        <div className="inline-flex items-center rounded-lg p-1 bg-gradient-to-r from-purple-700/30 to-indigo-700/20">
                            <button
                                onClick={() => setView("grid")}
                                aria-pressed={view === "grid"}
                                className={`p-2 rounded-md ${view === "grid" ? "bg-purple-600 text-white shadow" : "text-gray-700 dark:text-white/80"}`}
                                title="Grid view"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="8" height="8" strokeWidth="1.5" /><rect x="13" y="3" width="8" height="8" strokeWidth="1.5" /><rect x="3" y="13" width="8" height="8" strokeWidth="1.5" /><rect x="13" y="13" width="8" height="8" strokeWidth="1.5" /></svg>
                            </button>
                            <button
                                onClick={() => setView("list")}
                                aria-pressed={view === "list"}
                                className={`p-2 rounded-md ${view === "list" ? "bg-purple-600 text-white shadow" : "text-gray-700 dark:text-white/80"}`}
                                title="List view"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </button>
                        </div>

                        <div className="ml-2 hidden sm:inline-flex items-center bg-white/6 text-sm text-gray-700 dark:text-white/90 rounded-full px-3 py-1">
                            <span className="font-medium mr-2">Showing</span>
                            <span className="bg-white/10 px-2 py-0.5 rounded-full text-xs">{filtered.length}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-300 ml-2">of {movies.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-3 text-sm text-gray-600 dark:text-gray-400">Showing {filtered.length} of {movies.length}</div>

            <motion.div
                layout
                initial="hidden"
                animate="visible"
                variants={container}
                className={view === "grid" ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6" : "flex flex-col gap-4"}
            >
                {filtered.map((m, i) => (
                    <motion.div key={m.id ?? `movie-${i}`} variants={item} whileHover={{ y: -6 }} whileTap={{ scale: 0.98 }} className="will-change-transform">
                        <MovieCard
                            movie={m}
                            isFavorite={(favProp ?? favorites).includes(m.id)}
                            onToggleFavorite={() => toggleFavorite(m.id)}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}

// local component state/types/variants
type SortOpt = "relevance" | "newest" | "oldest";

const item: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.36 } },
};

const container: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.04 } },
};
