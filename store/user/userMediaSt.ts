import { action, observable, makeObservable } from 'mobx';
import RootStore from '../rootStore';

type OptionsT = {
  audioId?: string;
  videoId?: string;
  enableVideo?: boolean;
};

export type UserMediaInfoT = {
  error: string | null;
  stream: MediaStream | null;
  devices: MediaDeviceInfo[];
};

export interface MediaElement extends HTMLMediaElement {
  setSinkId(id: string);
}

class UserMediaSt {
  rootStore: RootStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable mediaInfo: UserMediaInfoT = {
    devices: [],
    error: null,
    stream: null,
  };

  @action setMediaInfo = (item: string, value) => {
    this.mediaInfo[item] = value;
  };

  @action startStream = async (options: OptionsT) => {
    try {
      const { enableVideo, videoId, audioId } = options;

      this.stopStream();

      const { mediaDevices } = navigator;

      const stream = await mediaDevices.getUserMedia({
        audio: audioId ? { deviceId: { exact: audioId } } : true,
        video: videoId ? { deviceId: { exact: videoId } } : !!enableVideo,
      });

      const devices = await mediaDevices.enumerateDevices();

      this.setMediaInfo('stream', stream);
      this.setMediaInfo('devices', devices);
    } catch (e) {
      this.setMediaInfo('error', e);
    }
  };

  @action stopStream = () => this.mediaInfo.stream?.getTracks().forEach((track) => track.stop());
}

export default UserMediaSt;
