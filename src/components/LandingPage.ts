import { fetchMovies } from '../../utils/api';
import store from '../../state/store';
import { addToCart } from '../../state/actions';

class LandingPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        this.renderLoading();
        
        try {
            const movies = await fetchMovies();
            store.dispatch({ type: 'SET_MOVIES', payload: movies });
            this.renderMovies(movies);
        } catch (error) {
            this.renderError();
        }
    }

    renderLoading() {
        this.shadowRoot!.innerHTML = `<p>Cargando animes...</p>`;
    }

    renderError() {
        this.shadowRoot!.innerHTML = `<p>Error al cargar animes</p>`;
    }

    renderMovies(movies: any[]) {
        this.shadowRoot!.innerHTML = `
            <style>
                .movie-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 20px;
                    padding: 20px;
                }
            </style>
            <div class="movie-grid">
                ${movies.map(movie => `
                    <movie-card 
                        movie='${JSON.stringify(movie).replace(/'/g, "\\'")}'
                    ></movie-card>
                `).join('')}
            </div>
        `;
    }
}

export default LandingPage;