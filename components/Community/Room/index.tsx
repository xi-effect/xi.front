/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react';
import { inject, observer } from 'mobx-react';
import RootStore from 'store/rootStore';

type RoomT = {
  rootStore: RootStore;
};

const Room: React.FC<RoomT> = inject('rootStore')(
  observer(() => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      1
    </div>
  )),
);

export default Room;
