import { store } from "../flux/Store";
import { StoreActions } from "../flux/Actions";

class CardContainer extends HTMLElement {
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

  render() {
    if (!this.shadowRoot) return;
    const state = store.getState();
    const animes = state.animes || [];

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --primary-color: #ff9a00;
          --text-color: #333;
          --bg-color: #f5f5f5;
        }
        
        .container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          padding: 1.5rem;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .header {
          text-align: center;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: var(--primary-color);
          color: white;
          border-radius: 8px;
        }
        
        .header h1 {
          margin: 0;
          font-size: 1.8rem;
        }
        
        .loading {
          text-align: center;
          padding: 2rem;
          font-size: 1.2rem;
          color: var(--text-color);
        }
      </style>
      
      <div class="header">
        <h1>Top Animes</h1>
      </div>
      
      <div class="container">
        ${animes.length > 0 ? 
          animes.map(anime => `
            <anime-card
              mal_id="${anime.mal_id}"
              image="${anime.images.webp.large_image_url}"
              title="${anime.title}"
              score="${anime.score}">
            </anime-card>
          `).join("") 
          : 
          '<div class="loading">Loading animes...</div>'
        }
      </div>
    `;
  }
}

export default CardContainer;