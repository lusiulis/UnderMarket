
export type IRating = {
    id: string;
    rating: number;
    contentId: string;
    userId: string;
};

export type IAddRating = {
    rating: number;
    contentId: string;
    userId: string;
};