import { store } from "../flux/Store";

class AnimeCatalog extends HTMLElement {
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

  render() {
    if (!this.shadowRoot) return;
    const animes = store.getState().animes || [];

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/styles/styles.css">
      <div class="grid">
        ${animes.map(anime => `
          <anime-card
            id="${anime.id}"
            title="${anime.title}"
            image="${anime.image}"
            price="${anime.price}"
          ></anime-card>
        `).join('')}
      </div>
    `;
  }
}

customElements.define('anime-catalog', AnimeCatalog);
export default AnimeCatalog;