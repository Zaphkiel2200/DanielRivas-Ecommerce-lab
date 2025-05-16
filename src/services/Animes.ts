import { Anime } from "../types/types";

const API_URL = "https://api.jikan.moe/v4/top/anime";

async function getAnimes(): Promise<Anime[]> {
  try {
    const cachedData = localStorage.getItem("animes_cache");
    const cacheTimestamp = localStorage.getItem("animes_cache_timestamp");
    
    if (cachedData && cacheTimestamp) {
      const now = new Date().getTime();
      const oneHour = 60 * 60 * 1000; 
      
      if (now - parseInt(cacheTimestamp) < oneHour) {
        return JSON.parse(cachedData);
      }
    }

    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const responseData = await response.json();
    const animes = responseData.data.slice(0, 20); 
    
    localStorage.setItem("animes_cache", JSON.stringify(animes));
    localStorage.setItem("animes_cache_timestamp", new Date().getTime().toString());
    
    return animes;
  } catch (error) {
    console.error("Error fetching data:", error);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    throw error;
  }
}

export default getAnimes;