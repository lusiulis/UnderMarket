import {createContext, ReactElement} from 'react';
import {useAppContext} from '../Hooks/useAppContext';

export const AppContext = createContext({});
export const RewardsContextProvider = (props: ReactElement) => {
  const appContext = useAppContext();
  return (
    <AppContext.Provider value={{appContext}}>
      {props}
    </AppContext.Provider>
  );
};
