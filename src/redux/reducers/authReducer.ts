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
  CREATE_GUEST_FAILURE,
  UPLOAD_PROFILE_PICTURE_FAILURE,
  UPLOAD_PROFILE_PICTURE_REQUEST,
  UPLOAD_PROFILE_PICTURE_SUCCESS,
  DELETE_PROFILE_PICTURE_REQUEST,
  DELETE_PROFILE_PICTURE_SUCCESS,
  DELETE_PROFILE_PICTURE_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_TESTS,
} from '../actionTypes';
import { AuthState } from '../../types/types';

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
  uploading: false,
};

export const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
    case SIGN_IN_REQUEST:
    case GOOGLE_AUTH_REQUEST:
    case CREATE_GUEST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
    case GOOGLE_AUTH_SUCCESS:
    case CREATE_GUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload.user,
        error: null,
      };
    case SIGN_UP_FAILURE:
    case SIGN_IN_FAILURE:
    case GOOGLE_AUTH_FAILURE:
    case CREATE_GUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SIGN_OUT:
      return initialState;
    case UPLOAD_PROFILE_PICTURE_REQUEST:
      return {
        ...state,
        uploading: true,
      };
    case UPLOAD_PROFILE_PICTURE_FAILURE:
      return {
        ...state,
        uploading: false,
        error: action.payload,
      };
    case UPLOAD_PROFILE_PICTURE_SUCCESS:
      if (state.user) {
        return {
          ...state,
          uploading: false,
          user: {
            ...state.user,
            profilePic: action.payload,
          },
        };
      }
      return state;
    case DELETE_PROFILE_PICTURE_REQUEST:
      return {
        ...state,
        uploading: true,
      };
    case DELETE_PROFILE_PICTURE_SUCCESS:
      if (state.user) {
        return {
          ...state,
          uploading: false,
          user: {
            ...state.user,
            profilePic: null,
          },
        };
      }
      return state;
    case DELETE_PROFILE_PICTURE_FAILURE:
      return {
        ...state,
        uploading: false,
        error: action.payload,
      };
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_USER_TESTS:
      if (state.user) {
        const updatedTests = [...state.user.tests, action.payload];
        const wpm = Math.max(state.user.wpm, action.payload.wpm);
        return {
          ...state,
          user: {
            ...state.user,
            tests: updatedTests,
            wpm,
          },
        };
      }
      return state;
    default:
      return state;
  }
};
