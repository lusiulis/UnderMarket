import {createContext} from 'react';
import {useAppContext} from '../hooks/useAppContext';

export const AppContext = createContext({});
export const RewardsContextProvider = (props: any) => {
  const appContext = useAppContext();
  return (
    <AppContext.Provider value={{appContext}}>
      {props.children}
    </AppContext.Provider>
  );
};
