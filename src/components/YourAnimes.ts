import { store } from "../flux/Store";
import { StoreActions } from "../flux/Actions";

class YourAnimes extends HTMLElement {
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

  private handleStoreNameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    StoreActions.updateStoreName(input.value);
  }

  async render() {
    if (!this.shadowRoot) return;
    const state = store.getState();
    const cartItems = state.cartItems || [];
    const animes = state.animes || [];
    const storeName = state.storeName || "Anime Store";

    let yourAnimes = animes.filter(anime => cartItems.includes(anime.mal_id));
    yourAnimes = yourAnimes.sort((a, b) => b.score - a.score);

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --primary-color: #ff9a00;
          --secondary-color: #ff6b00;
          --text-color: #333;
          --border-color: #ddd;
          --bg-color: #f5f5f5;
        }
        
        .container {
          padding: 1.5rem;
          max-width: 1200px;
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
        
        .store-name {
          font-size: 1.8rem;
          margin: 0;
          cursor: pointer;
          transition: color 0.2s;
        }
        
        .store-name:hover {
          color: #ffeb3b;
        }
        
        .cart-summary {
          background: white;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-bottom: 1.5rem;
        }
        
        .animes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        
        .empty-cart {
          text-align: center;
          padding: 2rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .browse-btn {
          padding: 0.75rem 1.5rem;
          background: var(--primary-color);
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.2s;
          margin-top: 1rem;
        }
        
        .browse-btn:hover {
          background: var(--secondary-color);
        }
        
        .checkout-btn {
          padding: 0.75rem 1.5rem;
          background: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.2s;
          margin-top: 1rem;
          width: 100%;
        }
        
        .checkout-btn:hover {
          background: #388e3c;
        }
      </style>
      
      <div class="container">
        <div class="header">
          <h1 class="store-name">${storeName}</h1>
        </div>
        
        ${yourAnimes.length > 0 ? `
          <div class="cart-summary">
            <h2>Your Cart (${yourAnimes.length} items)</h2>
            <p>Total: $${(yourAnimes.length * 9.99).toFixed(2)}</p>
            <button class="checkout-btn">Proceed to Checkout</button>
          </div>
          
          <div class="animes-grid">
            ${yourAnimes.map(anime => `
              <anime-card
                mal_id="${anime.mal_id}"
                image="${anime.images.webp.large_image_url}"
                title="${anime.title}"
                score="${anime.score}">
              </anime-card>
            `).join("")}
          </div>
        ` : `
          <div class="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Start browsing our top animes collection!</p>
            <button class="browse-btn" id="browseBtn">Browse Animes</button>
          </div>
        `}
      </div>
    `;

    const storeNameElement = this.shadowRoot.querySelector(".store-name");
    if (storeNameElement) {
      storeNameElement.addEventListener("click", () => {
        const input = document.createElement("input");
        input.value = storeName;
        input.className = "store-name-input";
        input.style.fontSize = "1.8rem";
        input.style.textAlign = "center";
        input.style.width = "100%";
        input.style.border = "none";
        input.style.background = "transparent";
        input.style.color = "white";
        storeNameElement.replaceWith(input);
        input.focus();
        
        input.addEventListener("blur", () => {
          StoreActions.updateStoreName(input.value);
          input.replaceWith(storeNameElement);
          storeNameElement.textContent = input.value || "";
        });
        
        input.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            StoreActions.updateStoreName(input.value);
            input.replaceWith(storeNameElement);
            storeNameElement.textContent = input.value || "";
          }
        });
      });
    }

    const browseBtn = this.shadowRoot.querySelector("#browseBtn");
    if (browseBtn) {
      browseBtn.addEventListener("click", () => StoreActions.navigate("modifyGarden"));
    }
  }
}

export default YourAnimes;