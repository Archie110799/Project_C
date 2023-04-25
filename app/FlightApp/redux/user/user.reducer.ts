import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  user: IUser | null;
  error?: any;
}

const initialState: UserState = {
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserStart(state) {
      state.error = null;
    },
    getUserSuccess(state, action: PayloadAction<IUser>) {
      state.error = null;
      state.user = action.payload;
    },
    getUserFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.error = null;
    },
    clearErrorUser(state) {
      state.error = null;
    },
  },
});

export const {
  getUserStart,
  getUserSuccess,
  getUserFailure,
  clearUser,
  clearErrorUser,
} = userSlice.actions;

export default userSlice.reducer;
