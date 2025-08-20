import { NextResponse } from 'next/server';

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  try {
    const r = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    if (!r.ok) {
      const text = await r.text();
      return NextResponse.json({ error: 'TMDB error', details: text }, { status: 502 });
    }
    const json = await r.json();
    return NextResponse.json(json);
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}
