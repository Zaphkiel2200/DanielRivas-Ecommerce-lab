import { store } from "../flux/Store";
import { StoreActions } from "../flux/Actions";

class AnimeCard extends HTMLElement {
  private animeId: string | null = null;
  private animeTitle: string = '';
  private animeImage: string = '';
  private animePrice: string = '0';
  private isInCart: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ['id', 'title', 'image', 'price'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'id':
        this.animeId = newValue;
        break;
      case 'title':
        this.animeTitle = newValue;
        break;
      case 'image':
        this.animeImage = newValue;
        break;
      case 'price':
        this.animePrice = newValue;
        break;
    }

    this.updateCartStatus();
    this.render();
  }

  connectedCallback() {
    store.subscribe(this.updateCartStatus.bind(this));
    this.render();
  }

  disconnectedCallback() {
    store.unsubscribe(this.updateCartStatus.bind(this));
  }

  private updateCartStatus() {
    if (!this.animeId) return;
    const cart = store.getState().cart;
    this.isInCart = cart.some(item => item.id.toString() === this.animeId);
  }

  private handleAddToCart = () => {
    if (this.animeId) {
      if (this.isInCart) {
        StoreActions.removeFromCart(this.animeId);
      } else {
        StoreActions.addToCart(this.animeId);
      }
    }
  };

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/styles/styles.css">
      <div class="card">
        <img src="${this.animeImage}" alt="${this.animeTitle}" loading="lazy">
        <div class="card-content">
          <h3>${this.animeTitle}</h3>
          <p>$${this.animePrice}</p>
          <button id="cartBtn">
            ${this.isInCart ? 'Remover del carrito' : 'Añadir al carrito'}
          </button>
        </div>
      </div>
    `;

    const cartButton = this.shadowRoot.getElementById('cartBtn');
    if (cartButton) {
      cartButton.addEventListener('click', this.handleAddToCart);
    }
  }
}

customElements.define('anime-card', AnimeCard);
export default AnimeCard;