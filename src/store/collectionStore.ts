import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import normalizeString from '../utils/normalizeString';
import api from '../services/api';
import type { RootStore } from './rootStore';

export default class CollectionStore {
  rootStore: RootStore;

  detail: Collection | null = null;
  detailSearchResult: Podcast[] | null = null;
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
    if (!this.favorites?.find(({ id }) => id === collection.id)) {
      this.setFavorites([...this.favorites, collection]);
    }
  };

  getDetail = async (collection: Collection): Promise<ActionResponse<Podcast>> => {
    try {
      this.setDetailStatus('fetching');
      this.setDetail();
      this.setDetailSearchResult();

      const { status, data } = await api.get(`/api/collections/${collection.id}`);

      if (status === 200 && !data) {
        this.setDetailStatus('empty');

        return {
          status: 'empty',
        };
      }

      this.setDetail(data);
      this.setDetailSearchResult(data.items);
      this.setDetailStatus('success');

      return {
        status: 'success',
      };
    } catch (error) {
      console.error('Collection.getDetail');
      console.log({ error });

      this.setDetailStatus('error');

      return {
        status: 'error',
      };
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
      if (this.list?.length && term === this.searchTerm && country === this.searchCountry) {
        return {
          status: 'success',
        };
      }

      this.setListStatus('fetching');
      this.setList();

      const params: { term: string; country: string } = { term: '', country: '' };

      if (term) {
        this.setSearchTerm(term);
        params.term = term;
      } else {
        this.setSearchTerm();
      }

      if (country) {
        this.setSearchCountry(country);
        params.country = country;
      } else {
        this.setSearchCountry();
      }

      const { data } = await api.get<Collection[]>('/api/collections', { params });

      if (!data?.length) {
        this.setListStatus('empty');

        return {
          status: 'empty',
        };
      }

      this.setList(data);
      this.setListStatus('success');

      return {
        status: 'success',
      };
    } catch (error) {
      console.error('Collection.getList');
      console.log({ error });

      this.setListStatus('error');

      return {
        status: 'error',
      };
    }
  };

  getRank = async (): Promise<ActionResponse<Collection[]>> => {
    try {
      this.setRankStatus('fetching');
      this.setRank();

      const params: { country: string } = { country: this.rankCountry };

      const { status, data } = await api.get<Collection[]>('/api/collections/rank', {
        params,
      });

      if (status === 200 && !data?.length) {
        this.setRankStatus('empty');

        return {
          status: 'empty',
        };
      }

      this.setRank(data);
      this.setRankStatus('success');

      return {
        status: 'success',
      };
    } catch (error) {
      console.error('Collection.getRank');
      console.log({ error });

      this.setRankStatus('error');

      return {
        status: 'error',
      };
    }
  };

  getStoredData = async () => {
    const storedFavorites = await AsyncStorage.getItem('@PodJS_favorites');
    const parsedStoredFavorites: Collection[] = JSON.parse(storedFavorites || '[]');

    const storedRankCountry = await AsyncStorage.getItem('@PodJS_rankCountry');
    const parsedStoredRankCountry: string = storedRankCountry || 'br';

    if (parsedStoredFavorites?.length) this.setFavorites(parsedStoredFavorites);
    if (parsedStoredRankCountry?.length) this.setRankCountry(parsedStoredRankCountry);
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

    if (term?.length) {
      this.setDetailSearchResult(
        this.detail.items.filter((item) =>
          normalizeString(item.title.toLowerCase()).includes(
            normalizeString(term.toLowerCase()),
          ),
        ),
      );

      return;
    }

    this.setDetailSearchResult(this.detail.items);
  };

  setDetail = (detail?: Collection) => {
    this.detail = detail || null;
  };

  setDetailSearchResult = (detailSearchResult?: Podcast[]) => {
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
