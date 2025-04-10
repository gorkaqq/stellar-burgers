import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredientsThunk = createAsyncThunk(
  'getIngredients',
  getIngredientsApi
);

type TIngredientsState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error?: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isIngredientsLoading = false;
      })
      .addCase(getIngredientsThunk.pending, (state) => {
        state.isIngredientsLoading = true;
        state.error = null;
      })
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    getIngredientsSelector: (state) => state
  }
});

export const { getIngredientsSelector } = ingredientsSlice.selectors;
