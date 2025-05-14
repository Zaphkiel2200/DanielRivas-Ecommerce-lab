class CartPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        window.addEventListener('cart-updated', () => this.render());
    }

    render() {
        const cartItems = JSON.parse(sessionStorage.getItem('cart') || '[]');
        
        this.shadowRoot!.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 20px;
                    font-family: Arial, sans-serif;
                }
                h2 {
                    color: #333;
                    text-align: center;
                }
                .cart-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 15px;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                }
                .cart-item img {
                    width: 80px;
                    height: 120px;
                    object-fit: cover;
                    margin-right: 15px;
                }
                .cart-item-info {
                    flex-grow: 1;
                }
                .cart-item-title {
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                .empty-cart {
                    text-align: center;
                    color: #666;
                    margin-top: 50px;
                }
                .back-button {
                    display: block;
                    margin: 20px auto;
                    padding: 10px 20px;
                    background-color: #6c757d;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .back-button:hover {
                    background-color: #5a6268;
                }
            </style>
            <h2>Tu Carrito de Anime</h2>
            ${cartItems.length > 0 ? 
                cartItems.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.title}">
                        <div class="cart-item-info">
                            <div class="cart-item-title">${item.title}</div>
                            <div>⭐ ${item.score}</div>
                        </div>
                    </div>
                `).join('') : 
                '<div class="empty-cart">No hay items en tu carrito</div>'
            }
            <button class="back-button" id="back-to-landing">Volver a la tienda</button>
        `;

        this.shadowRoot!.getElementById('back-to-landing')?.addEventListener('click', () => {
            Navigate('/');
        });
    }
}

export default CartPage;