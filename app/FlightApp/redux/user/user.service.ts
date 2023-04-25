import {loginAPI, registerAPI} from '../api';
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
      dispatch(getUserFailure(error));
    }
  };

export const loginAction =
  (params: IRequestLogin, callback?: (data: IUser) => void): AppThunk =>
  async dispatch => {
    dispatch(getUserStart());
    return loginAPI(params)
      .then(response => {
        dispatch(getUserSuccess(response?.data));
        callback && callback(response?.data);
        return response;
      })
      .catch(error => {
        dispatch(getUserFailure(error));
        return error;
      })
      .finally(() => {
        console.log('--------loginAction finaly');
      });
  };

export const registerAction =
  (params: IRequestRegister, callback?: (data: IUser) => void): AppThunk =>
  async dispatch => {
    dispatch(getUserStart());
    return registerAPI(params)
      .then(response => {
        dispatch(getUserSuccess(response?.data));
        callback && callback(response?.data);
        return response;
      })
      .catch(error => {
        dispatch(getUserFailure(error.response ? error.response.data : error));
        return error;
      })
      .finally(() => {
        console.log('--------registerAction finaly');
      });
  };
