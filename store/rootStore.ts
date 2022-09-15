/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import { action, makeObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react';
import { useMemo } from 'react';
import Router from 'next/router';

import { io, Socket } from 'socket.io-client';
import UISt from './ui/uiSt';
import HomeSt from './home/homeSt';
import UserSt from './user/userSt';
import AuthorizationSt from './user/authorizationSt';
import CommunitySt from './community/communitySt';
import CommunityCreationSt from './community/communityCreationSt';
import CommunitiesMenuSt from './community/communitiesMenuSt';
import CommunityChannelsSt from './community/communityChannelsSt';
import CommunitiesInvitesSt from './community/communitiesInvitesSt';
import CommunitySettingsSt from './community/communitySettingsSt';

enableStaticRendering(typeof window === 'undefined');

let store;

type MethodT = 'GET' | 'POST' | 'DELETE' | 'PATCH';
class RootStore {
  uiSt: UISt;

  homeSt: HomeSt;

  userSt: UserSt;

  authorizationSt: AuthorizationSt;

  communitySt: CommunitySt;

  communityCreationSt: CommunityCreationSt;

  communityChannelsSt: CommunityChannelsSt;

  communitySettingsSt: CommunitySettingsSt;

  communitiesInvitesSt: CommunitiesInvitesSt;

  communitiesMenuSt: CommunitiesMenuSt;

  url = process.env.NEXT_PUBLIC_SERVER_URL;

  constructor() {
    this.uiSt = new UISt(this);
    this.homeSt = new HomeSt(this);
    this.userSt = new UserSt(this);
    this.authorizationSt = new AuthorizationSt(this);

    // Community Stores
    this.communitySt = new CommunitySt(this);
    this.communityCreationSt = new CommunityCreationSt(this);
    this.communityChannelsSt = new CommunityChannelsSt(this);
    this.communitySettingsSt = new CommunitySettingsSt(this);

    // Communities Stores
    this.communitiesInvitesSt = new CommunitiesInvitesSt(this);
    this.communitiesMenuSt = new CommunitiesMenuSt(this);

    makeObservable(this);
  }

  socket: null | Socket = null;

  @action initSocket = () => {
    this.socket = io('https://xieffect.ru:5000/', {
      withCredentials: true,
    });
  };

  socketTest: null | Socket = null;

  @action initSocketTest = () => {
    this.socketTest = io('https://xieffect.ru:8000/');
    console.log('this.socketTest', this.socketTest);
  };

  @action fetchData = async (url: string, method: MethodT, data?: any) => {
    try {
      let response: null | Response = null;
      if (data != null) {
        response = await fetch(url, {
          method,
          cache: 'no-cache',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      }
      if (data == null) {
        response = await fetch(url, {
          method,
          cache: 'no-cache',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      if (response?.status === 401 || response?.status === 403 || response?.status === 422) {
        const router = Router;
        await router.push('/');
        return null;
      }
      if (response?.ok) {
        const string = await response?.text();
        const json = string === '' ? {} : JSON.parse(string);
        return json;
      }
    } catch (error) {
      console.log('Возникла проблема с вашим fetch запросом: ', error.message);
    }
  };
}

function initializeStore(initialData = null) {
  // eslint-disable-next-line no-underscore-dangle
  const _store = store ?? new RootStore();

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here
  if (initialData) {
    _store.hydrate(initialData);
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
export default RootStore;
