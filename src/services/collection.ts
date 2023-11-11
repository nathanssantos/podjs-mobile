import axios from 'axios';
import RssParser from 'rss-parser';
import { v4 as uuid } from 'uuid';
import api from './api';

const rssParser = new RssParser();

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

      const { status, data } = await api.get(`search`, {
        params,
      });

      if (status === 200 && !data?.results.length) {
        return {
          status: 'empty',
        };
      }

      const payload: Collection[] = data.results;

      return {
        payload,
        status: 'success',
      };
    } catch (error) {
      console.error('Collection.find');
      console.log({ error });

      return {
        status: 'error',
      };
    }
  };

  static findOne = async (collection: Collection): Promise<ActionResponse<Collection>> => {
    try {
      const { status, data } = await api.get(`lookup`, {
        params: {
          id: collection.id,
        },
      });

      if (status === 200 && !data?.results?.[0]) {
        return {
          status: 'empty',
        };
      }

      const {
        collectionId,
        artistName,
        collectionName,
        feedUrl,
        artworkUrl100,
        artworkUrl600,
        genres,
        primaryGenreName,
        trackCount,
        country,
      } = data.results[0];

      const feed = await rssParser.parseURL(feedUrl);

      const { description, managingEditor, language, copyright, lastBuildDate, items } = feed;

      if (!items.length) {
        return {
          status: 'empty',
        };
      }

      const trackList: Track[] = items.map(
        ({ title, genre, isoDate, enclosure, content, itunes }) => ({
          id: uuid(),
          description: itunes.summary || content,
          date: isoDate,
          url: enclosure?.url,
          artwork: itunes?.image || artworkUrl100,
          duration: itunes?.length,
          artist: artistName,
          title,
          genre,
        }),
      ) as Track[];

      const payload: Collection = {
        id: collectionId,
        name: collectionName,
        items: trackList,
        artistName,
        feedUrl,
        artworkUrl100,
        artworkUrl600,
        genres,
        description,
        managingEditor,
        language,
        copyright,
        lastBuildDate,
        primaryGenreName,
        trackCount,
        country,
      };

      return {
        payload,
        status: 'success',
      };
    } catch (error) {
      console.error('Collection.findOne');
      console.log({ error });

      return {
        status: 'error',
      };
    }
  };

  static findRank = async ({
    country = 'br',
    limit = 10,
  }: FindParams): Promise<ActionResponse<Collection[]>> => {
    try {
      const { status, data } = await axios.get(
        `https://rss.applemarketingtools.com/api/v2/${country}/podcasts/top/${limit}/podcasts.json`,
      );

      if (status === 200 && !data?.feed?.results?.length) {
        return {
          status: 'empty',
        };
      }

      const payload: Collection[] = data.feed.results.map(
        ({
          id,
          artistName,
          name,
          artworkUrl100,
          genres,
        }: {
          artistName: string;
          id: string;
          name: string;
          artworkUrl100: string;
          genres: { name: string }[];
        }) => ({
          id,
          artistName,
          name,
          artworkUrl100,
          genres,
          primaryGenreName: genres?.[0]?.name || '',
        }),
      );

      return {
        payload,
        status: 'success',
      };
    } catch (error) {
      console.error('Collection.findRank');
      console.log({ error });

      return {
        status: 'error',
      };
    }
  };
}

export default CollectionService;
