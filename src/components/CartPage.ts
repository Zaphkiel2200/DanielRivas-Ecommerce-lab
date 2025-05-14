import store from '../../state/store';

class CartPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.unsubscribe = store.subscribe(() => this.render());
    }

    disconnectedCallback() {
        this.unsubscribe?.();
    }

    render() {
        const state = store.getState();
        this.shadowRoot!.innerHTML = `
            <style>
                .cart-container {
                    padding: 20px;
                }
                .cart-item {
                    display: flex;
                    margin-bottom: 15px;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 15px;
                }
                .cart-item img {
                    width: 80px;
                    height: 120px;
                    object-fit: cover;
                    margin-right: 15px;
                }
                .back-btn {
                    margin: 20px;
                    padding: 10px 15px;
                    background: #1a1a2e;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
            </style>
            <div class="cart-container">
                <button class="back-btn">← Volver a Animes</button>
                <h2>Tu Carrito</h2>
                ${state.cart.length > 0 ? 
                    state.cart.map(item => `
                        <div class="cart-item">
                            <img src="${item.images.jpg.image_url}" alt="${item.title}">
                            <div>
                                <h3>${item.title}</h3>
                                <p>Cantidad: ${item.quantity}</p>
                            </div>
                        </div>
                    `).join('') :
                    '<p>El carrito está vacío</p>'
                }
            </div>
        `;

        this.shadowRoot!.querySelector('.back-btn')?.addEventListener('click', () => {
            Navigate('landing');
        });
    }
}

export default CartPage;