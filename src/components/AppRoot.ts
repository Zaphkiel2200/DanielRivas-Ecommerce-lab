import './LandingPage';
import './CartPage';

class AppRoot extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['page'];
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const page = this.getAttribute('page') || 'landing';
        this.shadowRoot!.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: Arial, sans-serif;
                }
                app-header {
                    display: block;
                }
            </style>
            <app-header></app-header>
            ${page === 'landing' ? '<landing-page></landing-page>' : '<cart-page></cart-page>'}
        `;
    }
}

export default AppRoot;