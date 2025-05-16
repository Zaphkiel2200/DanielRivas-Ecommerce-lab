import { store } from "../flux/Store";
import { CartActions } from "../flux/Actions";

class AnimeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  private handleAddClick = () => {
    const mal_id = this.getAttribute("mal_id");
    if (mal_id) CartActions.toggleCart(mal_id);
  };

  render() {
    const image = this.getAttribute("image") || "https://placehold.co/300x400?text=Anime+Image";
    const title = this.getAttribute("title") || "Anime desconocido";
    const score = this.getAttribute("score") || "N/A";
    const mal_id = this.getAttribute("mal_id");
    const state = store.getState();
    const isInCart = mal_id ? state.cartItems.includes(Number(mal_id)) : false;

    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --primary-color: #ff9a00;
          --secondary-color: #ff6b00;
          --text-color: #333;
          --border-color: #ddd;
          --card-bg: #fff;
          display: block;
          transition: transform 0.2s;
        }
        
        :host(:hover) {
          transform: translateY(-5px);
        }
        
        .container {
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
          background: var(--card-bg);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 4px;
          margin-bottom: 0.5rem;
        }
        
        h3 {
          margin: 0.5rem 0;
          color: var(--text-color);
          font-size: 1.1rem;
          flex-grow: 1;
        }
        
        .score {
          display: inline-block;
          background: var(--primary-color);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        
        button {
          padding: 0.5rem 1rem;
          background: ${isInCart ? "#e74c3c" : "var(--primary-color)"};
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          width: 100%;
          font-weight: bold;
          transition: background 0.2s;
        }
        
        button:hover {
          background: ${isInCart ? "#c0392b" : "var(--secondary-color)"};
        }
      </style>
      
      <div class="container">
        <img src="${image}" alt="${title}">
        <span class="score">⭐ ${score}</span>
        <h3>${title}</h3>
        <button id="cartBtn">${isInCart ? "Remove from Cart" : "Add to Cart"}</button>
      </div>
    `;

    const cartButton = this.shadowRoot.querySelector("#cartBtn");
    if (cartButton) cartButton.addEventListener("click", this.handleAddClick);
  }
}

export default AnimeCard;