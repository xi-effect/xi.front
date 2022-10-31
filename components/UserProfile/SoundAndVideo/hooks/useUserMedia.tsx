/* eslint-disable no-unused-vars */
import { useState, useEffect, MutableRefObject } from 'react';

type UseUserMediaT = {
  mediaElementRef: MutableRefObject<HTMLAudioElement | null>;
  device: 'audiooutput' | 'audioinput' | 'videoinput';
};

type GetUserMediaT = {
  audioId?: string;
  videoId?: string;
};

export interface MediaElement extends HTMLMediaElement {
  setSinkId(id: string);
}

const useUserMedia = (mediaOptions: UseUserMediaT) => {
  const { mediaDevices } = navigator;
  const { mediaElementRef, device } = mediaOptions;

  const [error, setError] = useState();
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  const getUserMedia = async ({ videoId, audioId }: GetUserMediaT) => {
    try {
      if (stream) stream.getTracks().forEach((track) => track.stop());

      const newStream = await mediaDevices.getUserMedia({
        audio: audioId ? { deviceId: { exact: audioId } } : true,
        video: videoId ? { deviceId: { exact: videoId } } : device === 'videoinput',
      });

      setStream(newStream);

      const devices = await mediaDevices.enumerateDevices();

      setDevices(devices.filter((d) => d.kind === device));
    } catch (e) {
      setError(e);
    }
  };

  const changeDevice = async (id: string) => {
    const element = mediaElementRef.current as MediaElement | null;

    if (device === 'audiooutput') {
      if (element) element.setSinkId(id);
    }

    if (device === 'audioinput' || device === 'videoinput') {
      const deviceId = device === 'audioinput' ? { audioId: id } : { videoId: id };

      await getUserMedia(deviceId);

      mediaElementRef.current?.play();
    }
  };

  useEffect(() => {
    if (mediaElementRef.current) mediaElementRef.current.srcObject = stream;
  }, [stream]);

  useEffect(() => {
    getUserMedia({});
  }, []);

  return { devices, error, stream, changeDevice };
};

export default useUserMedia;
