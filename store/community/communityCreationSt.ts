import { action, observable, makeObservable } from 'mobx';
import Router from 'next/router';
import RootStore from '../rootStore';

class CommunityCreationSt {
  // `this` from rootstore passed to the constructor and we can
  // assign it to a variable accessible in this class called
  // `rootStore`. Therefore, we can access other store like
  // useStore for e.g (this.rootStore.userStore)
  rootStore: RootStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable channels = null;

  @action createCommunity = ({ namecommmunity }) => {
    this.rootStore
      .fetchData(`${this.rootStore.url}/communities/`, 'POST', { name: namecommmunity })
      .then((data) => {
        if (data && data.id) {
          Router.push(`/community/${data.id}`);
        }
      });
  };
}

export default CommunityCreationSt;
