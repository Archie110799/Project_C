import {
  deleteUser,
  getListUsers,
  loginAPI,
  registerAPI,
  updateUser,
} from '../api';
import {AppThunk} from '../store';
import {
  getListUserFailure,
  getListUserSuccess,
  getUserFailure,
  getUserStart,
  getUserSuccess,
} from './user.reducer';

export const getListUserAsync = (): AppThunk => async dispatch => {
  dispatch(getUserStart());
  return getListUsers()
    .then(response => {
      dispatch(getListUserSuccess(response?.data));
      return response;
    })
    .catch(error => {
      dispatch(getListUserFailure(error));
      return error;
    })
    .finally(() => {
      console.log('--------getListUserAsync finaly');
    });
};

export const deleteUserAsync =
  (userId: string | number): AppThunk =>
  async dispatch => {
    dispatch(getUserStart());
    return deleteUser(userId)
      .then(response => {
        dispatch(getListUserAsync());
        return response;
      })
      .catch(error => {
        dispatch(getListUserFailure(error));
        return error;
      })
      .finally(() => {
        console.log('--------deleteUserAsync finaly');
      });
  };

export const updateUserAsync =
  (
    userId: string | number,
    user: IRequestRegister,
    callback?: () => void,
  ): AppThunk =>
  async dispatch => {
    dispatch(getUserStart());
    return updateUser(user, userId)
      .then(response => {
        dispatch(getListUserAsync());
        callback && callback()
        return response;
      })
      .catch(error => {
        dispatch(getListUserFailure(error));
        return error;
      })
      .finally(() => {
        console.log('--------updateUserAsync finaly');
      });
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
