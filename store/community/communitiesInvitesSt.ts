import { action, observable, makeObservable } from 'mobx';
import RootStore from '../rootStore';

class CommunitiesInvitesSt {
  // `this` from rootstore passed to the constructor and we can
  // assign it to a variable accessible in this class called
  // `rootStore`. Therefore, we can access other store like
  // useStore for e.g (this.rootStore.profileStore)
  rootStore: RootStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable channels = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  @action createCommunity = () => {};
}

export default CommunitiesInvitesSt;
