import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CommonState {
  loading: boolean;
  error: any;
  toast?: any;
  popup?: any;
}

const initialState: CommonState = {
  loading: false,
  error: null,
  toast: undefined,
  popup: undefined,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    callApiStart(state) {
      state.loading = true;
      state.error = null;
    },
    callApiSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = null;
    },
    callApiFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {callApiStart, callApiSuccess, callApiFailure} =
  commonSlice.actions;

export default commonSlice.reducer;
