import {getFlightList} from '../api';
import {AppThunk} from '../store';
import {
  getFlightFailure,
  getFlightStart,
  getFlightSuccess,
} from './flight.reducer';

export const getListFlightAsync =
  (req: string): AppThunk =>
  async dispatch => {
    dispatch(getFlightStart());
    return getFlightList(req)
      .then((response: any) => {
        dispatch(getFlightSuccess(response?.data?.flightList));
        return response;
      })
      .catch(error => {
        dispatch(getFlightFailure(error));
        return error;
      })
      .finally(() => {
        console.log('--------getFlightList finaly');
      });
  };
