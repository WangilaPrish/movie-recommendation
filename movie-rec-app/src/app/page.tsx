import { fetchTrendingMovies } from "../lib/tmdb";

export default async function HomePage() {
    const data = await fetchTrendingMovies();
    const movies = data.results;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {movies.map((m: any) => (
                <div key={m.id} className="rounded shadow p-2">
                    <img src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} />
                    <p>{m.title}</p>
                </div>
            ))}
        </div>
    );
}
