import { CartActionTypes, StoreActionTypes } from "../flux/Actions";
import { AppDispatcher, Action } from "./Dispatcher";
import { Anime } from "../types/types";

export type State = {
  count: number;
  cartItems: number[];
  storeName: string;
  animes: Anime[];
  currentPage: string;
};

type Listener = (state: State) => void;

class Store {
  private _myState: State = {
    count: 0,
    cartItems: [],
    storeName: "Anime Store",
    animes: [],
    currentPage: "home",
  };

  private _listeners: Listener[] = [];

  constructor() {
    AppDispatcher.register(this._handleActions.bind(this));
    this.load();
  }

  load() {
    const savedState = localStorage.getItem("animeStoreState");
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        this._myState = {
          ...this._myState,
          ...parsedState,
        };
        this._emitChange();
      } catch (error) {
        console.error("Error loading state:", error);
      }
    }
  }

  getState(): State {
    return this._myState;
  }

  private _handleActions(action: Action): void {
    switch (action.type) {
      case CartActionTypes.TOGGLE_CART:
        if (
          typeof action.payload === "string" ||
          typeof action.payload === "number"
        ) {
          const animeId = Number(action.payload);
          const currentItems = this._myState.cartItems || [];
          const itemIndex = currentItems.indexOf(animeId);

          if (itemIndex === -1) {
            this._myState = {
              ...this._myState,
              cartItems: [...currentItems, animeId],
            };
          } else {
            this._myState = {
              ...this._myState,
              cartItems: currentItems.filter((id) => id !== animeId),
            };
          }
          this._emitChange();
        }
        break;

      case StoreActionTypes.LOAD_STATE:
        if (typeof action.payload === "object") {
          this._myState = {
            ...this._myState,
            ...action.payload,
          };
          this._emitChange();
        }
        break;

      case StoreActionTypes.UPDATE_STORE_NAME:
        if (typeof action.payload === "string") {
          this._myState = {
            ...this._myState,
            storeName: action.payload,
          };
          this._emitChange();
        }
        break;

      case StoreActionTypes.LOAD_ANIMES:
        if (Array.isArray(action.payload)) {
          this._myState = {
            ...this._myState,
            animes: action.payload,
          };
          this._emitChange();
        }
        break;

      case StoreActionTypes.NAVIGATE:
        if (typeof action.payload === "string") {
          this._myState = {
            ...this._myState,
            currentPage: action.payload,
          };
          this._emitChange();
        }
        break;
        
        case CartActionTypes.CLEAR_CART:
        this._myState = {
          ...this._myState,
          cartItems: [],
        };
        this._emitChange();
        break;
    }
  }

  private _emitChange(): void {
    const state = this.getState();
    localStorage.setItem("animeStoreState", JSON.stringify(state));
    for (const listener of this._listeners) {
      listener(state);
    }
  }

  subscribe(listener: Listener): void {
    this._listeners.push(listener);
    listener(this.getState());
  }

  unsubscribe(listener: Listener): void {
    this._listeners = this._listeners.filter((l) => l !== listener);
  }
}

export const store = new Store();