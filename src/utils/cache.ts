// Estrategia 1: Cache First
export const cacheFirst = async (key: string, fetchFn: () => Promise<any>) => {
    const cachedData = getCachedData(key);
    if (cachedData) return cachedData;
    
    const freshData = await fetchFn();
    cacheData(key, freshData);
    return freshData;
};

// Estrategia 2: Stale-While-Revalidate
export const staleWhileRevalidate = async (key: string, fetchFn: () => Promise<any>) => {
    const cachedData = getCachedData(key);
    if (cachedData) {
        fetchFn().then(freshData => cacheData(key, freshData));
        return cachedData;
    }
    const freshData = await fetchFn();
    cacheData(key, freshData);
    return freshData;
};

// Funciones auxiliares
export const cacheData = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify({
        data,
        timestamp: Date.now()
    }));
};

export const getCachedData = (key: string) => {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    return data;
};