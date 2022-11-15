import { useState } from "react";
import { IAuthContext, IAuthProfile, IAuthState } from ".";

export const useAuthContext = (): IAuthContext => {
  const [authState, setAuthState] = useState<IAuthState>({
    isAunthenticated: false
  })

  const setAuthenticatedUser = (profile: IAuthProfile) => setAuthState({isAunthenticated: true, profile});

  const logOut = () => setAuthState({isAunthenticated: false, profile: undefined})

  return {
    authState,
    setAuthenticatedUser,
    logOut
  };
};
