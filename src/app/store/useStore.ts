import { StoreContext } from '@/app/store/provider';
import { useContext } from 'react';

export const useStores = () => {
  return useContext(StoreContext);
};
