import { action, observable, makeObservable } from 'mobx';

class CommunitiesMenuSt {
  // `this` from rootstore passed to the constructor and we can
  // assign it to a variable accessible in this class called
  // `rootStore`. Therefore, we can access other store like
  // useStore for e.g (this.rootStore.userStore)
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable userCommunities = [];

  @action setUserCommunities = (value) => {
    this.userCommunities = value;
  };

  @action removeCommunity = (lid) => {
    const newArray = this.userCommunities;
    this.userCommunities = newArray.filter((item) => item.id !== lid);
  };
}

export default CommunitiesMenuSt;
