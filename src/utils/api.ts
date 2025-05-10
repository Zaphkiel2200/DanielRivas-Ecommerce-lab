export const fetchRandomAnimes = async (count: number = 6): Promise<any[]> => {
    const promises = [];
    
    for (let i = 0; i < count; i++) {
        promises.push(
            fetch('https://api.jikan.moe/v4/random/anime')
                .then(response => response.json())
                .then(data => data.data)
        );
    }
    
    return Promise.all(promises);
};