/* eslint-disable @typescript-eslint/no-explicit-any */
type FetchStatus = 'idle' | 'fetching' | 'error' | 'empty' | 'success';

type ExploreStackParamList = {
  Explore: any;
  CollectionDetail: any;
};

type PlayerStackParamList = {
  Queue: any;
  Player: any;
};

type StackScreenProps<P, N> = import('@react-navigation/stack').StackScreenProps<P, N>;

type ActionResponse<P> = {
  status: FetchStatus;
  payload?: P;
  message?: string;
};

type FindParams = {
  country?: string;
  term?: string;
  entity?: string;
  limit?: number;
};

type Track = {
  id: string;
  url: string;
  description: string;
  date: string;
  artwork: string;
  duration: number;
  artist: string;
  title: string;
  genre: string;
};

type Collection = {
  id: string;
  artistName: string;
  name: string;
  artworkUrl100: string;
  artworkUrl600: string;
  description: string;
  language: string;
  copyright: string;
  genres: string[];
  feedUrl: string;
  trackCount: number;
  country: string;
  items: Track[];
};
