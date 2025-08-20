"use client";
import MovieGrid from '@/components/movies/MovieGrid';
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

    if (loading) return <p className="p-6">Loading favorites...</p>;
    if (!favorites.length) return <p className="p-6">You have no favorites yet.</p>;

    return (
        <main className="px-6 py-8">
            <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>
            <MovieGrid movies={movies} />
        </main>
    );
}
