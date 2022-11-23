/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import { action, makeObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react';
import { useMemo } from 'react';
import Router from 'next/router';

import { io, Socket } from 'socket.io-client';
import UISt from './ui/uiSt';
import HomeSt from './home/homeSt';
import ProfileSt from './user/profileSt';
import UserSt from './user/userSt';
import AuthorizationSt from './user/authorizationSt';
import CommunitySt from './community/communitySt';
import CommunityCreationSt from './community/communityCreationSt';
import CommunityChannelsSt from './community/communityChannelsSt';
import CommunitiesInvitesSt from './community/communitiesInvitesSt';
import CommunitySettingsSt from './community/communitySettingsSt';
import UserMediaSt from './user/userMediaSt';

enableStaticRendering(typeof window === 'undefined');

let store;

type MethodT = 'GET' | 'POST' | 'DELETE' | 'PATCH';

class RootStore {
  uiSt: UISt;

  homeSt: HomeSt;

  profileSt: ProfileSt;

  userSt: UserSt;

  userMediaSt: UserMediaSt;

  communitySt: CommunitySt;

  authorizationSt: AuthorizationSt;

  communityCreationSt: CommunityCreationSt;

  communityChannelsSt: CommunityChannelsSt;

  communitySettingsSt: CommunitySettingsSt;

  communitiesInvitesSt: CommunitiesInvitesSt;

  url = process.env.NEXT_PUBLIC_SERVER_URL;

  constructor() {
    this.uiSt = new UISt(this);
    this.homeSt = new HomeSt(this);

    this.profileSt = new ProfileSt(this);
    this.userSt = new UserSt(this);
    this.userMediaSt = new UserMediaSt(this);
    this.authorizationSt = new AuthorizationSt(this);

    // Community Stores
    this.communitySt = new CommunitySt(this);
    this.communityCreationSt = new CommunityCreationSt(this);
    this.communityChannelsSt = new CommunityChannelsSt(this);
    this.communitySettingsSt = new CommunitySettingsSt(this);

    // Communities Stores
    this.communitiesInvitesSt = new CommunitiesInvitesSt(this);

    makeObservable(this);
  }

  socket: null | Socket = null;

  @action initSocket = () => {
    this.socket = io('https://xieffect.ru:5000/', {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });
  };

  @action fetchData = async (url: string, method: MethodT, data?: unknown) => {
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

  @action signout = () => {
    this.fetchData(`${this.url}/signout/`, 'POST', { lol: 'kek' }).then((data) => {
      if (data?.a) {
        const router = Router;
        router.push('/');
        this.profileSt.setProfileDefault();
        this.userSt.setUserDefault();
        this.uiSt.setDialogsFalse();
      }
    });
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

export function useStoreInitialized(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}

export default RootStore;
