import { IAddFile } from "../File/File";

export type IContentType = 'product' | 'publicity'

export type IContent = {
    categoryId: string;
    contentType: IContentType;
    description: string;
    title: string;
    shopId: string
}

export type IAddContentPayload = {
    userId: string;
    title: string;
    description: string;
    categoryId: string;
    price: number;
    contentType: 'image' | 'video'
    filesUrl: URL[]
}

export type IGetContentsPayload = {
    
}
