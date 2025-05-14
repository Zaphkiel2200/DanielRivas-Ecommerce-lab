import { addToCart } from '../../state/actions';
import store from '../../state/store';

class MovieCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const movie = JSON.parse(this.getAttribute('movie') || {};
        this.render(movie);
    }

    render(movie: any) {
        this.shadowRoot!.innerHTML = `
            <style>
                .card {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    overflow: hidden;
                    transition: transform 0.3s;
                }
                .card:hover {
                    transform: translateY(-5px);
                }
                .card-img {
                    width: 100%;
                    height: 300px;
                    object-fit: cover;
                }
                .card-body {
                    padding: 15px;
                }
                .add-to-cart {
                    background: #0f3460;
                    color: white;
                    border: none;
                    padding: 8px 15px;
                    border-radius: 4px;
                    cursor: pointer;
                    width: 100%;
                }
            </style>
            <div class="card">
                <img src="${movie.images?.jpg?.image_url}" class="card-img" alt="${movie.title}">
                <div class="card-body">
                    <h3>${movie.title}</h3>
                    <button class="add-to-cart">Añadir al carrito</button>
                </div>
            </div>
        `;

        this.shadowRoot!.querySelector('.add-to-cart')?.addEventListener('click', () => {
            store.dispatch(addToCart(movie));
        });
    }
}

export default MovieCard;