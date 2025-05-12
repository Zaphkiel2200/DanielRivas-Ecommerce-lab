export const FETCH_MOVIES = 'FETCH_MOVIES';
export const ADD_TO_CART = 'ADD_TO_CART';

export const fetchMovies = (movies: any[]) => ({
    type: FETCH_MOVIES,
    payload: movies
});

export const addToCart = (movie: any) => ({
    type: ADD_TO_CART,
    payload: movie
});