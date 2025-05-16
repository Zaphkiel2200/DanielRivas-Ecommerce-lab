import Root from "./Root/Root";
import CardContainer from "./components/CardContainer";
import AnimeCard from "./components/AnimeCard";
import YourAnimes from "./components/YourAnimes";
import Cart from "./components/Cart"; 
import BrowseAnimes from "./components/BrowseAnimes"; 
import AdminModifyAnimes from "./components/AdminModifyAnimes";

customElements.define("root-element", Root);
customElements.define("card-container", CardContainer);
customElements.define("anime-card", AnimeCard);
customElements.define("your-animes", YourAnimes);
customElements.define("anime-cart", Cart); 
customElements.define("browse-animes", BrowseAnimes); 
customElements.define("admin-modify-animes", AdminModifyAnimes);