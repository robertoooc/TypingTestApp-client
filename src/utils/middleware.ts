import { Middleware } from 'redux';
import axios from 'axios';
import { SIGN_OUT } from '../redux/actionTypes';
import { RootState } from '../types/types';

const authMiddleware: Middleware<{}, RootState> =
  ({ getState }) =>
  next =>
  action => {
    const state = getState();
    const token = state.auth.token;

    if (token) {
      axios.defaults.headers.common['Authorization'] = `${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }

    if ((action as { type: string }).type === SIGN_OUT) {
      delete axios.defaults.headers.common['Authorization'];
    }

    return next(action);
  };

export default authMiddleware;
