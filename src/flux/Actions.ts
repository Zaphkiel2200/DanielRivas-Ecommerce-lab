import { AppDispatcher } from "./Dispatcher";
import { State } from "./Store";
import getAnimes from "../services/Animes";

export const CartActionTypes = {
  TOGGLE_CART: "TOGGLE_CART",
  CLEAR_CART: "CLEAR_CART", // Añadir esto
};

export const StoreActionTypes = {
  LOAD_STATE: "LOAD_STATE",
  UPDATE_STORE_NAME: "UPDATE_STORE_NAME",
  LOAD_ANIMES: "LOAD_ANIMES",
  NAVIGATE: "NAVIGATE",
};

export const CartActions = {
  toggleCart: (animeId: string) => {
    AppDispatcher.dispatch({
      type: CartActionTypes.TOGGLE_CART,
      payload: animeId,
    });
  },
  clearCart: () => {
    AppDispatcher.dispatch({
      type: CartActionTypes.CLEAR_CART,
      payload: null,
    });
  },
};

export const StoreActions = {
  loadState: (state: State) => {
    AppDispatcher.dispatch({
      type: StoreActionTypes.LOAD_STATE,
      payload: state,
    });
  },
  updateStoreName: (name: string) => {
    AppDispatcher.dispatch({
      type: StoreActionTypes.UPDATE_STORE_NAME,
      payload: name,
    });
  },
  navigate: (page: string) => {
    AppDispatcher.dispatch({
      type: StoreActionTypes.NAVIGATE,
      payload: page,
    });
  },
  loadAnimes: async () => {
    try {
      const animes = await getAnimes();
      AppDispatcher.dispatch({
        type: StoreActionTypes.LOAD_ANIMES,
        payload: animes,
      });
      return animes;
    } catch (error) {
      console.error("Error loading animes:", error);
      return [];
    }
  },
};