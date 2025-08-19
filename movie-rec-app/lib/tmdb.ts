// lib/tmdb.ts
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Server-side headers (for when using the Read Access Token)
const AUTH_HEADERS = {
  Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
};

export async function fetchTrendingMovies() {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`, {
    next: { revalidate: 3600 }, // cache for 1h
  });

  if (!res.ok) throw new Error("Failed to fetch trending movies");

  return res.json();
}

export async function fetchMovieDetails(id: string) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Failed to fetch movie details");

  return res.json();
}
