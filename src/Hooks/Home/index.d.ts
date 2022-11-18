import type {IContent} from '../../Models/Content/Content';

export type IContentContext = {
  contents: IContent[],
  selectedContent: IContent | undefined,
};

export type IContentReducerAction = {
    type: 'set' | 'select' | 'get'
    result?: any
}

export type IContentReducer = {
  state: IContentContext;
  dispatch: (value: any) => any
}

