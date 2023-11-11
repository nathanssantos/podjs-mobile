import axios from 'axios';
import RssParser from 'rss-parser';
import api from './api';

class CollectionService {
  static find = async ({
    term,
    country = 'br',
    limit = 50,
  }: FindParams): Promise<ActionResponse<Collection[]>> => {
    try {
      const params = {
        entity: 'podcast',
        media: 'podcast',
        limit,
      } as FindParams;

      if (typeof term === 'string' && term?.length) params.term = term;
      if (typeof country === 'string' && country?.length) params.country = country;

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

  static findOne = async (id: string): Promise<ActionResponse<Collection>> => {
    try {
      const { status, data } = await api.get(`lookup`, {
        params: {
          id,
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

      const feed = await new RssParser().parseURL(feedUrl);

      const { description, managingEditor, language, copyright, lastBuildDate, items } = feed;

      if (!items.length) {
        return {
          status: 'empty',
        };
      }

      const podcastList = items.map(({ title, link, isoDate, enclosure, content, itunes }) => ({
        title,
        link,
        isoDate,
        enclosure,
        content,
        itunes,
      })) as Podcast[];

      const payload: Collection = {
        id: collectionId,
        name: collectionName,
        items: podcastList,
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
