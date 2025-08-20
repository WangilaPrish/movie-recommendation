import React from "react";
import MovieCard from "../MovieCard";

interface MovieGridProps {
    movies: Array<{
        id: number;
        title: string;
        poster_path: string;
        overview: string;
        release_date: string;
    }>;
    onFavorite?: (id: number) => void;
    favorites?: number[];
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onFavorite, favorites = [] }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onFavorite={onFavorite}
                    isFavorite={favorites.includes(movie.id)}
                />
            ))}
        </div>
    );
};

export default MovieGrid;
