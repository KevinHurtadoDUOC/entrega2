import { createContext, useContext } from 'react';
import type { Category, Notice, NoticeType, Product, User } from '../types';

export interface AppContextValue {
  currentUser: User | null;
  products: Product[];
  categories: Category[];
  notice: Notice | null;
  setNotice: (notice: Notice | null) => void;
  showAlert: (message: string, type?: NoticeType, title?: string) => void;
}

export const AppContext = createContext<AppContextValue>({
  currentUser: null,
  products: [],
  categories: [],
  notice: null,
  setNotice: () => {},
  showAlert: () => {},
});

export function useAppContext() {
  return useContext(AppContext);
}
