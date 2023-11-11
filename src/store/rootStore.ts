import { configure } from 'mobx';
import { createContext } from 'react';
import CollectionStore from './collectionStore';
import PlayerStore from './playerStore';

export class RootStore {
  collectionStore = new CollectionStore(this);
  playerStore = new PlayerStore(this);

  constructor() {
    configure({ enforceActions: 'never' });
  }

  reset = () => {
    this.collectionStore.reset();
    this.playerStore.reset();
  };
}

const rootStore = new RootStore();

export const rootStoreContext = createContext<RootStore>(rootStore);

export default rootStore;
