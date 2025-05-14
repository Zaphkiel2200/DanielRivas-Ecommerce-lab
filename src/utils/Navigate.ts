import store from '../state/store';
import { navigate } from '../state/actions';

export function Navigate(page: 'landing' | 'cart') {
    store.dispatch(navigate(page));
    
    window.history.pushState({}, '', page === 'landing' ? '/' : '/cart');
    
    const app = document.querySelector('app-root');
    if (app) {
        app.setAttribute('page', page);
    }
}

window.addEventListener('popstate', () => {
    const path = window.location.pathname;
    Navigate(path === '/cart' ? 'cart' : 'landing');
});