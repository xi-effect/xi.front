import { action, observable, makeObservable } from 'mobx';
import Router from 'next/router';
import RootStore from "../rootStore";
import {ResponseDataRegT} from "../../utils/dataUserStore";

type SettingsUserStoreT = {
  id: null | number,
  avatar: SettingsAvatarStoreT ,
  username: string,
  darkTheme: boolean,
  emailConfirmed: any,
  invite: any,
  communities: [],
};

type SettingsAvatarStoreT = {
  topType: number,
  accessoriesType: number,
  hairColor: number,
  facialHairType: number,
  clotheType: number,
  eyeType: number,
  eyebrowType: number,
  mouthType: number,
  skinColor: number,
  bgcolor: number,
};
type ResponseGetSettings = {
  id: number,
  username: string,
  "dark-theme": boolean,
  language: string,
  avatar: {},
  email: string,
  "email-confirmed": boolean,
  code: string,
  name: string,
  surname: string,
  patronymic: string,
  bio: string,
  group: string,
};

class UserSt {
  // `this` from rootstore passed to the constructor and we can
  // assign it to a variable accessible in this class called
  // `rootStore`. Therefore, we can access other store like
  // useStore for e.g (this.rootStore.userStore)
  rootStore: RootStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable settings:SettingsUserStoreT = {
    id: null,
    avatar: {
      topType: 0,
      accessoriesType: 0,
      hairColor: 0,
      facialHairType: 0,
      clotheType: 0,
      eyeType: 0,
      eyebrowType: 0,
      mouthType: 0,
      skinColor: 0,
      bgcolor: 0,
    },
    username: '',
    darkTheme: true,
    emailConfirmed: null,
    invite: null,
    communities: [],
  };

  @action setSettings = (item:string, value) => {
    this.settings[item] = value;
  };

  @action setSettingsSecond = (item:string, secondItem, value) => {
    this.settings[item][secondItem] = value;
  };

  @action getMainSettings = (type = null) => {
    this.rootStore.fetchData(`${this.rootStore.url}/home/`, 'GET').then((data: ResponseDataRegT) => {
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
    this.rootStore.fetchData(`${this.rootStore.url}/settings/`, 'GET').then((data:ResponseGetSettings) => {
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
          router.push('/signin');
          this.settings = {
            id: null,
            avatar: {
              topType: 0,
              accessoriesType: 0,
              hairColor: 0,
              facialHairType: 0,
              clotheType: 0,
              eyeType: 0,
              eyebrowType: 0,
              mouthType: 0,
              skinColor: 0,
              bgcolor: 0,
            },
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

export default UserSt;
