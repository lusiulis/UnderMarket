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
  photo?: String;
};

export type IShopLight = {
  id: string;
  name: string;
  description: string;
  photo?: String;
  phoneNumber: string;
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
