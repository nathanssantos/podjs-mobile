import axios from 'axios';
import { parse } from 'react-native-rss-parser';
import { v4 as uuid } from 'uuid';
import api from './api';
import { TrackType } from 'react-native-track-player';

class CollectionService {
  static find = async ({
    country = 'br',
    entity = 'podcast',
    limit = 50,
    term,
  }: FindParams): Promise<ActionResponse<Collection[]>> => {
    try {
      const params = {
        country,
        entity,
        limit,
        media: entity,
      } as FindParams;

      if (term) params.term = term;

      const { status, data } = await api.get(`search`, { params });

      if (status === 200 && !data?.results.length) return { status: 'empty' };

      const payload: Collection[] = data.results.map(
        ({ collectionId, collectionName, ...rest }: { collectionId: number; collectionName: string }) => ({
          ...rest,
          id: String(collectionId),
          name: collectionName,
        }),
      );

      console.log('chamou');

      return {
        payload,
        status: 'success',
      };
    } catch (error) {
      console.error('CollectionService.find');
      console.error({ error });

      return { status: 'error' };
    }
  };

  static findOne = async ({ id }: { id: string }): Promise<ActionResponse<Collection>> => {
    try {
      const { status, data } = await api.get(`lookup`, { params: { id } });

      if (status === 200 && !data?.results?.[0]) return { status: 'empty' };

      const {
        collectionId,
        artistName,
        collectionName,
        feedUrl,
        artworkUrl100,
        artworkUrl600,
        genres,
        trackCount,
        country,
      } = data.results[0];

      const { data: feed } = await axios.get(feedUrl);

      const parsedFeed = await parse(feed);

      const { description, language, copyright, items } = parsedFeed;

      if (!items.length) return { status: 'empty' };

      const trackList: Track[] = items.map(
        ({ id, title, description, categories, authors, published, enclosures, itunes }) => ({
          id: id || uuid(),
          url: enclosures?.[0]?.url || '',
          description: itunes?.summary || description || '',
          date: published || '',
          artwork: itunes?.image || artworkUrl100 || '',
          duration: Number(itunes?.duration) || 0,
          artist: artistName || authors?.[0]?.name || '',
          title: title || '',
          genre: categories?.[0]?.name || '',
          type: TrackType.SmoothStreaming,
        }),
      );

      const payload: Collection = {
        id: String(collectionId),
        name: collectionName,
        items: trackList,
        description: description || '',
        copyright: copyright || '',
        artistName,
        feedUrl,
        artworkUrl100,
        artworkUrl600,
        genres,
        language,
        trackCount,
        country,
      };

      return {
        payload,
        status: 'success',
      };
    } catch (error) {
      console.error('CollectionService.findOne');
      console.error({ error });

      return { status: 'error' };
    }
  };

  static findRank = async ({
    country = 'br',
    limit = 20,
  }: FindParams): Promise<ActionResponse<Collection[]>> => {
    try {
      const { status, data } = await axios.get(
        `https://rss.applemarketingtools.com/api/v2/${country}/podcasts/top/${limit}/podcasts.json`,
      );

      if (status === 200 && !data?.feed?.results?.length) return { status: 'empty' };

      const payload: Collection[] = data.feed.results;

      return {
        payload,
        status: 'success',
      };
    } catch (error) {
      console.error('CollectionService.findRank');
      console.error({ error });

      return { status: 'error' };
    }
  };
}

export default CollectionService;
