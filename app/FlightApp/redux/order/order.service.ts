import {
  createFlightOrder,
  getListFlightOrder,
  getListFlightOrderByUser,
} from '../api';
import {AppThunk} from '../store';
import {getOrderFailure, getOrderStart, getOrderSuccess} from './order.reducer';

export const getListOrderFlightAsync = (): AppThunk => async dispatch => {
  dispatch(getOrderStart());
  return getListFlightOrder()
    .then((response: any) => {
      dispatch(getOrderSuccess(response?.data));
      return response;
    })
    .catch(error => {
      dispatch(getOrderFailure(error));
      return error;
    })
    .finally(() => {
      console.log('--------getListOrderFlightAsync finaly');
    });
};

export const getListOrderFlightByUserAsync =
  (userId: string | number): AppThunk =>
  async dispatch => {
    dispatch(getOrderStart());
    return getListFlightOrderByUser(userId)
      .then((response: any) => {
        dispatch(getOrderSuccess(response?.data));
        return response;
      })
      .catch(error => {
        dispatch(getOrderFailure(error));
        return error;
      })
      .finally(() => {
        console.log('--------getListOrderFlightAsync finaly');
      });
  };

export const createOrderFlightAsync =
  (req: IRequestOrder, callback?: () => void): AppThunk =>
  async dispatch => {
    dispatch(getOrderStart());
    return createFlightOrder(req)
      .then((response: any) => {
        // dispatch(getFlightSuccess(response?.data?.flightList));
        callback && callback();
        return response;
      })
      .catch(error => {
        dispatch(getOrderFailure(error));
        return error;
      })
      .finally(() => {
        console.log('--------createOrderFlightAsync finaly');
      });
  };
