import { ReactNode } from 'react';
import rootStore, { rootStoreContext } from './rootStore';

const Provider = rootStoreContext.Provider;

const RootStoreProvider = ({ children }: { children: ReactNode }) => <Provider value={rootStore}>{children}</Provider>;

export default RootStoreProvider;
