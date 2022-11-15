import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import UserMediaSt from 'store/user/userMediaSt';
import styled from '@emotion/styled';

type SoundMeterT = {
  animate: boolean;
  userMediaSt: UserMediaSt;
};

const SoundMeter = inject('userMediaSt')(
  observer((props) => {
    const {
      animate,
      userMediaSt: {
        mediaInfo: { stream },
      },
    }: SoundMeterT = props;

    const [animateId, setAnimateId] = useState<number>(0);
    const [volumeValue, setVolumeValue] = useState<number>(0);

    const startSoundAnalyser = () => {
      if (animateId) cancelAnimationFrame(animateId);

      if (stream) {
        const audioContext = new AudioContext();

        const analyserNode = audioContext.createAnalyser();

        const mediaStreamAudioSourceNode = audioContext.createMediaStreamSource(stream);

        mediaStreamAudioSourceNode.connect(analyserNode);

        const pcmData = new Float32Array(analyserNode.fftSize);

        const startAnimate = () => {
          analyserNode.getFloatTimeDomainData(pcmData);

          let sumSquares = 0.0;

          for (const amplitude of pcmData) {
            sumSquares += amplitude * amplitude;
          }

          setVolumeValue(Math.sqrt(sumSquares));
          setAnimateId(requestAnimationFrame(startAnimate));
        };

        startAnimate();
      }
    };

    const SoundMeter = styled.meter`
      width: 100%;
      height: 20px;

      &::-webkit-meter-bar {
        background: #e6e6e6;
        border-radius: 100px;
        box-shadow: none;
        border: none;
      }

      &::-webkit-meter-optimum-value {
        background: #445aff;
      }
    `;

    useEffect(() => {
      if (animate) startSoundAnalyser();

      return () => {
        setVolumeValue(0);
        cancelAnimationFrame(animateId);
      };
    }, [stream]);

    return <SoundMeter value={volumeValue} />;
  }),
);

export default SoundMeter;
