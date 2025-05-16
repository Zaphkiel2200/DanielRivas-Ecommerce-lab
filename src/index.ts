import Root from "./Root/Root";
import AnimeCatalog from "./components/AnimeCatalog";
import AnimeCard from "./components/AnimeCard";
import Cart from "./components/Cart";

customElements.define("root-element", Root);
customElements.define("anime-catalog", AnimeCatalog);
customElements.define("anime-card", AnimeCard);
customElements.define("shopping-cart", Cart);

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "/styles/styles.css";
document.head.appendChild(styleLink);

document.body.innerHTML = "<root-element></root-element>";

document.addEventListener("DOMContentLoaded", () => {
  console.log("App initialized");
});