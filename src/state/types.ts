type MovieType = {
    mal_id: number;
    title: string;
    images: {
        jpg: {
            image_url: string;
        };
    };
    synopsis?: string;
};

type CartItemType = MovieType & {
    quantity: number;
};

type AppState = {
    currentPage: 'landing' | 'cart';
    movies: MovieType[];
    cart: CartItemType[];
    loading: boolean;
};

export type { MovieType, CartItemType, AppState };