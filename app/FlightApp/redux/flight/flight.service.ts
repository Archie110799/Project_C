import axios from 'axios';
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
    dispatch(getFlightSuccess(data.flightList));
  } catch (error: any) {
    dispatch(getFlightFailure(error.message));
  }
};
