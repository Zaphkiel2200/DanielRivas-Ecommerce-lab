import { store } from "../flux/Store";
import { StoreActions } from "../flux/Actions";

class Cart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    store.subscribe(this.render.bind(this));
    this.render();
  }

  disconnectedCallback() {
    store.unsubscribe(this.render.bind(this));
  }

  private removeFromCart = (id: string) => {
    StoreActions.removeFromCart(id);
  };

  render() {
    if (!this.shadowRoot) return;
    const cart = store.getState().cart || [];
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/styles/styles.css">
      <div class="cart-container">
        <h2>Tu Carrito (${cart.length})</h2>
        ${cart.length === 0 ? 
          '<p>Tu carrito está vacío</p>' : 
          `
          <div class="grid">
            ${cart.map(item => `
              <div class="card">
                <img src="${item.image}" alt="${item.title}">
                <div class="card-content">
                  <h3>${item.title}</h3>
                  <p>$${item.price}</p>
                  <button data-id="${item.id}" class="removeBtn">Eliminar</button>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="total">
            <h3>Total: $${total.toFixed(2)}</h3>
          </div>
          `
        }
      </div>
    `;

    this.shadowRoot.querySelectorAll('.removeBtn').forEach(btn => {
      btn.addEventListener('click', () => this.removeFromCart(btn.getAttribute('data-id')!));
    });
  }
}

export default Cart;