
export type IEvent = {
    id: string;
    title: string;
    description: string;
    dateStart: string;
    dateEnd: string;
    shopId?: string;
    profileImage? :string;
    name? : string;
};

export type IAddEvent = {
    title: string;
    description: string;
    dateStart: string;
    dateEnd: Date;
    shopId?: string;
};