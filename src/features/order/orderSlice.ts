import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const orderThunk = createAsyncThunk(
  'order/newOrder',
  async (data: string[]) => orderBurgerApi(data)
);

export const getOrderByNumberThunk = createAsyncThunk(
  'order/getByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

type TOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TOrderState = {
  orderRequest: false,
  orderModalData: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderState: (state) => {
      (state.orderModalData = null), (state.orderRequest = false);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderThunk.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderThunk.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
      });
    builder.addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
      state.orderModalData = action.payload.orders[0];
    });
    1;
  },
  selectors: {
    getOrderSelector: (state) => state
  }
});

export const { getOrderSelector } = orderSlice.selectors;
export const { resetOrderState } = orderSlice.actions;
