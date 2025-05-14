class LandingPage extends HTMLElement {
    private animes: any[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        await this.fetchAnimes();
        this.render();
        this.setupEventListeners();
    }

    async fetchAnimes() {
        const cachedAnimes = sessionStorage.getItem('cached-animes');
        const cacheTimestamp = sessionStorage.getItem('animes-cache-timestamp');
        const oneHour = 60 * 60 * 1000;
        
        if (cachedAnimes && cacheTimestamp && (Date.now() - Number(cacheTimestamp) < oneHour)) {
            this.animes = JSON.parse(cachedAnimes);
            return;
        }

        try {
            const response = await fetch('https://api.jikan.moe/v4/top/anime');
            const data = await response.json();
            this.animes = data.data.slice(0, 12); 
            sessionStorage.setItem('cached-animes', JSON.stringify(this.animes));
            sessionStorage.setItem('animes-cache-timestamp', Date.now().toString());
        } catch (error) {
            console.error('Error fetching animes:', error);
            if (cachedAnimes) {
                this.animes = JSON.parse(cachedAnimes);
            } else {
                this.animes = [];
            }
        }
    }

    render() {
        this.shadowRoot!.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 20px;
                    font-family: Arial, sans-serif;
                }
                h1 {
                    color: #333;
                    text-align: center;
                }
                .anime-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                    gap: 20px;
                    padding: 20px;
                }
                .cart-button {
                    display: block;
                    margin: 20px auto;
                    padding: 10px 20px;
                    background-color: #28a745;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .cart-button:hover {
                    background-color: #218838;
                }
            </style>
            <h1>Top Animes</h1>
            <button class="cart-button" id="view-cart">Ver Carrito</button>
            <div class="anime-grid">
                ${this.animes.map(anime => `
                    <anime-card 
                        title="${anime.title}" 
                        image="${anime.images.jpg.image_url}" 
                        score="${anime.score}" 
                        mal-id="${anime.mal_id}"
                    ></anime-card>
                `).join('')}
            </div>
        `;
    }

    setupEventListeners() {
        this.shadowRoot!.getElementById('view-cart')?.addEventListener('click', () => {
            Navigate('/cart');
        });

        this.shadowRoot!.addEventListener('add-to-cart', (e: CustomEvent) => {
            const item = e.detail;
            let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
            
            if (!cart.some((i: any) => i.malId === item.malId)) {
                cart.push(item);
                sessionStorage.setItem('cart', JSON.stringify(cart));
                
                window.dispatchEvent(new CustomEvent('cart-updated'));
            }
        });
    }
}

export default LandingPage;