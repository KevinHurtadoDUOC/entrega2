import { createContext, useContext } from 'react';
import type { Category, Notice as NoticeType, Product, User } from '../types';

export interface AppContextValue {
  currentUser: User | null;
  products: Product[];
  categories: Category[];
  notice: NoticeType | null;
  setNotice: (notice: NoticeType | null) => void;
}

export const AppContext = createContext<AppContextValue>({
  currentUser: null,
  products: [],
  categories: [],
  notice: null,
  setNotice: () => {},
});

export function useAppContext() {
  return useContext(AppContext);
}
