import { store } from "../flux/Store";
import { CartActions, StoreActions } from "../flux/Actions";

class BrowseAnimes extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    store.subscribe(this.handleStateChange.bind(this));
    const state = store.getState();
    if (!state.animes || state.animes.length === 0) {
      await StoreActions.loadAnimes();
    }
    this.render();
  }

  disconnectedCallback() {
    store.unsubscribe(this.handleStateChange.bind(this));
  }

  private handleStateChange = () => this.render();

  private handleToggleAnime(animeId: string) {
    CartActions.toggleCart(animeId);
  }

  async render() {
    if (!this.shadowRoot) return;
    const state = store.getState();
    const cartItems = state.cartItems || [];
    const animes = state.animes || [];

    this.shadowRoot.innerHTML = `
      <style>
        /* Estilos similares pero adaptados para animes */
        :host {
          --primary-color: #ff9a00;
          --secondary-color: #ff6b00;
          --background-color: #f8f9fa;
          --text-color: #333;
          --border-color: #ddd;
        }
        
        .browse-container {
          padding: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .back-button {
          padding: 0.75rem 1.5rem;
          background: var(--primary-color);
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-bottom: 1.5rem;
          font-weight: bold;
        }
        
        .header {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        
        .header h2 {
          color: var(--text-color);
          margin: 0;
          font-size: 1.8rem;
        }
        
        .animes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        
        .anime-card {
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
          background: white;
          transition: transform 0.2s;
        }
        
        .anime-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .anime-card img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 4px;
          margin-bottom: 0.5rem;
        }
        
        .anime-card h3 {
          margin: 0.5rem 0;
          color: var(--text-color);
          font-size: 1.1rem;
        }
        
        .anime-card .score {
          display: inline-block;
          background: var(--primary-color);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        
        .anime-button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 0.5rem;
          width: 100%;
          font-weight: bold;
          transition: background 0.2s;
        }
        
        .anime-button.add {
          background: var(--primary-color);
          color: white;
        }
        
        .anime-button.add:hover {
          background: var(--secondary-color);
        }
        
        .anime-button.remove {
          background: #e74c3c;
          color: white;
        }
        
        .anime-button.remove:hover {
          background: #c0392b;
        }
        
        .cart-link {
          display: inline-block;
          margin-left: 1rem;
          color: var(--primary-color);
          text-decoration: none;
          font-weight: bold;
        }
      </style>
      
      <div class="browse-container">
        <button class="back-button" id="backBtn">← Volver</button>
        <div class="header">
          <h2>Explorar Animes</h2>
        </div>
        <div class="animes-grid">
          ${animes.map(anime => {
            const isInCart = cartItems.includes(anime.mal_id);
            return `
              <div class="anime-card">
                <img src="${anime.images.webp.large_image_url}" alt="${anime.title}">
                <span class="score">⭐ ${anime.score || "N/A"}</span>
                <h3>${anime.title}</h3>
                <button class="anime-button ${isInCart ? "remove" : "add"}" 
                        data-id="${anime.mal_id}">
                  ${isInCart ? "Quitar del carrito" : "Añadir al carrito"}
                </button>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;

    this.shadowRoot.querySelectorAll("button[data-id]").forEach((button) => {
      button.addEventListener("click", (e) => {
        const animeId = (e.target as HTMLElement).getAttribute("data-id");
        if (animeId) this.handleToggleAnime(animeId);
      });
    });

    const backBtn = this.shadowRoot.querySelector("#backBtn");
    if (backBtn) backBtn.addEventListener("click", () => StoreActions.navigate("home"));
  }
}

export default BrowseAnimes;