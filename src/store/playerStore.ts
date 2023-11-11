import { makeAutoObservable } from 'mobx';
import type { RootStore } from './rootStore';

export default class PlayerStore {
  rootStore: RootStore;

  currentPodcast: Podcast | null = null;
  playList: Podcast[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  addPodcastToPlayList = (podcast: Podcast) => {
    if (!this.playList.find(({ enclosure }) => enclosure.url === podcast?.enclosure?.url)) {
      this.setPlayList([...this.playList, podcast]);
    }
  };

  getStoredData = () => {
    const storedPlayList = localStorage.getItem('playList') || '[]';
    const storedCurrentPodcast = localStorage.getItem('currentPodcast') || 'null';
    const storedCurrentTime = localStorage.getItem('currentTime') || '0';

    const parsedStoredPlayList: Podcast[] = JSON.parse(storedPlayList);
    const parsedStoredCurrentPodcast: Podcast = JSON.parse(storedCurrentPodcast);

    if (Array.isArray(parsedStoredPlayList) && parsedStoredPlayList.length) {
      this.setPlayList(parsedStoredPlayList);
    }

    if (parsedStoredCurrentPodcast?.enclosure?.url) {
      this.setCurrentPodcast(parsedStoredCurrentPodcast);
    }

    if (storedCurrentTime) {
      const audio = document.querySelector('audio');
      if (audio) audio.currentTime = Number(storedCurrentTime);
    }
  };

  next = () => {
    let continueLoop = true;

    this.playList.forEach((podcast, index) => {
      const nextPodcast = this.playList[index + 1];

      if (
        continueLoop &&
        nextPodcast &&
        podcast.enclosure.url === this.currentPodcast?.enclosure.url
      ) {
        this.setCurrentPodcast(nextPodcast);

        continueLoop = false;
      }
    });
  };

  previous = () => {
    this.playList.forEach((podcast, index) => {
      const previousPodcast = this.playList[index - 1];

      if (previousPodcast && podcast.enclosure.url === this.currentPodcast?.enclosure.url) {
        this.setCurrentPodcast(previousPodcast);
      }
    });
  };

  removePodcastFromPlaylist = (podcast: Podcast) => {
    const newPlaylist = this.playList.filter(
      ({ enclosure }) => enclosure.url !== podcast?.enclosure?.url,
    );

    if (!newPlaylist.length || podcast.enclosure.url === this.currentPodcast?.enclosure.url) {
      this.setCurrentPodcast();

      const audio = document.querySelector('audio');

      if (audio) {
        audio.src = '';
        audio.currentTime = 0;
        audio.pause();
      }
    }

    this.setPlayList(newPlaylist);
  };

  reset = () => {
    this.setCurrentPodcast();
    this.setPlayList();
  };

  setCurrentPodcast = (podcast?: Podcast) => {
    this.currentPodcast = podcast || null;
    this.storeCurrentPodcast();
  };

  setPlayList = (playlist?: Podcast[]) => {
    this.playList = playlist || [];
    this.storePlaylist();
  };

  storeCurrentPodcast = () => {
    localStorage.setItem('currentPodcast', JSON.stringify(this.currentPodcast));
  };

  storeCurrentTime = (time: number) => {
    localStorage.setItem('currentTime', JSON.stringify(time));
  };

  storePlaylist = () => {
    localStorage.setItem('playList', JSON.stringify(this.playList));
  };
}
