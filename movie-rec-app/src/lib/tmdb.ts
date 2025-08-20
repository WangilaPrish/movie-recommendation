// lib/tmdb.ts
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchTrendingMovies() {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`, {
    next: { revalidate: 3600 }, // cache for 1 hour
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error("TMDB fetch error:", errorText);
    throw new Error("Failed to fetch trending movies");
  }
  return res.json();
}

export async function fetchMovieDetails(id: string) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
}
