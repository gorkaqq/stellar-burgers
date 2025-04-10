import { expect, test, describe } from '@jest/globals';
import {
  addIngredient,
  burgerConstructorSlice,
  initialState,
  moveIngredient,
  removeIngredient
} from '../src/features/burger-constructor/burgerConstructorSlice';

describe('Тест редьюсера burgerConstructor', () => {
  test('Добавление булки в конструктор', () => {
    const bun = {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    };

    const state = burgerConstructorSlice.reducer(initialState, {
      type: addIngredient.type,
      payload: bun
    });
    expect(state.constructorItems.bun).toEqual(bun);
  });

  test('Добавление ингредиента в конструктор', () => {
    const ingredient = {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0,
      id: '123'
    };

    const action = addIngredient(ingredient);
    const state = burgerConstructorSlice.reducer(initialState, action);
    expect(state.constructorItems.ingredients[0]).toEqual({
      ...ingredient,
      id: expect.any(String)
    });
  });

  test('Удаление ингредиента из конструктора', () => {
    const initialStateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          { ...initialState.constructorItems.ingredients[0], id: '1' },
          { ...initialState.constructorItems.ingredients[0], id: '2' }
        ]
      }
    };
    const action = removeIngredient('1');
    const state = burgerConstructorSlice.reducer(
      initialStateWithIngredients,
      action
    );
    expect(state.constructorItems.ingredients[0].id).toBe('2');
  });

  test('Изменение порядка ингредиентов - "вверх"', () => {
    const initialStateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          { ...initialState.constructorItems.ingredients[0], id: '1' },
          { ...initialState.constructorItems.ingredients[0], id: '2' },
          { ...initialState.constructorItems.ingredients[0], id: '3' }
        ]
      }
    };
    const action = moveIngredient({ id: '2', direction: 'up' });
    const state = burgerConstructorSlice.reducer(
      initialStateWithIngredients,
      action
    );
    expect(state.constructorItems.ingredients[0].id).toBe('2');
    expect(state.constructorItems.ingredients[1].id).toBe('1');
    expect(state.constructorItems.ingredients[2].id).toBe('3');
  });

  test('Изменение порядка ингредиентов - "вниз"', () => {
    const initialStateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          { ...initialState.constructorItems.ingredients[0], id: '1' },
          { ...initialState.constructorItems.ingredients[0], id: '2' },
          { ...initialState.constructorItems.ingredients[0], id: '3' }
        ]
      }
    };
    const action = moveIngredient({ id: '1', direction: 'down' });
    const state = burgerConstructorSlice.reducer(
      initialStateWithIngredients,
      action
    );
    expect(state.constructorItems.ingredients[0].id).toBe('2');
    expect(state.constructorItems.ingredients[1].id).toBe('1');
    expect(state.constructorItems.ingredients[2].id).toBe('3');
  });
});
