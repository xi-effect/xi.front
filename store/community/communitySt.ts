/* eslint-disable no-shadow */
import { action, observable, makeObservable } from 'mobx';
import RootStore from '../rootStore';

type MetaType = {
  id: null | number;
  name: string;
  description: string;
};

class CommunitySt {
  // `this` from rootstore passed to the constructor and we can
  // assign it to a variable accessible in this class called
  // `rootStore`. Therefore, we can access other store like
  // useStore for e.g (this.rootStore.profileStore)
  rootStore: RootStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable meta: MetaType = {
    id: null,
    name: '',
    description: '',
  };

  @action setMeta = (name: string, value: string) => {
    this.meta[name] = value;
  };

  @action getMeta = (id = null) => {
    this.rootStore
      .fetchData(`${this.rootStore.url}/communities/${id || this.meta.id}/`, 'GET')
      .then(({ id, name, description }) => {
        if (id) this.setMeta('id', id);
        if (name) this.setMeta('name', name);
        if (description) this.setMeta('description', description);
      });
  };
}

export default CommunitySt;
