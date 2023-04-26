import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ProvinceState {
  provinces?: Array<IProvince>;
  error: string | null;
}

const initialState: ProvinceState = {
  provinces: [],
  error: null,
};

const provinceSlice = createSlice({
  name: 'province',
  initialState,
  reducers: {
    getProvinceStart(state) {
      state.error = null;
    },
    getProvinceSuccess(state, action: PayloadAction<Array<IProvince>>) {
      state.error = null;
      state.provinces = action.payload;
    },
    getProvinceFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearProvince(state) {
      state.provinces = [];
      state.error = null;
    },
  },
});

export const {
  getProvinceStart,
  getProvinceSuccess,
  getProvinceFailure,
  clearProvince,
} = provinceSlice.actions;

export default provinceSlice.reducer;
