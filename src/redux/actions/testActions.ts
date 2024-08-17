import axios from 'axios';
import { Dispatch } from 'redux';
import { TEST_REQUEST, TEST_SUCCESS, TEST_FAILURE, UPDATE_USER_TESTS } from '../actionTypes';
import { results } from '../../types/types';

export const testRequest = () => ({
  type: TEST_REQUEST,
});

export const testSuccess = (data: any) => ({
  type: TEST_SUCCESS,
  payload: data,
});

export const testFailure = (error: string) => ({
  type: TEST_FAILURE,
  payload: error,
});

export const updateUserTests = (data: any) => ({
  type: UPDATE_USER_TESTS,
  payload: data,
});

export const submitTest = (payload: results) => async (dispatch: Dispatch) => {
  dispatch(testRequest());

  try {
    const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/tests`, payload);
    dispatch(testSuccess(res.data));
    dispatch(updateUserTests(res.data.newTest));
  } catch (err: any) {
    if (err.response) {
      dispatch(testFailure(err.response.data.message));
    } else {
      dispatch(testFailure(err.message));
    }
  }
};
