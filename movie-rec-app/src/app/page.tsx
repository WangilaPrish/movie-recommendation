import { fetchTrendingMovies } from "../lib/tmdb";
import HeroSection from "@/components/HeroSection";
import MovieGrid from "@/components/movies/MovieGrid";

// Force dynamic rendering to avoid build-time API calls
export const dynamic = 'force-dynamic';

export default async function HomePage() {
    let movies = [];
    
    try {
        const data = await fetchTrendingMovies();
        movies = data.results;
    } catch (error) {
        console.error("Failed to fetch movies:", error);
        // Provide fallback data for demonstration
        movies = [
            {
                id: 1,
                title: "Sample Movie 1",
                poster_path: "/sample1.jpg",
                overview: "This is a sample movie for demonstration purposes.",
                release_date: "2024-01-01",
                vote_average: 8.5
            },
            {
                id: 2,
                title: "Sample Movie 2", 
                poster_path: "/sample2.jpg",
                overview: "Another sample movie to show the layout.",
                release_date: "2024-02-01",
                vote_average: 7.8
            }
        ];
    }

    return (
        <>
            <HeroSection />
            <MovieGrid 
                movies={movies} 
                title="Trending Movies"
                showAnimation={true}
            />
        </>
    );
}
