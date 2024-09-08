import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from '../features/ingredients/ingredientsSlice';
import { feedsSlice } from '../features/feeds/feedsSlice';
import { burgerConstructorSlice } from '../features/burger-constructor/burgerConstructorSlice';
import { userSlice } from '../features/user/userSlice';
import { orderSlice } from '../features/order/orderSlice';

const rootReducer = combineSlices(
  ingredientsSlice,
  feedsSlice,
  burgerConstructorSlice,
  userSlice,
  orderSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
