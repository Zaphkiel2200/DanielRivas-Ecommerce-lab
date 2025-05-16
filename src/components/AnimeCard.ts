import { store } from "../flux/Store";
import { StoreActions } from "../flux/Actions";

class AnimeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  private addToCart = () => {
    const id = this.getAttribute('id');
    if (id) StoreActions.addToCart(id);
  };

  render() {
    const title = this.getAttribute('title') || 'Anime';
    const image = this.getAttribute('image') || '';
    const price = this.getAttribute('price') || '0';

    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/styles/styles.css">
      <div class="card">
        <img src="${image}" alt="${title}">
        <div class="card-content">
          <h3>${title}</h3>
          <p>$${price}</p>
          <button id="addBtn">Añadir al carrito</button>
        </div>
      </div>
    `;

    this.shadowRoot.getElementById('addBtn')?.addEventListener('click', this.addToCart);
  }
}

export default AnimeCard; 