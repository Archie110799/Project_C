import {AppThunk} from '../store';
import {
  getFlightFailure,
  getFlightStart,
  getFlightSuccess,
} from './flight.reducer';

export const getListFlightAsync = (): AppThunk => async dispatch => {
  try {
    dispatch(getFlightStart());
    const url = `http://localhost:3000/?req=HANSGN30042023-1-0-0`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.flightList?.length) {
      dispatch(getFlightSuccess(data.flightList));
    } else {
      const dummy = [
        ['Hà Nội', '05:10', 'VJ199', 'Hồ Chí Minh', '07:20', '967,000', 'VND'],
        ['Hà Nội', '06:00', 'VJ121', 'Hồ Chí Minh', '08:10', '967,000', 'VND'],
        ['Hà Nội', '20:00', 'VJ155', 'Hồ Chí Minh', '22:10', '967,000', 'VND'],
        ['Hà Nội', '21:00', 'VJ159', 'Hồ Chí Minh', '23:10', '967,000', 'VND'],
      ];
      dispatch(getFlightSuccess(dummy));
    }
  } catch (error: any) {
    dispatch(getFlightFailure(error.message));
  }
};
