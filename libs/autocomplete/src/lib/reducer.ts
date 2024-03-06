export enum LoadingState {
  IDLE,
  LOADING,
}

export interface BankState {
  data: string[];
  callState: LoadingState | Error;
}

export const initialState: BankState = {
  data: [],
  callState: LoadingState.IDLE,
};

type Action = { type: string; payload: string[] };

type PartialAction = { type: string };

export function bankReducer(state: BankState, action: Action | PartialAction) {
  switch (action.type) {
    case 'GET_BANKS':
      return {
        ...state,
        callState: LoadingState.LOADING,
      };
    case 'RESET_BANKS':
      return {
        ...state,
        data: [],
      };
    case 'GET_BANKS_SUCCESS':
      return {
        ...state,
        data: (action as Action).payload,
        callState: LoadingState.IDLE,
      };
    case 'GET_BANKS_ERROR':
      return {
        ...state,
        callState: new Error('Something wrong'),
      };
    default:
      return state;
  }
}
