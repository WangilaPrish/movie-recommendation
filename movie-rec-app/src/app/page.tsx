import HeroSection from "@/components/HeroSection";
import MovieGrid from "@/components/movies/MovieGrid";
import { fetchTrendingMovies } from "../lib/tmdb";

export default async function HomePage() {
    const data = await fetchTrendingMovies();
    const movies = data.results;

    return (
        <>
            <HeroSection />
            <main className="px-4 md:px-8 lg:px-16 -mt-10 mb-16">
                {/* MovieGrid is a client component that provides a modern interactive UI */}
                <MovieGrid movies={movies} />
            </main>
        </>
    );
}
