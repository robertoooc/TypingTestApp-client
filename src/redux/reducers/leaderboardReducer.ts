import {
  GET_LEADERBOARD_REQUEST,
  GET_LEADERBOARD_SUCCESS,
  GET_LEADERBOARD_FAILURE,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAILURE
} from '../actionTypes';

import { LeaderboardState } from '../../types/types';

const initialState: LeaderboardState = {
  leaderboard: {
    leaderboard: [],
    loading: false,
    error: null
  },
  userList: {
    userList: [],
    loading: false,
    error: null
  }
};

export const leaderboardReducer = (state = initialState, action: any): LeaderboardState => {
  switch (action.type) {
    case GET_LEADERBOARD_REQUEST:
      return {
        ...state,
        leaderboard: {
          ...state.leaderboard,
          loading: true,
          error: null
        }
      };
    case GET_LEADERBOARD_SUCCESS:
      return {
        ...state,
        leaderboard: {
          ...state.leaderboard,
          loading: false,
          leaderboard: action.payload
        }
      };
    case GET_LEADERBOARD_FAILURE:
      return {
        ...state,
        leaderboard: {
          ...state.leaderboard,
          loading: false,
          error: action.payload
        }
      };
    case GET_USER_LIST_REQUEST:
      return {
        ...state,
        userList: {
          ...state.userList,
          loading: true,
          error: null
        }
      };
    case GET_USER_LIST_SUCCESS:
      return {
        ...state,
        userList: {
          ...state.userList,
          loading: false,
          userList: action.payload
        }
      };
    case GET_USER_LIST_FAILURE:
      return {
        ...state,
        userList: {
          ...state.userList,
          loading: false,
          error: action.payload
        }
      };
    default:
      return state;
  }
};
