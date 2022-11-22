import { IContentCard } from '../Content/Content';
import {IFollower} from '../Followers/Followers';

export type IProfile = {
  id: string;
  username: string;
  following: IFollower[];
  profileImage: string;
  email: string;
  description: string;
  name: string;
  invitations: IInvitation[];
};

export type IProfileLight = {
  id: string;
  username: string;
  profileImage: string;
};

export type IAddWishListPayload = {
  name: string;
  description: string;
  authorId: string;
}

export type IWishListCard = {
  id: string;
  name: string;
  previewImage: string;
}

export type IWishListLight = {
  id: string;
  author: {
    id: string;
    username: string;
    profileImage: string;
  };
  name: string;
  previewImage: string;
};

export type IWishList = {
  id: string;
  author: {
    id: string;
    username: string;
    profileImage: string;
  };
  name: string;
  previewImage: string;
  description: string;
  contents: IContentCard[];
};

export type IInvitation = {
  state: boolean;
  wishListId: string;
};

export type IWishListInvitation = {
  id: string;
  name: string;
  author: {
    id: string;
    username: string;
    profileImage: string;
  };
  description: string;
};
