import { AppState, Anime } from "../types/types";
import { Dispatcher } from "./Dispatcher";

class Store {
  private state: AppState;
  private listeners: (() => void)[] = [];

  constructor() {
    // Inicialización correcta del estado con todos los campos requeridos
    this.state = {
      animes: [],
      cart: JSON.parse(localStorage.getItem('cart') || '[]'),
      currentPage: 'catalog'
    };
    
    Dispatcher.register(this.handleActions.bind(this));
  }

  private handleActions(action: { type: string; payload?: any }): void {
    switch (action.type) {
      case 'LOAD_ANIMES':
        this.state = { 
          ...this.state, 
          animes: action.payload as Anime[]
        };
        break;
        
      case 'ADD_TO_CART':
        const animeToAdd = action.payload as Anime;
        if (!this.state.cart.some(item => item.id === animeToAdd.id)) {
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
        this.state = { 
          ...this.state, 
          currentPage: action.payload as 'catalog' | 'cart'
        };
        break;
        
      case 'CLEAR_CART':
        this.state = { 
          ...this.state, 
          cart: []
        };
        localStorage.setItem('cart', '[]');
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