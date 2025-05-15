export interface Anime {
  mal_id: number;
  title: string;
  title_english?: string;
  title_japanese?: string;
  images: {
    webp: {
      image_url: string;
      large_image_url: string;
      small_image_url: string;
    };
  };
  episodes?: number;
  status: string;
  aired: {
    from: string;
    to: string | null;
  };
  score: number;
  rank: number;
  synopsis: string;
  genres: {
    name: string;
  }[];
}