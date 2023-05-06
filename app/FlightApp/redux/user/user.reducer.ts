import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  users?: Array<IUser>;
  user?: IUser;
  error?: any;
}

const initialState: UserState = {
  users: [],
  user: undefined,
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
    getListUserSuccess(state, action: PayloadAction<Array<IUser>>) {
      state.error = null;
      state.users = action.payload;
    },
    getListUserFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearUser(state) {
      state.user = undefined;
      state.error = null;
      state.users = [];
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
  getListUserSuccess,
  getListUserFailure,
  clearUser,
  clearErrorUser,
} = userSlice.actions;

export default userSlice.reducer;
