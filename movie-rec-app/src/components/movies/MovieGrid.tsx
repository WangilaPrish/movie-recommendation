"use client";
import React, { useState } from "react";
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
}

export default function MovieGrid({ movies = [] }: Props) {
    const [favorites, setFavorites] = useState<number[]>([]);

    const toggleFavorite = (id: number) => {
        setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };

    return (
        <section id="movies" aria-label="Trending movies" className="mt-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl md:text-3xl font-extrabold">Trending Now</h2>
                <p className="text-sm text-gray-500 hidden md:block">Hover a poster to see details. Tap to favorite.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {movies.map((m) => (
                    <MovieCard
                        key={m.id}
                        movie={m}
                        isFavorite={favorites.includes(m.id)}
                        onToggleFavorite={() => toggleFavorite(m.id)}
                    />
                ))}
            </div>
        </section>
    );
}
