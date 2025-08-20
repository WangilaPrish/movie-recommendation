"use client";
import React, { useEffect, useState } from "react";
import MovieGrid from "./MovieGrid";
import FavoritesSection from "./FavoritesSection";

interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    overview?: string;
    release_date?: string;
}

export default function MoviesShell({ movies }: { movies: Movie[] }) {
    const [favorites, setFavorites] = useState<number[]>(() => {
        try {
            const raw = localStorage.getItem("favorites");
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem("favorites", JSON.stringify(favorites));
        } catch (e) {}
    }, [favorites]);

    const toggleFavorite = (id: number) => {
        setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };

    return (
        <div>
            <FavoritesSection movies={movies} favorites={favorites} onFavorite={toggleFavorite} />
            <MovieGrid movies={movies} favorites={favorites} onToggleFavorite={toggleFavorite} />
        </div>
    );
}
