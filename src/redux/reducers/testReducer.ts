import { TEST_REQUEST, TEST_SUCCESS, TEST_FAILURE, RESET_TEST_STATE } from '../actionTypes';
import { TypingTestData } from '../../types/types';

const initialState: {
  data: TypingTestData | null;
  error: string | null;
  loading: boolean;
} = {
  data: null,
  error: null,
  loading: false,
};

export const testReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case RESET_TEST_STATE:
      return {
        ...initialState,
      };
    case TEST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case TEST_SUCCESS:
      return {
        data: {
          lessonProgress: action.payload.lessonProgress,
          test: action.payload.test,
          userProgress: action.payload.userProgress,
        },
        loading: false,
        error: null,
      };
    case TEST_FAILURE:
      return {
        data: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
