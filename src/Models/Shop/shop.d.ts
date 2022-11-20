import { IContent, IContentCard } from "../Content/Content";

type ISocialNetwork = {
  network: 'INSTAGRAM' | 'FACEBOOK';
  link: string;
};

export type IShop = {
  id: string;
  name: string;
  description: string;
  phoneNumber: string;
  profileImage: string;
  networks: ISocialNetwork[];
  posts: IContentCard[];
  followers: number;
  userId: string
};

export type IShopLight = {
  id: string;
  name: string;
  profileImage: string;
}

export type IAddShop = {
  profileImage?: String;
  name: string;
  description: string;
  userId: string;
  address?: string;
  phoneNumber: string;
  networks?: Array<ISocialNetwork>;
};

export type IShopPreview = {
  id: string;
  name: string;
  profileImage: string;
}
