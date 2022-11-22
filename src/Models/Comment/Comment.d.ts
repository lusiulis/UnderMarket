import type { IProfileLight } from "../Profile/profile";

export type IComment = {
    id: string;
    timestamp: Date;
    description: string;
    from: IProfileLight;
    contentId: string;
}

export type IAddCommentPayload = {
    contentId: string;
    description: string;
    fromId: string;
    timestamp: Date;
}