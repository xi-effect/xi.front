/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import RootStore from 'store/rootStore';
import { io } from 'socket.io-client';
import { ACTIONS } from '../../../socket/actions';
import VideoConference from '../../VideoConference/VideoConference';

// Fake socket
const options = {
  'force new connection': true,
  reconnectionAttemps: "Infinity",
  timeout: 10000,
  transports: ['websocket']
};
const fakeSocket = io('http://localhost:3001', options);

type RoomT = {
  rootStore: RootStore;
};

const Room: React.FC<RoomT> = inject('rootStore')(
  observer((props) => {
    const { rootStore }: RoomT = props;
    const socket = rootStore.socketTest;
    console.log(socket);

    const [rooms, updateRooms] = useState([]);
    const listener = ({ rooms = [] } = {}) => {
      updateRooms(rooms);
    };

    useEffect(() => {
      fakeSocket.on(ACTIONS.SHARE_ROOMS, listener);

      // Действие при демонтировании
      return () => {
        fakeSocket.off(ACTIONS.SHARE_ROOMS, listener);
      };
    }, []);

    return (
      <div>
        <VideoConference socket={fakeSocket} roomId={rooms[0]}/>
      </div>
    );
  }),
);

export default Room;
