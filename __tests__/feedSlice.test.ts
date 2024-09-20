import { expect, test, describe } from '@jest/globals';
import { feedsSlice, getFeedsThunk } from '../src/features/feeds/feedsSlice';
import { error } from 'console';

describe('feedsSlice reducers', () => {
  const initialState = {
    orders: [
      {
        _id: '0003',
        status: 'status',
        name: 'name',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        number: 123,
        ingredients: ['a', 'b', 'c']
      }
    ],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null
  };

  test('Обработка getFeedsThunk.fulfilled', () => {
    const newState = feedsSlice.reducer(initialState, {
      type: getFeedsThunk.fulfilled.type,
      payload: initialState
    });
    expect(newState).toEqual({
      ...initialState,
      isLoading: false,
      error: null
    });
  });

  test('Обработка getFeedsThunk.pending', () => {
    const newState = feedsSlice.reducer(initialState, {
      type: getFeedsThunk.pending.type
    });
    expect(newState).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  test('Обработка getFeedsThunk.error', () => {
    const newState = feedsSlice.reducer(initialState, {
      type: getFeedsThunk.rejected.type,
      error: { message: 'error message' }
    });
    expect(newState).toEqual({
      ...initialState,
      isLoading: false,
      error: 'error message'
    });
  });
});
