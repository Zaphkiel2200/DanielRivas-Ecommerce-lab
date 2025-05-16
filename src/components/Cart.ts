import { store } from "../flux/Store";
import { StoreActions, CartActions } from "../flux/Actions";

class Cart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    store.subscribe(this.handleStateChange.bind(this));
    this.render();
  }

  disconnectedCallback() {
    store.unsubscribe(this.handleStateChange.bind(this));
  }

  private handleStateChange = () => this.render();

  private handleRemoveItem(animeId: string) {
    CartActions.toggleCart(animeId);
  }

  private handleCheckout() {
    alert("Compra realizada con éxito!");
    CartActions.clearCart(); 
  }

  render() {
    if (!this.shadowRoot) return;
    const state = store.getState();
    const cartItems = state.cartItems || [];
    const animes = state.animes || [];

    const cartAnimes = animes.filter(anime => cartItems.includes(anime.mal_id));
    const total = cartAnimes.reduce((sum, anime) => sum + 9.99, 0);

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --primary-color: #ff9a00;
          --secondary-color: #ff6b00;
          --text-color: #333;
          --border-color: #ddd;
          --bg-color: #f5f5f5;
          display: block;
        }
        
        .cart-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.5rem;
        }
        
        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }
        
        .cart-title {
          font-size: 1.8rem;
          color: var(--text-color);
          margin: 0;
        }
        
        .back-button {
          padding: 0.5rem 1rem;
          background: var(--primary-color);
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .cart-items {
          display: grid;
          gap: 1.5rem;
        }
        
        .cart-item {
          display: flex;
          gap: 1.5rem;
          padding: 1rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background: white;
        }
        
        .cart-item-image {
          width: 100px;
          height: 140px;
          object-fit: cover;
          border-radius: 4px;
        }
        
        .cart-item-details {
          flex-grow: 1;
        }
        
        .cart-item-title {
          margin: 0;
          font-size: 1.2rem;
        }
        
        .cart-item-price {
          font-weight: bold;
          color: var(--primary-color);
          margin: 0.5rem 0;
        }
        
        .remove-button {
          padding: 0.5rem 1rem;
          background: #e74c3c;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .cart-summary {
          margin-top: 2rem;
          padding: 1.5rem;
          background: white;
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        
        .total {
          font-size: 1.2rem;
          font-weight: bold;
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
        }
        
        .checkout-button {
          width: 100%;
          padding: 1rem;
          background: var(--primary-color);
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1.1rem;
          cursor: pointer;
          margin-top: 1rem;
          transition: background 0.2s;
        }
        
        .checkout-button:hover {
          background: var(--secondary-color);
        }
        
        .empty-cart {
          text-align: center;
          padding: 2rem;
          background: white;
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }
        
        .browse-button {
          padding: 0.75rem 1.5rem;
          background: var(--primary-color);
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 1rem;
        }
      </style>
      
      <div class="cart-container">
        <div class="cart-header">
          <h2 class="cart-title">Tu Carrito</h2>
          <button class="back-button" id="backBtn">← Continuar Comprando</button>
        </div>
        
        ${cartAnimes.length > 0 ? `
          <div class="cart-items">
            ${cartAnimes.map(anime => `
              <div class="cart-item">
                <img class="cart-item-image" src="${anime.images.webp.large_image_url}" alt="${anime.title}">
                <div class="cart-item-details">
                  <h3 class="cart-item-title">${anime.title}</h3>
                  <p class="cart-item-price">$9.99</p>
                  <button class="remove-button" data-id="${anime.mal_id}">Eliminar</button>
                </div>
              </div>
            `).join("")}
          </div>
          
          <div class="cart-summary">
            <div class="summary-row">
              <span>Subtotal:</span>
              <span>$${total.toFixed(2)}</span>
            </div>
            <div class="summary-row">
              <span>Envío:</span>
              <span>Gratis</span>
            </div>
            <div class="summary-row total">
              <span>Total:</span>
              <span>$${total.toFixed(2)}</span>
            </div>
            <button class="checkout-button" id="checkoutBtn">Finalizar Compra</button>
          </div>
        ` : `
          <div class="empty-cart">
            <h3>Tu carrito está vacío</h3>
            <p>Agrega algunos animes para comenzar</p>
            <button class="browse-button" id="browseBtn">Explorar Animes</button>
          </div>
        `}
      </div>
    `;

    this.shadowRoot.querySelectorAll(".remove-button").forEach(button => {
      button.addEventListener("click", (e) => {
        const animeId = (e.target as HTMLElement).getAttribute("data-id");
        if (animeId) this.handleRemoveItem(animeId);
      });
    });

    const backBtn = this.shadowRoot.querySelector("#backBtn");
    if (backBtn) backBtn.addEventListener("click", () => StoreActions.navigate("home"));

    const browseBtn = this.shadowRoot.querySelector("#browseBtn");
    if (browseBtn) browseBtn.addEventListener("click", () => StoreActions.navigate("modifyGarden"));

    const checkoutBtn = this.shadowRoot.querySelector("#checkoutBtn");
    if (checkoutBtn) checkoutBtn.addEventListener("click", () => this.handleCheckout());
  }
}

export default Cart;