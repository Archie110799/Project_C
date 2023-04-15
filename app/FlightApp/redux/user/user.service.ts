import {AppThunk} from '../store';
import {getUserFailure, getUserStart, getUserSuccess} from './user.reducer';

export const fetchUser =
  (userId: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(getUserStart());
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
      );
      const data = await response.json();
      dispatch(getUserSuccess(data));
    } catch (error: any) {
      dispatch(getUserFailure(error.message));
    }
  };