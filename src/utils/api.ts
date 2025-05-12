import { cacheFirst, staleWhileRevalidate } from './cache';

const API_URL = 'https://api.jikan.moe/v4/top/anime?type=movie';

export const fetchMovies = async () => {
    return cacheFirst('movies', async () => {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("API Error");
        const data = await response.json();
        return data.data.slice(0, 12); 
    });
};

export const searchMovies = async (query: string) => {
    return staleWhileRevalidate(`search-${query}`, async () => {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&type=movie`);
        if (!response.ok) throw new Error("API Error");
        const data = await response.json();
        return data.data;
    });
};