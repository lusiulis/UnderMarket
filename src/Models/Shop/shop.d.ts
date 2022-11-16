type ISocialNetwork = {
  network: 'INSTAGRAM' | 'FACEBOOK' | 'PERSONAL';
  link: URL;
};

export type IShop = {
  id: string;
  address: string;
  phoneNumber: string;
  networks: Array<ISocialNetwork>;
};

export type IShopLight = {
  id: string;
  name: string;
}

export type IAddShop = {
  address: string;
  phoneNumber: string;
  networks: Array<ISocialNetwork>;
};
