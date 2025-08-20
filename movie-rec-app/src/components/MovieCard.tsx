import React from "react";

interface MovieCardProps {
    movie: {
        id: number;
        title: string;
        poster_path: string;
        overview: string;
        release_date: string;
    };
    onFavorite?: (id: number) => void;
    isFavorite?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onFavorite, isFavorite }) => {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 flex flex-col items-center w-64 hover:scale-105 transition-transform">
            <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg mb-2 w-full h-80 object-cover"
            />
            <h3 className="text-lg font-bold mb-1 text-center">{movie.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-3">{movie.overview}</p>
            <span className="text-xs text-gray-500 mb-2">Release: {movie.release_date}</span>
            {onFavorite && (
                <button
                    className={`mt-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${isFavorite ? "bg-red-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}`}
                    onClick={() => onFavorite(movie.id)}
                >
                    {isFavorite ? "Remove Favorite" : "Add to Favorites"}
                </button>
            )}
        </div>
    );
};

export default MovieCard;
