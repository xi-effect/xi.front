import { action, observable, makeObservable } from 'mobx';
import { CommunityInSidebar } from 'models/community';
import { UserT } from 'models/user';
import RootStore from '../rootStore';

class UserSt {
  // `this` from rootstore passed to the constructor and we can
  // assign it to a variable accessible in this class called
  // `rootStore`. Therefore, we can access other store like
  // useStore for e.g (this.rootStore.profileStore)
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable user: UserT = {
    id: null, // ID пользователя, уникален
    username: '', // Имя пользователя, может быть неуникальным
    handle: '', // Уникальное имя пользователя, отображается в интерфейсе как основное
    avatar: null, // Аватарка пользователя
    communities: [], // Массив Сообществ
  };

  @action setUser = (item: string, value: string | number | boolean | CommunityInSidebar[]) => {
    this.user[item] = value;
  };

  @action setUserSecond = (item: string, secondItem: string, value: string | number | boolean) => {
    this.user[item][secondItem] = value;
  };

  @action getUser = () => {
    this.rootStore.fetchData(`${this.rootStore.url}/main/`, 'GET').then((data) => {
      if (data) {
        this.setUserAll(data);
      }
    });
  };

  @action setUserAll = (data) => {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key) && key !== 'a') {
        this.setUser(key, data[key]);
      }
    }
  };

  @action setUserDefault = () => {
    this.user = {
      id: null,
      username: '',
      handle: '',
      avatar: null,
      communities: [],
    };
  };

  @action removeCommunity = (lid) => {
    const newArray: CommunityInSidebar[] = this.user.communities;
    this.user.communities = newArray.filter((item) => item.id !== lid);
  };
}

export default UserSt;
