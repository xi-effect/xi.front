import { createContext, useContext } from 'react';
import RootStore from './rootStore';

const StoreContext = createContext<RootStore>({} as RootStore);
export const StoreProvider = StoreContext.Provider;
export const useStore = (): RootStore => useContext(StoreContext);
