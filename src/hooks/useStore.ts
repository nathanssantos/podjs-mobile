import { useContext } from 'react';
import { rootStoreContext } from '../store/rootStore';

const useStore = () => useContext(rootStoreContext);

export default useStore;
