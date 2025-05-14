import AppRoot from './components/AppRoot';
import LandingPage from './components/LandingPage';
import CartPage from './components/CartPage';

customElements.define('app-root', AppRoot);
customElements.define('landing-page', LandingPage);
customElements.define('cart-page', CartPage);

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const initialPage = path === '/cart' ? 'cart' : 'landing';
    document.body.innerHTML = '<app-root page="' + initialPage + '"></app-root>';
});