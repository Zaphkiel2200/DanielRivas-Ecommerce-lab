import { store } from "../flux/Store";
import { StoreActions } from "../flux/Actions";

class AdminModifyAnimes extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        h2 {
          color: #333;
          text-align: center;
        }
        
        .admin-message {
          text-align: center;
          padding: 2rem;
          background: #f8f9fa;
          border-radius: 8px;
        }
      </style>
      
      <div>
        <h2>Admin Panel</h2>
        <div class="admin-message">
          <p>Área de administración para modificar animes</p>
        </div>
      </div>
    `;
  }
}

export default AdminModifyAnimes;