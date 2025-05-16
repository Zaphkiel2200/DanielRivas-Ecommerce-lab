import { store } from "../flux/Store";
import { StoreActions } from "../flux/Actions";

class Root extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    store.load();
    store.subscribe(this.handleStateChange.bind(this));
    this.addEventListener(
      "navigate",
      this.handleNavigation.bind(this) as EventListener
    );

    await StoreActions.loadAnimes();
    this.render();
  }

  private handleStateChange = () => {
    this.render();
  };

  private handleNavigation(event: CustomEvent) {
    if (event.detail && event.detail.page) {
      StoreActions.navigate(event.detail.page);
    }
  }

  render() {
    if (!this.shadowRoot) return;

    const state = store.getState();
    const storeName = state.storeName || "Anime Store";
    const currentPage = state.currentPage || "home";
    const cartCount = state.cartItems.length;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          --primary-color: #ff9a00;
          --secondary-color: #ff6b00;
          --text-color: #333;
          --light-color: #f8f9fa;
          --border-color: #ddd;
        }
        
        header {
          background: linear-gradient(135deg, #ff9a00, #ff6b00);
          color: white;
          padding: 1.5rem;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        h1 {
          margin: 0;
          font-size: 2rem;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
        }
        
        nav {
          display: flex;
          justify-content: center;
          background: white;
          padding: 1rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        nav button {
          padding: 0.75rem 1.5rem;
          margin: 0 0.5rem;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-color);
          border-bottom: 3px solid transparent;
          font-weight: 600;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        nav button.active {
          color: var(--primary-color);
          border-bottom: 3px solid var(--primary-color);
        }
        
        nav button:hover {
          color: var(--secondary-color);
        }
        
        .cart-count {
          background: var(--primary-color);
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
        }
        
        main {
          padding: 1.5rem;
          min-height: calc(100vh - 200px);
          background: var(--light-color);
        }
        
        @media (max-width: 768px) {
          nav {
            flex-wrap: wrap;
          }
          
          nav button {
            padding: 0.5rem;
            font-size: 0.9rem;
            margin: 0.25rem;
          }
        }
      </style>
      
      <header>
        <h1>${storeName}</h1>
      </header>
      
      <nav>
        <button id="homeBtn" class="${currentPage === "home" ? "active" : ""}">
          Home
        </button>
        <button id="modifyGardenBtn" class="${currentPage === "modifyGarden" ? "active" : ""}">
          Browse Animes ${cartCount > 0 ? `<span class="cart-count">${cartCount}</span>` : ''}
        </button>
        <button id="adminBtn" class="${currentPage === "admin" ? "active" : ""}">
          Admin
        </button>
      </nav>
      
      <main>
        ${this.renderPage(currentPage)}
      </main>
    `;

    this.setupNavigation();
  }

  private setupNavigation() {
    const homeBtn = this.shadowRoot?.querySelector("#homeBtn");
    const modifyGardenBtn = this.shadowRoot?.querySelector("#modifyGardenBtn");
    const adminBtn = this.shadowRoot?.querySelector("#adminBtn");

    homeBtn?.addEventListener("click", () => StoreActions.navigate("home"));
    modifyGardenBtn?.addEventListener("click", () => StoreActions.navigate("modifyGarden"));
    adminBtn?.addEventListener("click", () => StoreActions.navigate("admin"));
  }

  private renderPage(currentPage: string) {
  switch (currentPage) {
    case "home":
      return "<your-animes></your-animes>";
    case "modifyGarden":
      return "<card-container></card-container>";
    case "cart": 
      return "<anime-cart></anime-cart>";
    case "admin":
      return "<admin-modify-animes></admin-modify-animes>";
    default:
      return "<p>Page not found</p>";
  }
}
}

export default Root;