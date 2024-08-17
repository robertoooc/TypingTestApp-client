import { FETCH_LESSONS_REQUEST, FETCH_LESSONS_SUCCESS, FETCH_LESSONS_FAILURE } from '../actionTypes';

const initialState = {
  loading: false,
  lesson: null,
  error: '',
};

export const lessonReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_LESSONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LESSONS_SUCCESS:
      return {
        loading: false,
        lesson: action.payload,
        error: '',
      };
    case FETCH_LESSONS_FAILURE:
      return {
        loading: false,
        lesson: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
