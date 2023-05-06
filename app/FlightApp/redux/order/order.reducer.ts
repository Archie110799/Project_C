import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface OrdertState {
  orders?: Array<IOrder>;
  orderSelected?: IOrder;
  error: string | null;
}

const initialState: OrdertState = {
  orders: [],
  orderSelected: undefined,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    getOrderStart(state) {
      state.error = null;
    },
    getOrderSuccess(state, action: PayloadAction<any>) {
      state.error = null;
      state.orders = action.payload;
    },
    getOrderFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    selectOrder(state, action: PayloadAction<IOrder>) {
      state.orderSelected = action.payload;
    },
    clearOrder(state) {
      state.orderSelected = undefined;
      state.orders = [];
      state.error = null;
    },
  },
});

export const {
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  selectOrder,
  clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
