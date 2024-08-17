import { GET_USER_DATA_REQUEST, GET_USER_DATA_SUCCESS, GET_USER_DATA_FAILURE } from '../actionTypes';
import { userProfile } from '../../types/types';

const initialState: userProfile | {} = {};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_USER_DATA_REQUEST:
      return state;
    case GET_USER_DATA_SUCCESS:
      return action.payload;
    case GET_USER_DATA_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
