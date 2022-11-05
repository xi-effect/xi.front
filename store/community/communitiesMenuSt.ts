import { action, observable, makeObservable } from 'mobx';
import { RegCommunityT } from 'models/dataProfileStore';
import RootStore from '../rootStore';

class CommunitiesMenuSt {
  // `this` from rootstore passed to the constructor and we can
  // assign it to a variable accessible in this class called
  // `rootStore`. Therefore, we can access other store like
  // useStore for e.g (this.rootStore.profileStore)
  rootStore: RootStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable userCommunities: RegCommunityT[] = [];

  @action setUserCommunities = (value) => {
    this.userCommunities = value;
  };

  @action removeCommunity = (lid) => {
    const newArray: RegCommunityT[] = this.userCommunities;
    this.userCommunities = newArray.filter((item) => item.id !== lid);
  };
}

export default CommunitiesMenuSt;
