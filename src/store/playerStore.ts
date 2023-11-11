import { makeAutoObservable } from 'mobx';
import TrackPlayer, { Capability, RepeatMode } from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RootStore } from './rootStore';

export default class PlayerStore {
  rootStore: RootStore;

  queue: Track[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;

    this.setupPlayer();
  }

  setupPlayer = async () => {
    await TrackPlayer.setupPlayer();

    const { Play, Pause, Stop, SkipToNext, SkipToPrevious, SeekTo } = Capability;

    await TrackPlayer.updateOptions({
      capabilities: [Play, Pause, Stop, SkipToNext, SkipToPrevious, SeekTo],
      compactCapabilities: [Play, Pause],
      notificationCapabilities: [Play, Pause],
    });

    TrackPlayer.setRepeatMode(RepeatMode.Queue);
  };

  addTrack = async (track: Track) => {
    if (this.queue.some(({ url }) => url === track?.url)) return;

    TrackPlayer.add(track);

    const queue = await TrackPlayer.getQueue();

    this.setQueue(queue as Track[]);
  };

  getStoredData = async () => {
    const storedQueue = await AsyncStorage.getItem('@PodJS_queue');
    const storedActiveTrack = await AsyncStorage.getItem('@PodJS_activeTrack');
    const storedCurrentTime = await AsyncStorage.getItem('@PodJS_currentTime');

    const parsedStoredQueue: Track[] = storedQueue ? JSON.parse(storedQueue) : [];
    const parsedStoredActiveTrack: Track = storedActiveTrack ? JSON.parse(storedActiveTrack) : null;

    this.setQueue(parsedStoredQueue);

    if (parsedStoredActiveTrack?.url) TrackPlayer.load(parsedStoredActiveTrack);

    if (storedCurrentTime) TrackPlayer.seekTo(Number(storedCurrentTime));
  };

  removeTrack = async (trackIndex: number) => {
    TrackPlayer.remove(trackIndex);

    const queue = await TrackPlayer.getQueue();

    this.setQueue(queue as Track[]);
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
    const [activeTrackIndex, queue] = await Promise.all([TrackPlayer.getActiveTrackIndex(), TrackPlayer.getQueue()]);

    if (!activeTrackIndex || !queue.length) return;

    AsyncStorage.setItem('@PodJS_activeTrack', JSON.stringify(queue[activeTrackIndex]));
  };

  storeCurrentTime = (time: number) => {
    AsyncStorage.setItem('@PodJS_currentTime', JSON.stringify(time));
  };

  storeQueue = () => {
    AsyncStorage.setItem('@PodJS_queue', JSON.stringify(this.queue));
  };
}
