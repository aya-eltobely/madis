import { createReducer, on } from '@ngrx/store';
import {
  loadUserFailure,
  loadUserSuccess,
  searchUserByIdFailure,
  searchUserByIdSuccess,
} from './users.action';

const initialState = {
  list: [],
  errorMessage: '',
};

const _userReducer = createReducer(
  initialState,
  on(loadUserSuccess, (state: any, {list}) => {
    return {
      ...state,
      errorMessage: '',
      list: list,
    };
  }),

  on(loadUserFailure, (state, { errorMessage }) => {
    return {
      ...state,
      errorMessage,
      list: [],
    };
  }),

  on(searchUserByIdSuccess, (state, { user }) => ({
    ...state,
    user,
    errorMessage: ''
  })),
  
  on(searchUserByIdFailure, (state, { errorMessage }) => ({
    ...state,
    user: null,
    errorMessage
  }))
);

export function userReducer(state: any, action: any) { // state :initialState > here i let reducer know state initial value , action 
// action that reducer watch to change data (state)
  return _userReducer(state, action);
}
