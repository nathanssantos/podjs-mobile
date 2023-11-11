import { makeAutoObservable } from 'mobx';
import TrackPlayer from 'react-native-track-player';
import type { RootStore } from './rootStore';

export default class PlayerStore {
  rootStore: RootStore;

  queue: Track[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  addTrack = async (track: Track) => {
    if (this.queue.some(({ url }) => url === track?.url)) return;

    TrackPlayer.add(track);

    const queue = await TrackPlayer.getQueue();

    this.setQueue(queue);
  };

  getStoredData = () => {
    const storedQeue = localStorage.getItem('@PodJS_queue') || '[]';
    const storedActiveTrack = localStorage.getItem('@PodJS_activeTrack') || 'null';
    const storedCurrentTime = localStorage.getItem('@PodJS_currentTime') || '0';

    const parsedStoredQueue: Track[] = JSON.parse(storedQeue);
    const parsedStoredActiveTrack: Track = JSON.parse(storedActiveTrack);

    if (Array.isArray(parsedStoredQueue) && parsedStoredQueue.length) {
      this.setQueue(parsedStoredQueue);
    }

    if (parsedStoredActiveTrack?.url) TrackPlayer.load(parsedStoredActiveTrack);

    if (storedCurrentTime) TrackPlayer.seekTo(Number(storedCurrentTime));
  };

  removeTrack = async (trackIndex: number) => {
    TrackPlayer.remove(trackIndex);

    const queue = await TrackPlayer.getQueue();

    this.setQueue(queue);
  };

  reset = async () => {
    TrackPlayer.reset();
    this.setQueue();
  };

  setQueue = (queue?: Track[]) => {
    this.queue = queue || [];
    this.storeQueue();
  };

  storeActiveTrack = async () => {
    const [activeTrackIndex, queue] = await Promise.all([
      TrackPlayer.getActiveTrackIndex(),
      TrackPlayer.getQueue(),
    ]);

    if (!activeTrackIndex || !queue.length) return;

    localStorage.setItem('@PodJS_activeTrack', JSON.stringify(queue[activeTrackIndex]));
  };

  storeCurrentTime = (time: number) => {
    localStorage.setItem('@PodJS_currentTime', JSON.stringify(time));
  };

  storeQueue = () => {
    localStorage.setItem('@PodJS_queue', JSON.stringify(this.queue));
  };
}
