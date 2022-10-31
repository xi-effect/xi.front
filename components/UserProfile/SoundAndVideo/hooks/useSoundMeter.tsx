import { useEffect, useState } from 'react';

const useSoundMeter = () => {
  const [animateId, setAnimateId] = useState<number>(0);
  const [volumeValue, setVolumeValue] = useState<number>(0);
  const [pcmData, setPcmData] = useState<Float32Array | null>(null);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);

  const stopAnimate = () => {
    setVolumeValue(0);
    cancelAnimationFrame(animateId);
  };

  const startAnimate = () => {
    if (analyserNode && pcmData) {
      analyserNode.getFloatTimeDomainData(pcmData);

      let sumSquares = 0.0;

      for (const amplitude of pcmData) {
        sumSquares += amplitude * amplitude;
      }

      setVolumeValue(Math.sqrt(sumSquares));
      setAnimateId(requestAnimationFrame(startAnimate));
    }
  };

  const createData = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });

    const audioContext = new AudioContext();

    const analyserNode = audioContext.createAnalyser();

    const mediaStreamAudioSourceNode = audioContext.createMediaStreamSource(stream);

    mediaStreamAudioSourceNode.connect(analyserNode);

    const pcmData = new Float32Array(analyserNode.fftSize);

    setPcmData(pcmData);
    setAnalyserNode(analyserNode);
  };

  useEffect(() => {
    createData();

    return () => stopAnimate();
  }, []);

  return { volumeValue, startAnimate, stopAnimate };
};

export default useSoundMeter;
