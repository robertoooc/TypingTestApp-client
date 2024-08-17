import axios from 'axios';
import { Dispatch } from 'redux';
import {
  GET_LEADERBOARD_REQUEST,
  GET_LEADERBOARD_SUCCESS,
  GET_LEADERBOARD_FAILURE,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAILURE
} from '../actionTypes';

import { showToast } from '../../utils/toast';
import { LeaderboardEntry, UserList } from '../../types/types';

export const getLeaderboardRequest = () => ({
  type: GET_LEADERBOARD_REQUEST
});

export const getLeaderboardSuccess = (leaderboard: LeaderboardEntry[]) => ({
  type: GET_LEADERBOARD_SUCCESS,
  payload: leaderboard
});

export const getLeaderboardFailure = (error: string) => ({
  type: GET_LEADERBOARD_FAILURE,
  payload: error
});

export const fetchLeaderboard = (page = 1, itemsPerPage = 10) => {
  return async (dispatch: Dispatch) => {
    dispatch(getLeaderboardRequest());

    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/leaderboard/tests`, {
        params: {
          take: itemsPerPage,
          skip: (page - 1) * itemsPerPage
        }
      });

      dispatch(getLeaderboardSuccess(response.data.leaderboard));
    } catch (err: any) {
      showToast('error', 'Error fetching leaderboard');

      if (err.response) {
        dispatch(getLeaderboardFailure(err.response.data.message));
      } else {
        dispatch(getLeaderboardFailure(err.message));
      }
    }
  };
};

export const getUserListRequest = () => ({
  type: GET_USER_LIST_REQUEST
});

export const getUserListSuccess = (userList: UserList[]) => ({
  type: GET_USER_LIST_SUCCESS,
  payload: userList
});

export const getUserListFailure = (error: string) => ({
  type: GET_USER_LIST_FAILURE,
  payload: error
});

export const fetchUserList = (page = 1, itemsPerPage = 10) => {
  return async (dispatch: Dispatch) => {
    dispatch(getUserListRequest());

    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/leaderboard/users`, {
        params: {
          take: itemsPerPage,
          skip: (page - 1) * itemsPerPage
        }
      });

      dispatch(getUserListSuccess(response.data.userList));
    } catch (err: any) {
      showToast('error', 'Error fetching user list');

      if (err.response) {
        dispatch(getUserListFailure(err.response.data.message));
      } else {
        dispatch(getUserListFailure(err.message));
      }
    }
  };
};
