import { action, observable, makeObservable } from 'mobx';
import { ResponseDataRegT } from 'models/dataProfileStore';
import { ProfileT } from 'models/profile';
import RootStore from '../rootStore';

class ProfileSt {
  // `this` from rootstore passed to the constructor and we can
  // assign it to a variable accessible in this class called
  // `rootStore`. Therefore, we can access other store like
  // useStore for e.g (this.rootStore.profileStore)
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable profile: ProfileT = {
    email: '',
    confirmed: null,
    invite: null,
    name: '',
    surname: '',
    patronymic: '',
    birthday: null,
  };

  @action setProfile = (item: string, value: string | number | boolean) => {
    this.profile[item] = value;
  };

  @action setProfileSecond = (
    item: string,
    secondItem: string,
    value: string | number | boolean,
  ) => {
    this.profile[item][secondItem] = value;
  };

  @action getProfile = () => {
    this.rootStore
      .fetchData(`${this.rootStore.url} /users/me/profile/`, 'GET')
      .then((data: ResponseDataRegT) => {
        if (data) {
          this.setProfileAll(data);
        }
      });
  };

  @action setProfileAll = (data: ResponseDataRegT) => {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        this.setProfile(key, data[key]);
      }
    }
  };

  @action setProfileDefault = () => {
    this.profile = {
      email: '',
      confirmed: null,
      invite: null,
      name: '',
      surname: '',
      patronymic: '',
      birthday: null,
    };
  };
}

export default ProfileSt;
