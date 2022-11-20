import {createContext, ReactElement} from 'react';
import {IContentReducer} from '../Hooks/Home';
import {useHomeContext} from '../Hooks/Home/useHomeContext';

type IHomeContextProviderProps = {
  children: ReactElement
}

export const HomeContext = createContext<IContentReducer>({
  dispatch: () => {},
  state: {
    contents: [],
    selectedContent: undefined
  }
});

export const HomeContextProvider = ({children}: IHomeContextProviderProps) => {
  const homeContext = useHomeContext();
  return (
    <HomeContext.Provider value={homeContext}>{children}</HomeContext.Provider>
  );
};
