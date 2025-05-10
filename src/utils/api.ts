import { cacheData, getCachedData } from './cache';

const API_URL = 'https://api.jikan.moe/v4/random/anime';

export const fetchAnimeProducts = async (count: number = 10): Promise<any[]> => {
    const products = [];
    for (let i = 0; i < count; i++) {
        const response = await fetch(API_URL);
        const data = await response.json();
        products.push(data.data);
    }
    return products;
};