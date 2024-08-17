import { TEST_REQUEST, TEST_SUCCESS, TEST_FAILURE } from '../actionTypes';
import { TestState } from '../../types/types';

const userInitialState = {
  id: '',
  name: '',
  wpm: 0,
  googleOAuth: false,
  tests: [],
  guest: false
};

const initialState: TestState = {
  wpm: 0,
  accuracy: 0,
  user: userInitialState,
  duration: 60,
  text: '',
  totalChars: 0,
  mistakes: [],
  intervalData: [],
  loading: false,
  error: null
};

export const testReducer = (state = initialState, action: any): TestState => {
  switch (action.type) {
    case TEST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case TEST_SUCCESS:
      return {
        ...state,
        loading: false,
        wpm: action.payload.wpm,
        accuracy: action.payload.accuracy,
        user: action.payload.user,
        text: action.payload.text,
        totalChars: action.payload.totalChars,
        mistakes: action.payload.mistakes,
        duration: action.payload.duration,
        intervalData: action.payload.intervalData,
        error: null
      };
    case TEST_FAILURE:
      return {
        ...state,
        loading: false,
        wpm: 0,
        accuracy: 0,
        user: userInitialState,
        text: '',
        totalChars: 0,
        mistakes: [],
        duration: 60,
        intervalData: [],
        error: action.payload
      };
    default:
      return state;
  }
};
