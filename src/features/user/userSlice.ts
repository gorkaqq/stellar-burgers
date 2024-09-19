import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { getCookie, setCookie } from '../../utils/cookie';

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((user) => dispatch(setUser(user.user)))
        .finally(() => dispatch(setIsAuthCkecked(true)));
    } else {
      dispatch(setIsAuthCkecked(true));
    }
  }
);

export const registerThunk = createAsyncThunk(
  'user/register',
  async ({ name, email, password }: TRegisterData) => {
    const regData = await registerUserApi({ name, email, password });

    setCookie('accessToken', regData.accessToken);
    localStorage.setItem('refreshToken', regData.refreshToken);
    return regData.user;
  }
);

export const loginThunk = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData) => {
    const loginData = await loginUserApi({ email, password });
    setCookie('accessToken', loginData.accessToken);
    localStorage.setItem('refreshToken', loginData.refreshToken);

    return loginData.user;
  }
);

export const logoutThunk = createAsyncThunk('user/logout', logoutApi);

export const getUserOrdersThunk = createAsyncThunk(
  'user/getOrders',
  getOrdersApi
);

export const updateUserThunk = createAsyncThunk(
  'user/update',
  async ({ email, name, password }: Partial<TRegisterData>) =>
    updateUserApi({ email, name, password })
);

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  orders: TOrder[];
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  orders: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setIsAuthCkecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getUserOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthChecked = true;
    });

    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthChecked = true;
    });

    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null;
    });

    builder.addCase(getUserOrdersThunk.fulfilled, (state, action) => {
      state.orders = action.payload;
    });

    builder.addCase(updateUserThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
  }
});

export const { setUser, setIsAuthCkecked } = userSlice.actions;
export const { getIsAuthChecked, getUser, getUserOrders } = userSlice.selectors;
