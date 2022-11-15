import { IAddFile } from "../File/File";

export type IAddContentPayload = {
    userId: string;
    title: string;
    description: string;
    categoryId: string;
    price: number;
    contentType: 'image' | 'video'
    filesUrl: URL[]
}

