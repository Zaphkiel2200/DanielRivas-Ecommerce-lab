class Header extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot!.innerHTML = `
            <style>
                header {
                    background: #1a1a2e;
                    color: white;
                    padding: 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .cart-btn {
                    background: #e94560;
                    color: white;
                    border: none;
                    padding: 8px 15px;
                    border-radius: 4px;
                    cursor: pointer;
                }
            </style>
            <header>
                <h1>Movie-Anime</h1>
                <button class="cart-btn">🛒 Carrito</button>
            </header>
        `;

        this.shadowRoot!.querySelector('.cart-btn')?.addEventListener('click', () => {
            Navigate('cart');
        });
    }
}

export default Header;