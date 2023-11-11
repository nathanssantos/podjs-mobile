type FetchStatus = 'idle' | 'fetching' | 'error' | 'empty' | 'success';

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

type Track = import('react-native-track-player').Track;

// type Podcast = {
//   title: string;
//   link: string;
//   isoDate: string;
//   enclosure: import('rss-parser').Enclosure;
//   content: string;
//   itunes: {
//     summary: string;
//     duration: string;
//     image: string;
//   };
//   imageFallback?: string;
// };

type Collection = {
  id: string;
  artistName: string;
  name: string;
  artworkUrl100: string;
  artworkUrl600: string;
  description?: string;
  managingEditor: string;
  language: string;
  copyright: string;
  lastBuildDate: string;
  primaryGenreName: string;
  genres: string[];
  feedUrl: string;
  trackCount: number;
  country: string;
  items: Podcast[];
};
