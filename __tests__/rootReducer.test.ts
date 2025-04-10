import { expect, test, describe } from '@jest/globals';
import { rootReducer, store } from '../src/services/store';

describe('rootReducer test', () => {
  test('корректное начальное состояние хранилища', () => {
    const expectedInitialState = {
      ingredients: {
        ingredients: [],
        isIngredientsLoading: false,
        error: null
      },
      feeds: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        constructorItems: {
          bun: null,
          ingredients: []
        },
        isLoading: false,
        error: null
      },
      user: {
        user: null,
        isAuthChecked: false,
        orders: []
      },
      order: {
        orderRequest: false,
        orderModalData: null
      }
    };

    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toEqual(expectedInitialState);
  });
});
