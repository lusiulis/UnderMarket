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

export type IWishListLight = {
  id: string;
  authorId: string;
  name: string;
  previewImage: string;
};

export type IInvitation = {
  state: boolean;
  wishListId: string;
};
