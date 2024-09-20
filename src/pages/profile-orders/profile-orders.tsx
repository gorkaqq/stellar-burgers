import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getUserOrders,
  getUserOrdersThunk
} from '../../features/user/userSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrdersThunk());
  }, []);

  const orders = useSelector(getUserOrders);
  return <ProfileOrdersUI orders={orders} />;
};
