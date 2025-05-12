export class MovieCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const movie = JSON.parse(this.getAttribute('movie') || '{}');
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
                    background: #e94560;
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
            this.dispatchEvent(new CustomEvent('add-to-cart', {
                detail: movie,
                bubbles: true
            }));
        });
    }
}

customElements.define('movie-card', MovieCard);