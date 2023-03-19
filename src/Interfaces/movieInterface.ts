export interface movieInterface {
    title: string;
    img: string;
    description: string;
    imdb: number;
    year: number;
    id: string;
    isFavorite: boolean;
    handleFavorite?: (movieId: string, isFavorite: boolean) => void;
}