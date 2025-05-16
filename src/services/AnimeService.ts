import { Anime } from "../types/types";

export async function getAnimes(): Promise<Anime[]> {
  try {
    // Cache with Timestamp
    const cachedAnimes = localStorage.getItem('cached_animes');
    const lastFetch = localStorage.getItem('last_fetch');
    
    if (cachedAnimes && lastFetch && (Date.now() - Number(lastFetch)) < 3600000) {
      return JSON.parse(cachedAnimes);
    }
    
    // Network request to Jikan API
    const response = await fetch('https://api.jikan.moe/v4/top/anime?limit=12');
    if (!response.ok) throw new Error('Error fetching animes');
    
    const data = await response.json();
    const animes: Anime[] = data.data.map((item: any) => ({
      id: item.mal_id,
      title: item.title,
      image: item.images?.jpg?.image_url || '',
      price: Math.floor(Math.random() * 50) + 10, // Precio aleatorio entre 10 y 60
      rating: item.score,
      description: item.synopsis || 'No description available',
      episodes: item.episodes || 0
    }));
    
    localStorage.setItem('cached_animes', JSON.stringify(animes));
    localStorage.setItem('last_fetch', Date.now().toString());
    
    return animes;
  } catch (error) {
    console.error("Error fetching animes:", error);
    throw error;
  }
}