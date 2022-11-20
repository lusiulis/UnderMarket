export type IAuthProfile = {
  id: string;
  profileImage?: string;
  username: string;
  email: string;
};

export type IAuthState = {
  isAunthenticated: boolean;
  profile?: IAuthProfile;
};

export type IAuthContext = {
  authState: IAuthState;
  setAuthenticatedUser: (profile: IAuthProfile) => void;
  logOut: () => void;
};
