import axios from 'axios';
import { Dispatch } from 'redux';
import { TEST_REQUEST, TEST_SUCCESS, TEST_FAILURE, UPDATE_USER_TESTS, RESET_TEST_STATE } from '../actionTypes';
import { results, TypingTestData, test } from '../../types/types';

export const resetTestState = () => ({
  type: RESET_TEST_STATE,
});

export const testRequest = () => ({
  type: TEST_REQUEST,
});

export const testSuccess = (data: TypingTestData) => ({
  type: TEST_SUCCESS,
  payload: data,
});

export const testFailure = (error: string) => ({
  type: TEST_FAILURE,
  payload: error,
});

export const updateUserTests = (data: test) => ({
  type: UPDATE_USER_TESTS,
  payload: data,
});

export const submitTest = (payload: results) => async (dispatch: Dispatch) => {
  dispatch(testRequest());

  try {
    const res = await axios.post<TypingTestData>(`${process.env.REACT_APP_SERVER_URL}/tests`, payload);

    dispatch(testSuccess(res.data));
    dispatch(updateUserTests(res.data.test));
  } catch (err: any) {
    if (err.response) {
      dispatch(testFailure(err.response.data.message));
    } else {
      dispatch(testFailure(err.message));
    }
  }
};
