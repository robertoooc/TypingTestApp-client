import axios from 'axios';
import { FETCH_LESSONS_REQUEST, FETCH_LESSONS_SUCCESS, FETCH_LESSONS_FAILURE } from '../actionTypes';
import { Dispatch } from 'redux';
import { Lesson } from '../../types/types';

// Action creators
const fetchLessonsRequest = () => ({
  type: FETCH_LESSONS_REQUEST,
});

const fetchLessonsSuccess = (lesson: Lesson) => ({
  type: FETCH_LESSONS_SUCCESS,
  payload: lesson,
});

const fetchLessonsFailure = (error: any) => ({
  type: FETCH_LESSONS_FAILURE,
  payload: error,
});

// Thunk for fetching lessons
export const fetchLessons = (char: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchLessonsRequest());
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/lessons/random/${char}`);
      const lesson: Lesson = response.data.lesson;
      dispatch(fetchLessonsSuccess(lesson));
    } catch (error: any) {
      dispatch(fetchLessonsFailure(error.message));
    }
  };
};
