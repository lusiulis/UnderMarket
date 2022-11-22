import type { IPaginationPayload } from "..";
import { ICategory } from "../Category/Category";
import type { IAddFile } from "../File/File";
import type { IShopPreview } from "../Shop/shop";

export type IContentType = 'product' | 'publicity'

export type IContent = {
    categoryId: string;
    contentType: IContentType;
    description: string;
    title: string;
    shopId: string;
    id: string;
}

export type IContentCard = {
    offer?: {
        price: number,
        percentage: number
    }
    categorys: string[];
    contentType: IContentType;
    description: string;
    title: string;
    shop: IShopPreview
    id: string;
    price: number;
    files: string[];
    rating?: number;
}

export type IAddContentPayload = {
    shopId: string;
    title: string;
    description: string;
    categorys: string[];
    price: number;
    contentType: 'image' | 'video'
    files: string[]
}

export type IPaginatedContentCards = {
    contents: IContentCard[];
    lastElement: any;
}

export type IGetContentsByShopPayload = {
    shopId: string;
    pagination: IPaginationPayload
}

