export type IUser = {
  id: string;
  username: string;
  password: string;
  email: string;
  profileImage: string;
  status: 'ACTIVE' | 'DELETED' | 'INACTIVE';
  shopId?: string;
};

export type IAddUser = {
  username: string;
  password: string;
  email: string;
  profileImage: string;
  status: 'ACTIVE' | 'DELETED' | 'INACTIVE';
  shopId?: string;
};

export type IValidate = {
  username: string;
  phoneNumber: string;
};

export type IUpdateUser = {
  username: string;
  email: string;
}