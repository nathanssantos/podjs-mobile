import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAutoObservable } from 'mobx';
import CollectionService from '../services/collection';
import normalizeString from '../utils/normalizeString';
import type { RootStore } from './rootStore';

export default class CollectionStore {
  rootStore: RootStore;

  detail: Collection | null = null;
  detailSearchResult: Track[] | null = null;
  detailStatus: FetchStatus = 'idle';
  favorites: Collection[] = [];
  list: Collection[] | null = null;
  listStatus: FetchStatus = 'idle';
  rank: Collection[] | null = null;
  rankCountry: string = '';
  rankStatus: FetchStatus = 'idle';
  searchCountry: string = '';
  searchTerm: string = '';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  addCollectionToFavorites = (collection: Collection) => {
    if (!this.favorites?.find(({ id }) => id === collection.id))
      this.setFavorites([...this.favorites, collection]);
  };

  getDetail = async (collection: Collection): Promise<ActionResponse<Collection>> => {
    try {
      this.setDetailStatus('fetching');
      this.setDetail();
      this.setDetailSearchResult();

      const { status, payload } = await CollectionService.findOne(collection);

      if (payload) {
        this.setDetail(payload);
        this.setDetailSearchResult(payload.items);
      }

      this.setDetailStatus(status);

      return { status };
    } catch (error) {
      console.error('CollectionStore.getDetail');
      console.log({ error });

      this.setDetailStatus('error');

      return { status: 'error' };
    }
  };

  getList = async ({
    term,
    country,
  }: {
    term: string;
    country: string;
  }): Promise<ActionResponse<Collection[]>> => {
    try {
      if (this.list?.length && term === this.searchTerm && country === this.searchCountry)
        return { status: 'success' };

      this.setListStatus('fetching');
      this.setList();

      if (term) this.setSearchTerm(term);
      else this.setSearchTerm();

      if (country) this.setSearchCountry(country);
      else this.setSearchCountry();

      const { status, payload } = await CollectionService.find({ term, country });

      if (payload) this.setList(payload);

      this.setListStatus(status);

      return { status };
    } catch (error) {
      console.error('CollectionStore.getList');
      console.log({ error });

      this.setListStatus('error');

      return { status: 'error' };
    }
  };

  getRank = async (): Promise<ActionResponse<Collection[]>> => {
    try {
      this.setRankStatus('fetching');
      this.setRank();

      const { status, payload } = await CollectionService.findRank({ country: this.rankCountry });

      if (payload) this.setRank(payload);

      this.setRankStatus(status);

      return { status };
    } catch (error) {
      console.error('CollectionStore.getRank');
      console.log({ error });

      this.setRankStatus('error');

      return { status: 'error' };
    }
  };

  getStoredData = async () => {
    const storedFavorites = await AsyncStorage.getItem('@PodJS_favorites');
    const parsedStoredFavorites: Collection[] = storedFavorites ? JSON.parse(storedFavorites) : [];

    const storedRankCountry = await AsyncStorage.getItem('@PodJS_rankCountry');

    this.setFavorites(parsedStoredFavorites);
    this.setRankCountry(storedRankCountry || 'br');
  };

  removeCollectionFromFavorites = (collection: Collection) => {
    const newFavorites = this.favorites.filter(({ id }) => id !== collection.id);
    this.setFavorites(newFavorites);
  };

  reset = () => {
    this.setList();
    this.setRank();
    this.setDetail();
    this.setDetailSearchResult();
    this.setListStatus();
    this.setDetailStatus();
    this.setSearchTerm();
    this.setSearchCountry();
    this.setRankStatus();
  };

  search = ({ term }: { term?: string }) => {
    this.setDetailSearchResult();

    if (!this.detail?.items) return;

    if (term) {
      this.setDetailSearchResult(
        this.detail.items.filter((item) =>
          normalizeString(item.title.toLowerCase()).includes(normalizeString(term.toLowerCase())),
        ),
      );

      return;
    }

    this.setDetailSearchResult(this.detail.items);
  };

  setDetail = (detail?: Collection) => {
    this.detail = detail || null;
  };

  setDetailSearchResult = (detailSearchResult?: Track[]) => {
    this.detailSearchResult = detailSearchResult || [];
  };

  setDetailStatus = (status?: FetchStatus) => {
    this.detailStatus = status || 'idle';
  };

  setFavorites = (favorites?: Collection[]) => {
    this.favorites = favorites || [];
    this.storeFavorites();
  };

  setList = (list?: Collection[]) => {
    this.list = list || null;
  };

  setListStatus = (status?: FetchStatus) => {
    this.listStatus = status || 'idle';
  };

  setRank = (rank?: Collection[]) => {
    this.rank = rank || null;
  };

  setRankCountry = (country?: string) => {
    this.rankCountry = country || '';
    this.storeRankCountry();
  };

  setRankStatus = (status?: FetchStatus) => {
    this.rankStatus = status || 'idle';
  };

  setSearchCountry = (country?: string) => {
    this.searchCountry = country || '';
  };

  setSearchTerm = (term?: string) => {
    this.searchTerm = term || '';
  };

  storeFavorites = async (): Promise<void> => {
    await AsyncStorage.setItem('@PodJS_favorites', JSON.stringify(this.favorites));
  };

  storeRankCountry = async (): Promise<void> => {
    await AsyncStorage.setItem('@PodJS_rankCountry', this.rankCountry);
  };
}
