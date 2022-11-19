import { IContent } from "../Content/Content";

type ISocialNetwork = {
  network: 'INSTAGRAM' | 'FACEBOOK';
  link: string;
};

export type IShop = {
  id: string;
  name: string;
  description: string;
  userId: string;
  address?: string;
  phoneNumber?: string;
  networks?: Array<ISocialNetwork>;
};

export type IShopLight = {
  id: string;
  name: string;
  description: string;
  phoneNumber: string;
  networks?: Array<ISocialNetwork>;
  photo?: string;
  followers?: number;
  posts?: Array<IContent>;
}

export type IAddShop = {
  photo?: String;
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
