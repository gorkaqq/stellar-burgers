import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getBurgerConstructorSelector,
  resetConstructorState
} from '../../features/burger-constructor/burgerConstructorSlice';
import {
  getOrderSelector,
  orderThunk,
  resetOrderState
} from '../../features/order/orderSlice';
import { getUser } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { constructorItems } = useSelector(getBurgerConstructorSelector);
  const user = useSelector(getUser);

  const { orderModalData, orderRequest } = useSelector(getOrderSelector);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;

    if (constructorItems.bun) {
      dispatch(
        orderThunk([
          constructorItems.bun._id,
          ...constructorItems.ingredients.map((item) => item._id),
          constructorItems.bun._id
        ])
      );
    }
  };
  const closeOrderModal = () => {
    dispatch(resetConstructorState());
    dispatch(resetOrderState());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
