import type { IPaginationPayload } from "..";
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
    categoryId: string;
    contentType: IContentType;
    description: string;
    title: string;
    shop: IShopPreview
    id: string;
    price: number;
    files: string[];
}

export type IAddContentPayload = {
    shopId: string;
    title: string;
    description: string;
    categoryId: string;
    price: number;
    contentType: 'image' | 'video'
    files: string[]
}

export type IGetContentsByShopPayload = {
    shopId: string;
    pagination: IPaginationPayload
}

