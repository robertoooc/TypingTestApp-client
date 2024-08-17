import axios from 'axios';
import { Dispatch } from 'redux';
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT,
  GOOGLE_AUTH_REQUEST,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAILURE,
  CREATE_GUEST_REQUEST,
  CREATE_GUEST_SUCCESS,
  CREATE_GUEST_FAILURE
} from '../actionTypes';
import { currentUser } from '../../types/types';
import { showToast } from '../../utils/toast';

export const signUpRequest = () => ({
  type: SIGN_UP_REQUEST
});

export const signUpSuccess = (token: string, user: currentUser) => ({
  type: SIGN_UP_SUCCESS,
  payload: { token, user }
});

export const signUpFailure = (error: string) => ({
  type: SIGN_UP_FAILURE,
  payload: error
});

export const signUp = (name: string, email: string, password: string) => async (dispatch: Dispatch) => {
  dispatch(signUpRequest());

  try {
    const reqBody = { name, email, password };
    const submit = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/register`, reqBody);

    const { token, user } = submit.data;
    showToast('success', 'Signed up successfully');

    dispatch(signUpSuccess(token, user));
  } catch (err: any) {
    showToast('error', 'Error occured while signing up');

    if (err.response) {
      dispatch(signUpFailure(err.response.data.message));
    } else {
      dispatch(signUpFailure(err.message));
    }
  }
};

export const signInRequest = () => ({
  type: SIGN_IN_REQUEST
});

export const signInSuccess = (token: string, user: currentUser) => ({
  type: SIGN_IN_SUCCESS,
  payload: { token, user }
});

export const signInFailure = (error: string) => ({
  type: SIGN_IN_FAILURE,
  payload: error
});

export const signIn = (email: string, password: string) => async (dispatch: Dispatch) => {
  dispatch(signInRequest());

  try {
    const reqBody = { email, password };
    const submit = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, reqBody);

    const { token, user } = submit.data;
    showToast('success', 'Signed in successfully');

    dispatch(signInSuccess(token, user));
  } catch (err: any) {
    showToast('error', 'Error occured while signing in');

    if (err.response) {
      dispatch(signInFailure(err.response.data.message));
    } else {
      dispatch(signInFailure(err.message));
    }
  }
};

export const signOut = () => ({
  type: SIGN_OUT
});

export const logout = () => async (dispatch: Dispatch) => {
  try {
    await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/logout`);
    showToast('success', 'Logged out successfully');

    dispatch(signOut());
  } catch (err: any) {
    showToast('error', 'Error occured while logging out');
    console.error('Logout failed', err);
  }
};

export const googleAuthRequest = () => ({
  type: GOOGLE_AUTH_REQUEST
});

export const googleAuthSuccess = (token: string, user: currentUser) => ({
  type: GOOGLE_AUTH_SUCCESS,
  payload: { token, user }
});

export const googleAuthFailure = (error: string) => ({
  type: GOOGLE_AUTH_FAILURE,
  payload: error
});

export const googleAuth = (code: string) => async (dispatch: Dispatch) => {
  dispatch(googleAuthRequest());
  const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true
  });
  try {
    const submit = await api.post(`${process.env.REACT_APP_SERVER_URL}/auth/google?code=${code}`);
    const { token, user } = submit.data;

    showToast('success', 'Signed in successfully');

    dispatch(googleAuthSuccess(token, user));
  } catch (err: any) {
    showToast('error', 'Error occured while signing in');

    if (err.response) {
      dispatch(googleAuthFailure(err.response.data.message));
    } else {
      dispatch(googleAuthFailure(err.message));
    }
  }
};

export const createGuestRequest = () => ({
  type: CREATE_GUEST_REQUEST
});

export const createGuestSuccess = (token: string, user: currentUser) => ({
  type: CREATE_GUEST_SUCCESS,
  payload: { token, user }
});

export const createGuestFailure = (error: string) => ({
  type: CREATE_GUEST_FAILURE,
  payload: error
});

export const createGuest = () => async (dispatch: Dispatch) => {
  dispatch(createGuestRequest());
  try {
    const submit = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/guest`);
    const { token, user } = submit.data;

    showToast('success', 'Signed in as guest successfully');

    dispatch(createGuestSuccess(token, user));
  } catch (err: any) {
    showToast('error', 'Error occured while signing in as guest');

    if (err.response) {
      dispatch(createGuestFailure(err.response.data.message));
    } else {
      dispatch(createGuestFailure(err.message));
    }
  }
};
