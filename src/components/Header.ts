import Navigate from "../../utils/Navigate";

class Header extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot!.innerHTML = `
            <style>
                #header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: #2c3e50;
                    color: white;
                    padding: 15px 20px;
                    font-family: Arial, sans-serif;
                }
                h1 {
                    margin: 0;
                    cursor: pointer;
                }
                .buttons {
                    display: flex;
                    gap: 10px;
                }
                button {
                    background-color: #3498db;
                    color: white;
                    border: none;
                    padding: 8px 15px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                }
                button:hover {
                    background-color: #2980b9;
                }
                .cart-count {
                    background-color: #e74c3c;
                    color: white;
                    border-radius: 50%;
                    padding: 2px 6px;
                    font-size: 12px;
                    margin-left: 5px;
                }
            </style>
            <div id="header">
                <h1 id="landing">Anime Store</h1>
                <div class="buttons">
                    <button id="home" navigate-to="/">Inicio</button>
                    <button id="cart" navigate-to="/cart">Carrito <span id="cart-count" class="cart-count">0</span></button>
                </div>
            </div>
        `;

        this.shadowRoot!.querySelectorAll('button').forEach((button) => {
            button.addEventListener('click', () => {
                const path = button.getAttribute('navigate-to');
                if (path) {
                    Navigate(path);
                }
            });
        });

        this.shadowRoot!.getElementById('landing')?.addEventListener('click', () => {
            Navigate('/');
        });

        this.updateCartCount();
        window.addEventListener('cart-updated', () => this.updateCartCount());
    }

    updateCartCount() {
        const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
        const countElement = this.shadowRoot!.getElementById('cart-count');
        if (countElement) {
            countElement.textContent = cart.length.toString();
        }
    }
}

export default Header;