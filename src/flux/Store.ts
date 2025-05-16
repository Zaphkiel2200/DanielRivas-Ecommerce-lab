import { AppState, Anime } from "../types/types";
import { Dispatcher } from "./Dispatcher";

class Store {
  private state: AppState;
  private listeners: (() => void)[] = [];

  constructor() {
    this.state = {
      animes: [],
      cart: JSON.parse(localStorage.getItem('cart') || [],
      currentPage: 'catalog'
    };
    
    Dispatcher.register(this.handleActions.bind(this));
  }

  private handleActions(action: any) {
    switch (action.type) {
      case 'LOAD_ANIMES':
        this.state = { ...this.state, animes: action.payload };
        break;
      case 'ADD_TO_CART':
        const animeToAdd = this.state.animes.find(a => a.id.toString() === action.payload);
        if (animeToAdd) {
          this.state = { 
            ...this.state, 
            cart: [...this.state.cart, animeToAdd] 
          };
          localStorage.setItem('cart', JSON.stringify(this.state.cart));
        }
        break;
      case 'REMOVE_FROM_CART':
        this.state = { 
          ...this.state, 
          cart: this.state.cart.filter(item => item.id.toString() !== action.payload) 
        };
        localStorage.setItem('cart', JSON.stringify(this.state.cart));
        break;
      case 'NAVIGATE':
        this.state = { ...this.state, currentPage: action.payload };
        break;
      default:
        return;
    }
    this.notifyListeners();
  }

  public getState(): AppState {
    return this.state;
  }

  public subscribe(listener: () => void): void {
    this.listeners.push(listener);
  }

  public unsubscribe(listener: () => void): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }
}

export const store = new Store();