/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useEffect, useRef, useCallback } from 'react';
import { ACTIONS } from 'socket/actions';
import useStateWithCallback from './useStateWithCallback';

export const LOCAL_VIDEO = 'LOCAL_VIDEO';

const config = { iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }] };

const useWebRTC = (socket, roomID) => {
  const [clients, updateClients] = useStateWithCallback([]);

  const addNewClient = useCallback(
    (newClient, cb) => {
      updateClients((list) => {
        if (!list.includes(newClient)) {
          return [...list, newClient];
        }

        return list;
      }, cb);
    },
    [clients, updateClients],
  );

  // храним все peerConnection (мутабельный объект)
  const peerConnections = useRef({});
  // ссылка на локальный медиапоток (видео + аудио)
  const localMediaStream = useRef<MediaStream>();
  // ссылка на всё peerMedia элементы
  const peerMediaElements = useRef({
    [LOCAL_VIDEO]: null,
  });
  // ссылка на канал DataChannel
  const dataChannel = useRef({});

  // Добавление нового соединения
  useEffect(() => {
    // Что мы будем делать, когда добавится новый peer
    // eslint-disable-next-line consistent-return
    async function handleNewPeer({ peerID, createOffer }) {
      if (peerID in peerConnections.current) {
        return console.warn(`Already connected to peer ${peerID}`);
      }

      peerConnections.current[peerID] = new RTCPeerConnection(config);

      peerConnections.current[peerID].ondatachannel = event => {
        dataChannel.current = event.channel;
        dataChannel.current.onopen = () => console.log('Channel opened!');
        /* dataChannel.current.onmessage = event => {
          // console.log('Message:', e.data);
          // dataChannelMessages.current = {message: event.data};
          setMessage(event.data);
        };

         */
      };

      // Когда новый iceCandidate желает подключится. handle event. Когда мы сами создаем или offer или answer
      peerConnections.current[peerID].onicecandidate = (event) => {
        if (event.candidate) {
          // если кандидат существует - Пересылаем другим клиентам
          socket.emit(ACTIONS.RELAY_ICE, {
            peerID,
            iceCandidate: event.candidate,
          });
        }
      };

      // Извлекаем stream, когда приходит новый track
      let tracksNumber = 0;
      peerConnections.current[peerID].ontrack = ({ streams: [remoteStream] }) => {
        tracksNumber += 1; // Увеличиваем каждый раз, как приходит новый track
        // ожидаем принятия audio и video трека !!!
        if (tracksNumber === 2) {
          // video & audio tracks received
          tracksNumber = 0;
          addNewClient(peerID, () => {
            if (peerMediaElements.current[peerID]) {
              peerMediaElements.current[peerID].srcObject = remoteStream;
            } else {
              // FIX LONG RENDER IN CASE OF MANY CLIENTS
              let settled = false;
              const interval = setInterval(() => {
                if (peerMediaElements.current[peerID]) {
                  // начинаем транслировать remoteStream
                  peerMediaElements.current[peerID].srcObject = remoteStream;
                  settled = true;
                }

                if (settled) {
                  clearInterval(interval);
                }
              }, 1000);
            }
          });
        }
      };

      // Добавляем локальный стрим к нашему peerConnection
      if (localMediaStream.current) {
        localMediaStream.current.getTracks().forEach((track) => {
          peerConnections.current[peerID].addTrack(track, localMediaStream.current);
        });
      }

      // Если мы сторона, которая создает offer, то создаем offer
      if (createOffer) {
        dataChannel.current = peerConnections.current[peerID].createDataChannel('data-channel');
        dataChannel.current.onopen = () => console.log('DataChannel opened!');
        /* dataChannel.current.onmessage = event => {
          // console.log('Message: ', event.data);
          // dataChannelMessages.current = {message: event.data};
          setMessage({ message: event.data.message });
        };
         */

        const offer = await peerConnections.current[peerID].createOffer();

        // Устанавливаем offer как localDescription
        await peerConnections.current[peerID].setLocalDescription(offer);

        // Отправляем offer
        socket.emit(ACTIONS.RELAY_SDP, {
          peerID,
          sessionDescription: offer,
        });
      }
    }

    socket.on(ACTIONS.ADD_PEER, handleNewPeer);

    return () => {
      socket.off(ACTIONS.ADD_PEER);
    };
  }, []);

  // Реагируем на sessionDescription
  useEffect(() => {
    async function setRemoteMedia({ peerID, sessionDescription: remoteDescription }) {
      await peerConnections.current[peerID]?.setRemoteDescription(
        new RTCSessionDescription(remoteDescription), // Оборачиваем конструктором RTCSessionDescription
      );

      if (remoteDescription.type === 'offer') {
        const answer = await peerConnections.current[peerID].createAnswer();

        await peerConnections.current[peerID].setLocalDescription(answer);

        socket.emit(ACTIONS.RELAY_SDP, {
          peerID,
          sessionDescription: answer,
        });
      }
    }

    socket.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia);

    return () => {
      socket.off(ACTIONS.SESSION_DESCRIPTION);
    };
  }, []);

  // Реагируем на iceCandidate
  useEffect(() => {
    socket.on(ACTIONS.ICE_CANDIDATE, ({ peerID, iceCandidate }) => {
      peerConnections.current[peerID]?.addIceCandidate(
        new RTCIceCandidate(iceCandidate), // Оборачиваем конструктором RTCIceCandidate
      );
    });

    return () => {
      socket.off(ACTIONS.ICE_CANDIDATE);
    };
  }, []);

  // Удаление соединения
  useEffect(() => {
    const handleRemovePeer = ({ peerID }) => {
      if (peerConnections.current[peerID]) {
        peerConnections.current[peerID].close();
      }

      delete peerConnections.current[peerID];
      delete peerMediaElements.current[peerID];

      updateClients((list) => list.filter((c) => c !== peerID));
    };

    socket.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

    return () => {
      socket.off(ACTIONS.REMOVE_PEER);
    };
  }, []);

  // Реагируем на изменение комнаты
  useEffect(() => {
    // Захватываем медиа-контент
    async function startCapture() {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 1280,
          height: 720,
        },
      });

      addNewClient(LOCAL_VIDEO, () => {
        const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];

        if (localVideoElement) {
          // @ts-ignore
          localVideoElement.volume = 0; // Чтобы не слышать самого себя
          // @ts-ignore
          localVideoElement.srcObject = localMediaStream.current;
        }
      });
    }

    startCapture()
      .then(() => socket.emit(ACTIONS.JOIN, { room: roomID }))
      .catch((e) => console.error('Error getting userMedia:', e));

    return () => {
      if (localMediaStream.current) {
        localMediaStream.current.getTracks().forEach((track) => track.stop());
      }

      socket.emit(ACTIONS.LEAVE);
    };
  }, [roomID]);

  const provideMediaRef = useCallback((id, node) => {
    peerMediaElements.current[id] = node;
  }, []);

  // const handleSendMessage = (message) => dataChannel.current.send(message);

  return {
    clients,
    provideMediaRef,
    peerConnections,
    dataChannel
  };
};

export default useWebRTC;
