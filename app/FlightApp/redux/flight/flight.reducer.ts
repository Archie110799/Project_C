import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface FlightState {
  flights: any;
  flightSelected: any;
  loading: boolean;
  error: string | null;
}

const initialState: FlightState = {
  flights: [],
  flightSelected: undefined,
  loading: false,
  error: null,
};

const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    getFlightStart(state) {
      state.loading = true;
      state.error = null;
    },
    getFlightSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = null;
      state.flights = action.payload;
    },
    getFlightFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    selectFlight(state, action: PayloadAction<string>) {
      state.flightSelected = action.payload;
    },
    clearFlight(state) {
      state.flightSelected = undefined;
      state.flights = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  getFlightStart,
  getFlightSuccess,
  getFlightFailure,
  selectFlight,
  clearFlight,
} = flightSlice.actions;

export default flightSlice.reducer;
