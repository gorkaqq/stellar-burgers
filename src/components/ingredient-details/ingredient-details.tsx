import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { getIngredientsSelector } from '../../features/ingredients/ingredientsSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { ingredients, isIngredientsLoading } = useSelector(
    getIngredientsSelector
  );
  const { id } = useParams();
  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData || isIngredientsLoading) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
