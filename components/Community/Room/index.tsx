/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import useWebRTC, { LOCAL_VIDEO } from 'utils/useWebRTC';

function layout(clientsNumber = 1) {
  const pairs: any = Array.from({ length: clientsNumber }).reduce((acc, next, index, arr) => {
    if (index % 2 === 0) {
      // @ts-ignore
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

type RoomT = {
  rootStore?: any;
};

const Room: React.FC<RoomT> = ({ rootStore }) => {
  const { clients, provideMediaRef } = useWebRTC(rootStore.socketTest, 1);
  const videoLayout = layout(clients.length);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        height: '100vh',
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
  );
};

export default Room;
