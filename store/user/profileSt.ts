import { action, observable, makeObservable } from 'mobx';
import Router from 'next/router';
import { ResponseDataRegT } from 'models/dataProfileStore';
import RootStore from '../rootStore';

type SettingsprofileStoreT = {
  id: null | number;
  username: string;
  darkTheme: boolean;
  emailConfirmed: any;
  invite: any;
  communities: [];
};

type ResponseGetSettings = {
  id: number;
  username: string;
  'dark-theme': boolean;
  language: string;
  avatar: {};
  email: string;
  'email-confirmed': boolean;
  code: string;
  name: string;
  surname: string;
  patronymic: string;
  bio: string;
  group: string;
};

class profileSt {
  // `this` from rootstore passed to the constructor and we can
  // assign it to a variable accessible in this class called
  // `rootStore`. Therefore, we can access other store like
  // useStore for e.g (this.rootStore.profileStore)
  rootStore: RootStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable settings: SettingsprofileStoreT = {
    id: null,
    username: '',
    darkTheme: true,
    emailConfirmed: null,
    invite: null,
    communities: [],
  };

  @action setSettings = (item: string, value) => {
    this.settings[item] = value;
  };

  @action setSettingsSecond = (item: string, secondItem, value) => {
    this.settings[item][secondItem] = value;
  };

  @action getMainSettings = (type: null | string) => {
    this.rootStore
      .fetchData(`${this.rootStore.url}/home/`, 'GET')
      .then((data: ResponseDataRegT) => {
        if (data) {
          const { id, username } = data.user;
          this.setSettings('darkTheme', data.user['dark-theme']);
          this.setSettings('id', id);
          this.setSettings('username', username);
          this.rootStore.communitiesMenuSt.setUserCommunities(data.communities);
          if (type === 'login') {
            Router.push('/home');
          }
        }
        setTimeout(() => {
          this.rootStore.uiSt.setLoading('loading', false);
        }, 500);
      });
  };

  @action getAllSettings = () => {
    this.rootStore
      .fetchData(`${this.rootStore.url}/settings/`, 'GET')
      .then((data: ResponseGetSettings) => {
        if (data) {
          const emailArr = data.email.split('@', 2);
          this.setSettings('emailBefore', emailArr[0]);
          this.setSettings('emailAfter', `@${emailArr[1]}`);
          this.setSettings('emailConfirmed', data['email-confirmed']);
          this.setSettings('avatar', data.avatar);
          this.setSettings('invite', data.code);
        }
      });
  };

  @action saveNewSettings = () => {
    this.rootStore
      .fetchData(`${this.rootStore.url}/settings/`, 'POST', {
        changed: { ...this.settings, 'dark-theme': this.settings.darkTheme },
      })
      .then((data) => {
        console.log(data);
      });
  };

  @action logout = () => {
    this.rootStore
      .fetchData(`${this.rootStore.url}/logout/`, 'POST', { lol: 'kek' })
      .then((data) => {
        if (data?.a) {
          const router = Router;
          router.push('/');
          this.settings = {
            id: null,
            username: '',
            darkTheme: true,
            emailConfirmed: null,
            invite: null,
            communities: [],
          };
        }
      });
  };
}

export default profileSt;
