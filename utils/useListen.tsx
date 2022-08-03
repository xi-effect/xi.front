/* eslint-disable consistent-return */
import { useEffect } from 'react';

function useListen(socket, event, handler, ...deps) {
  useEffect(() => {
    if (socket) {
      console.log('Listening for', event);
      socket.on(event, handler);
      return () => socket.off(event, handler);
    }
  }, [socket, event, handler, ...deps]);
}

export default useListen;
