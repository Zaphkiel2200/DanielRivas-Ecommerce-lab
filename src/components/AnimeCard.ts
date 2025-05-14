class AnimeCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const title = this.getAttribute('title') || 'Anime';
        const image = this.getAttribute('image') || 'https://via.placeholder.com/200x300';
        const score = this.getAttribute('score') || '0';
        const malId = this.getAttribute('mal-id') || '0';

        this.shadowRoot!.innerHTML = `
            <style>
                .anime-card {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 10px;
                    margin: 10px;
                    width: 200px;
                    background-color: #fff;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    transition: transform 0.2s;
                }
                .anime-card:hover {
                    transform: translateY(-5px);
                }
                .anime-image {
                    width: 100%;
                    height: 250px;
                    object-fit: cover;
                    border-radius: 4px;
                }
                .anime-title {
                    font-weight: bold;
                    margin: 10px 0;
                    color: #333;
                    font-size: 16px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .anime-score {
                    color: #ff851b;
                    font-weight: bold;
                }
                .add-to-cart {
                    background-color: #007bff;
                    color: white;
                    border: none;
                    padding: 8px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    width: 100%;
                    margin-top: 10px;
                }
                .add-to-cart:hover {
                    background-color: #0056b3;
                }
            </style>
            <div class="anime-card">
                <img class="anime-image" src="${image}" alt="${title}">
                <div class="anime-title">${title}</div>
                <div class="anime-score">⭐ ${score}</div>
                <button class="add-to-cart" data-mal-id="${malId}">Agregar al carrito</button>
            </div>
        `;

        this.shadowRoot!.querySelector('.add-to-cart')?.addEventListener('click', () => {
            const event = new CustomEvent('add-to-cart', {
                detail: {
                    malId,
                    title,
                    image,
                    score
                },
                bubbles: true,
                composed: true
            });
            this.dispatchEvent(event);
        });
    }
}

export default AnimeCard;