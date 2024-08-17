import axios from 'axios';
import { Dispatch } from 'redux';
import {
  UPLOAD_PROFILE_PICTURE_FAILURE,
  UPLOAD_PROFILE_PICTURE_REQUEST,
  UPLOAD_PROFILE_PICTURE_SUCCESS,
  DELETE_PROFILE_PICTURE_REQUEST,
  DELETE_PROFILE_PICTURE_SUCCESS,
  DELETE_PROFILE_PICTURE_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
} from '../actionTypes';
import { showToast } from '../../utils/toast';

export const uploadProfilePictureRequest = () => ({
  type: UPLOAD_PROFILE_PICTURE_REQUEST,
});

export const uploadProfilePictureSuccess = (url: string) => ({
  type: UPLOAD_PROFILE_PICTURE_SUCCESS,
  payload: url,
});

export const uploadProfilePictureFailure = (error: any) => ({
  type: UPLOAD_PROFILE_PICTURE_FAILURE,
  payload: error,
});

export const uploadProfilePicture = (file: File) => async (dispatch: Dispatch) => {
  dispatch(uploadProfilePictureRequest());

  const formData = new FormData();
  formData.append('profilePic', file);

  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/profilePic`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const { url } = response.data;
    showToast('success', 'Profile picture uploaded successfully');

    dispatch(uploadProfilePictureSuccess(url));
  } catch (error) {
    showToast('error', 'Error occured while uploading profile picture');
    dispatch(uploadProfilePictureFailure(error));
  }
};

const deleteProfilePictureRequest = () => ({
  type: DELETE_PROFILE_PICTURE_REQUEST,
});

const deleteProfilePictureSuccess = () => ({
  type: DELETE_PROFILE_PICTURE_SUCCESS,
});

const deleteProfilePictureFailure = (error: any) => ({
  type: DELETE_PROFILE_PICTURE_FAILURE,
  payload: error,
});

export const deleteProfilePicture = () => async (dispatch: Dispatch) => {
  dispatch(deleteProfilePictureRequest());

  try {
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/users/profilePic`);

    showToast('success', 'Profile picture deleted successfully');

    dispatch(deleteProfilePictureSuccess());
  } catch (error) {
    showToast('error', 'Error occurred while deleting profile picture');
    dispatch(deleteProfilePictureFailure(error));
  }
};

const updateUserRequest = () => ({
  type: UPDATE_USER_REQUEST,
});

const updateUserSuccess = (user: any) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

const updateUserFailure = (error: any) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});

export const updateUser = (data: { name: string; bio: string | null }) => async (dispatch: Dispatch) => {
  dispatch(updateUserRequest());

  try {
    const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users`, data);

    const user = response.data;
    showToast('success', 'Profile updated successfully');

    dispatch(updateUserSuccess(user));
  } catch (error) {
    showToast('error', 'Error occurred while updating profile');
    dispatch(updateUserFailure(error));
  }
};

export const getUserDataRequest = () => ({
  type: GET_USER_DATA_REQUEST,
});

export const getUserDataSuccess = (data: any) => ({
  type: GET_USER_DATA_SUCCESS,
  payload: data,
});

export const getUserDataFailure = (error: any) => ({
  type: GET_USER_DATA_FAILURE,
  payload: error,
});

export const getUserById = (id: string) => async (dispatch: Dispatch) => {
  dispatch(getUserDataRequest());

  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/${id}`);
    dispatch(getUserDataSuccess(res.data));
  } catch (err: any) {
    if (err.response) {
      dispatch(getUserDataFailure(err.response.data.message));
    } else {
      dispatch(getUserDataFailure(err.message));
    }
  }
};
