import {AppThunk} from '../store';
import {
  getFlightFailure,
  getFlightStart,
  getFlightSuccess,
} from './flight.reducer';

export const getListFlightAsync = (): AppThunk => async dispatch => {
  try {
    dispatch(getFlightStart());
    const response = await fetch(
      `http://localhost:3000/?req=HANSGN25042023-1-0-0`,
    );
    const data = await response.json();
    console.log(data.flightList);

    dispatch(getFlightSuccess(data.flightList));
  } catch (error: any) {
    dispatch(getFlightFailure(error.message));
  }
};
