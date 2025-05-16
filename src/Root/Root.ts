import { store } from "../flux/Store";
import { StoreActions } from "../flux/Actions";

class Root extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    store.subscribe(this.handleStateChange.bind(this));
    await StoreActions.loadAnimes();
    this.render();
  }

  private handleStateChange = () => this.render();

  render() {
    if (!this.shadowRoot) return;
    const currentPage = store.getState().currentPage || "catalog";

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/styles/styles.css">
      
      <header>
        <h1>Anime Store</h1>
      </header>
      
      <nav>
        <button class="${currentPage === "catalog" ? "active" : ""}" id="catalogBtn">Catálogo</button>
        <button class="${currentPage === "cart" ? "active" : ""}" id="cartBtn">Carrito (${store.getState().cart.length})</button>
      </nav>
      
      <main>
        ${currentPage === "catalog" ? 
          "<anime-catalog></anime-catalog>" : 
          "<shopping-cart></shopping-cart>"}
      </main>
    `;

    this.shadowRoot.getElementById("catalogBtn")?.addEventListener("click", 
      () => StoreActions.navigate("catalog"));
    this.shadowRoot.getElementById("cartBtn")?.addEventListener("click", 
      () => StoreActions.navigate("cart"));
  }
}

export default Root;