import { Dispatcher } from "./Dispatcher";
import { getAnimes } from "../services/AnimeService";

export const StoreActions = {
  loadAnimes: async () => {
    try {
      const animes = await getAnimes();
      Dispatcher.dispatch({
        type: 'LOAD_ANIMES',
        payload: animes
      });
    } catch (error) {
      console.error("Error loading animes:", error);
    }
  },

  addToCart: (id: string) => {
    Dispatcher.dispatch({
      type: 'ADD_TO_CART',
      payload: id
    });
  },

  removeFromCart: (id: string) => {
    Dispatcher.dispatch({
      type: 'REMOVE_FROM_CART',
      payload: id
    });
  },

  navigate: (page: string) => {
    Dispatcher.dispatch({
      type: 'NAVIGATE',
      payload: page
    });
  }
};