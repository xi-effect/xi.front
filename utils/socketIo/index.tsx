import React from 'react';
import socket from 'socket.io-client';

const SocketContext = React.createContext(socket);

export default SocketContext;
