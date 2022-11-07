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

export type IAddShop = {
  address: string;
  phoneNumber: string;
  networks: Array<ISocialNetwork>;
};
