import { authReducer } from './authReducer';
import { testReducer } from './testReducer';
import { leaderboardReducer } from './leaderboardReducer';
import { combineReducers } from 'redux';
import { lessonReducer } from './lessonReducer';
import { userReducer } from './userReducer';

export const rootReducer: any = combineReducers({
  auth: authReducer,
  test: testReducer,
  leaderboard: leaderboardReducer,
  lessons: lessonReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
