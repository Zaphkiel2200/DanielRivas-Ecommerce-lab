export const cacheFirst = async (key: string, fetchFn: () => Promise<any>) => {
    const cachedData = getCachedData(key);
    if (cachedData) return cachedData;
    
    const freshData = await fetchFn();
    cacheData(key, freshData);
    return freshData;
};

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