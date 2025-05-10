import { fetchRandomAnimes } from './utils/api';

const exploreBtn = document.getElementById('explore-btn');
const animeGrid = document.getElementById('anime-grid');

const displayAnimes = async () => {
    try {
        const animes = await fetchRandomAnimes(6);
        
        const animeHTML = animes.map(anime => `
            <div class="anime-card">
                <img src="${anime.images?.jpg?.image_url || 'https://via.placeholder.com/300x400'}" 
                     alt="${anime.title}" 
                     class="anime-image">
                <div class="anime-info">
                    <h3 class="anime-title">${anime.title}</h3>
                    <p class="anime-synopsis">${anime.synopsis || 'Descripción no disponible'}</p>
                </div>
            </div>
        `).join('');
        
        if (animeGrid) {
            animeGrid.innerHTML = animeHTML;
            animeGrid.style.display = 'grid';
        }
    } catch (error) {
        console.error('Error al cargar animes:', error);
        if (animeGrid) {
            animeGrid.innerHTML = '<p>Error al cargar los animes. Intenta nuevamente.</p>';
            animeGrid.style.display = 'block';
        }
    }
};

if (exploreBtn && animeGrid) {
    exploreBtn.addEventListener('click', displayAnimes);
}