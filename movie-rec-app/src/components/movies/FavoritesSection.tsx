import React from "react";
import MovieGrid from "./MovieGrid";

interface FavoritesSectionProps {
    movies: Array<{
        id: number;
        title: string;
        poster_path: string | null;
        overview: string;
        release_date: string;
    }>;
    onFavorite?: (id: number) => void;
    favorites?: number[];
}

const FavoritesSection: React.FC<FavoritesSectionProps> = ({ movies, onFavorite, favorites = [] }) => {
    if (!favorites.length) return null;
    const favoriteMovies = movies.filter((movie) => favorites.includes(movie.id));

    return (
        <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
            <MovieGrid movies={favoriteMovies} onToggleFavorite={onFavorite} favorites={favorites} />
        </section>
    );
};

export default FavoritesSection;
