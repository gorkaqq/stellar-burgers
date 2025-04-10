import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TBurgerConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  isLoading: boolean;
  error?: string | null;
};

export const initialState: TBurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  isLoading: false,
  error: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },

    moveIngredient: (
      state,
      action: PayloadAction<{ id: string; direction: 'up' | 'down' }>
    ) => {
      const { id, direction } = action.payload;
      const ingredients = state.constructorItems.ingredients;
      const index = ingredients.findIndex((item) => item.id === id);

      if (index === -1) return;

      if (direction === 'up' && index > 0) {
        [ingredients[index], ingredients[index - 1]] = [
          ingredients[index - 1],
          ingredients[index]
        ];
      } else if (direction === 'down' && index < ingredients.length - 1) {
        [ingredients[index], ingredients[index + 1]] = [
          ingredients[index + 1],
          ingredients[index]
        ];
      }
    },

    resetConstructorState: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
    }
  },
  selectors: {
    getBurgerConstructorSelector: (state) => state
  }
});

export const { getBurgerConstructorSelector } =
  burgerConstructorSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructorState
} = burgerConstructorSlice.actions;
