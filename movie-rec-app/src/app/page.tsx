import HeroSection from "@/components/HeroSection";
import MoviesShell from "@/components/movies/MoviesShell";
import { fetchTrendingMovies } from "../lib/tmdb";

export default async function HomePage() {
    const data = await fetchTrendingMovies();
    const movies = data.results;

    return (
        <>
            <HeroSection />
            <main className="px-4 md:px-8 lg:px-16 -mt-10 mb-16">
                {/* MoviesShell is a client component that manages favorites and renders the grid + favorites */}
                <MoviesShell movies={movies} />
            </main>
        </>
    );
}
