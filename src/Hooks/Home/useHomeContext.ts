import {useCallback, useEffect, useReducer, useRef} from 'react';
import {IContentContext, IContentReducer, IContentReducerAction} from '.';
import {getContents} from '../../Models/Content';

export const useHomeContext = (): IContentReducer => {
  const paginationLimit = 20;

  const initialState: IContentContext = {
    contents: [],
    selectedContent: undefined,
  };

  const homeReducer = (
    state: IContentContext,
    action: IContentReducerAction,
  ): IContentContext => {
    switch (action.type) {
      case 'set':
        return action.result ? action.result : state;
      case 'select':
        return {...state, selectedContent: action.result};
      case 'get': {
        getContents({limit: paginationLimit, offset: action.result}).then(
          newItems => {
            return {...state, contents: state.contents.concat(newItems)};
          },
        );
      }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer<
    (arg1: IContentContext, actions: IContentReducerAction) => IContentContext
  >(homeReducer, initialState);
  const isMounted = useRef(false);

  const fetchData = useCallback(async () => {
    const allContents = await getContents({limit: paginationLimit});
    console.log('fetched: ',allContents)
    dispatch({
      type: 'set',
      result: {
        contents: allContents,
        selectedContent: allContents[0],
      },
    });
  }, []);

  useEffect(() => {
    isMounted.current = true;
    fetchData();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return {state, dispatch};
};
