/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import useWebRTC, { LOCAL_VIDEO } from '../../utils/useWebRTC';
import { ACTIONS } from '../../socket/actions';

function layout(clientsNumber = 1) {
  const pairs = Array.from({ length: clientsNumber }).reduce((acc, next, index, arr) => {
    if (index % 2 === 0) {
      acc.push(arr.slice(index, index + 2));
    }

    return acc;
  }, []);

  const rowsNumber = pairs.length;
  const height = `${100 / rowsNumber}%`;

  return pairs
    .map((row, index, arr) => {
      if (index === arr.length - 1 && row.length === 1) {
        return [
          {
            width: '100%',
            height,
          },
        ];
      }

      return row.map(() => ({
        width: '50%',
        height,
      }));
    })
    .flat();
}

// eslint-disable-next-line react/prop-types
const VideoLayout = ({ socket, roomId, handleToggleJoinCancel }) => {
  const { clients, provideMediaRef, peerConnections, dataChannel } = useWebRTC(socket, roomId);

  const videoLayout = layout(clients.length);

  /* console.log('clients', clients);
  console.log('provideMediaRef', provideMediaRef);
  console.log('videoLayout', videoLayout);
   */

  console.log('peerConnections', Object.keys(peerConnections.current));

  const currentId = Object.keys(peerConnections.current)[0];

  const [clientsList, setClientList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState('');
  const [dataMessage, setDataMessage] = useState('');
  const [handUp, setHandUp] = useState('');


  const [idsClients, setIdsClients] = useState([]);
  const listener = ({ ids = [] }) => {
    setIdsClients(ids.reverse());
  };

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    socket.on(ACTIONS.GET_CLIENTS, listener);

    // Действие при демонтировании
    return () => {
      // eslint-disable-next-line react/prop-types
      socket.off(ACTIONS.GET_CLIENTS, listener);
    };
  }, []);

  useEffect(() => {
    setClientList(idsClients);
  }, [idsClients]);


  useEffect(() => {
    if (dataMessage) {
      setMessageList((prevState) => [...prevState, dataMessage]);
    }
  }, [dataMessage]);

  useEffect(() => {
    if (handUp) {
      setMessageList((prevState) => [...prevState, handUp]);
    }
  }, [handUp]);


  dataChannel.current.onmessage = event => {
    const data = JSON.parse(event.data);
    console.log(data);

    if (data.message) {
      setDataMessage(data.message);
    }

    if (data.handup) {
      setHandUp(data.handup);
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

const handleMessageSend = () => {
  console.log('Send', message);
  // handleSendMessage({ message: 'sdfsddggg' });
  dataChannel.current.send(JSON.stringify({ message: `${currentId} ${message}`}));
  setMessageList((prevState) => [...prevState, `${currentId} ${message}`]);
  setMessage('');
};

  const handleHandUp = () => {
    dataChannel.current.send(JSON.stringify({ handup: `${currentId} поднял руку` }));
  };


  return (
    <Stack direction="column" justifyContent="center" alignItems="center" sx={{ width: '1600px', height: '800px' }}>
      <Stack direction="row" sx={{ width: '100%', height: '95%' }}>
        <Stack sx={{ width: '70%', height: '100%' }} flexWrap="wrap">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',

            }}
          >
            {clients.map((clientID, index) => (
              <div key={clientID} style={videoLayout[index]} id={clientID}>
                <video
                  width="100%"
                  height="100%"
                  ref={(instance) => {
                    provideMediaRef(clientID, instance);
                  }}
                  autoPlay
                  playsInline
                  muted={clientID === LOCAL_VIDEO}
                />
              </div>
            ))}
          </div>
        </Stack>
        <Stack sx={{ width: '30%', height: '100%', p: '5px' }}>
          <Stack sx={{ height: '30%', width: '100%' }}>
            <TextField
              id="outlined-multiline-flexible"
              label="Участники"
              multiline
              maxRows={8}
              value={clientsList}
            />
          </Stack>
          <Stack sx={{ height: '70%',width: '100%' }}>
            <TextField
              id="outlined-chattable-flexible"
              label="Чат"
              multiline
              maxRows={17}
              value={messageList}
            />
            <Stack direction="row" justifyContent="space-between">
              <TextField
                sx={{ width: '345px'}}
                id="outlined-send-message"
                value={message}
                onChange={handleMessageChange}
              />
              <Button
                variant="contained"
                color="info"
                onClick={handleMessageSend}
              >Отправить</Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%', height: '5%' }}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="info"
          >Микрофон</Button>
          <Button
            variant="contained"
            color="info"
          >Камера</Button>
          <Button
            variant="contained"
            color="info"
          >Трансляция экрана</Button>
        </Stack>
        <Stack>
          <Button
            variant="contained"
            color="info"
            onClick={handleHandUp}
          >Поднять руку</Button>
        </Stack>
        <Stack>
          <Button
            variant="contained"
            color="error"
            onClick={handleToggleJoinCancel}
          >Покинуть трансляцию</Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default VideoLayout;
