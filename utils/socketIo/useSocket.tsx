/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Socket } from 'socket.io-client';
import SocketMock from 'socket.io-mock';
import { url } from './utils/url';
import IoContext from './IoContext';
import {
  IoContextInterface,
  IoNamespace,
  SocketLikeWithNamespace,
  UseSocketOptions,
  UseSocketReturnType,
} from './types';

function useSocket<I extends Record<string, any>, T extends Socket = Socket>(
  namespace?: string | UseSocketOptions<I>,
  options?: UseSocketOptions<I>,
): UseSocketReturnType {
  const opts = {
    namespace: typeof namespace === 'string' ? namespace : '',
    options: typeof namespace === 'object' ? namespace : options,
  };
  // @ts-ignore
  const urlConfig = url(opts.namespace, opts.options?.path || '/socket.io');
  const connectionKey = urlConfig.id;
  const namespaceKey = `${connectionKey}${urlConfig.path}`;

  const enabled = opts.options?.enabled === undefined || opts.options.enabled;
  const { getStatus, createConnection, getError } = React.useContext<
    IoContextInterface<SocketLikeWithNamespace<T>>
  >(IoContext);
  const status = getStatus(namespaceKey);
  const error = getError(namespaceKey);
  const [socket, setSocket] = React.useState<SocketLikeWithNamespace>(new SocketMock());
  const [connected, setConnected] = React.useState<boolean>(false);

  React.useEffect(() => {
    switch (status) {
      case 'connected':
        setConnected(true);
        break;
      case 'disconnected':
        setConnected(false);
        break;
      default:
        break;
    }
  }, [status]);

  React.useEffect(() => {
    if (enabled && typeof window !== 'undefined') {
      const { socket: _socket, cleanup } = createConnection(urlConfig, opts.options)!;
      setSocket(_socket);
      return () => {
        cleanup();
      };
    }
    return () => {};
  }, [createConnection, enabled, opts.options, urlConfig]);

  return {
    socket,
    connected,
    error,
  };
}

export default useSocket;
