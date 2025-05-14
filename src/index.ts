import Root from "./Root/Root";
import Header from "./components/Header/Header";
import LandingPage from "./pages/LandingPage";
import CartPage from "./pages/CartPage";
import AnimeCard from "./components/AnimeCard/AnimeCard";

customElements.define('root-element', Root);

customElements.define('header-element', Header);
customElements.define('anime-card', AnimeCard);

customElements.define('landing-page', LandingPage);
customElements.define('cart-page', CartPage);