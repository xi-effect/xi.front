import { makeObservable, observable } from 'mobx';
import RootStore from '../rootStore';

export type ChannelsType = {
  id: number;
  type: string;
  name: string;
  unread?: number;
  open?: boolean;
  subtext?: string;
  children?: ChildrenType[];
};

type ChildrenType = {
  id: number;
  type: string;
  name: string;
};

class HomeChannelsSt {
  // `this` from rootstore passed to the constructor and we can
  // assign it to a variable accessible in this class called
  // `rootStore`. Therefore, we can access other store like
  // useStore for e.g (this.rootStore.profileStore)
  rootStore: RootStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable channels: ChannelsType[] = [
    {
      id: 0,
      type: 'posts',
      name: 'Объявления',
    },
    {
      id: 1,
      type: 'schedule',
      name: 'Календарь',
    },
    {
      id: 2,
      type: 'update',
      name: 'Обновления',
    },
  ];
}

export default HomeChannelsSt;
