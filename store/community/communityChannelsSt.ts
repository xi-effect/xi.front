import { action, observable, makeObservable } from 'mobx';
import RootStore from '../rootStore';

type ChannelsType = {
  id: number;
  type: string;
  name: string;
  unread?: number;
  open?: boolean;
  children?: ChildrenType[];
};

type ChildrenType = {
  id: number;
  type: string;
  name: string;
};

class CommunityChannelsSt {
  // `this` from rootstore passed to the constructor and we can
  // assign it to a variable accessible in this class called
  // `rootStore`. Therefore, we can access other store like
  // useStore for e.g (this.rootStore.userStore)
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
      name: 'Расписание',
      unread: 0,
    },
    {
      id: 1,
      type: 'category',
      name: '4Д — БЖ',
      subtext: 'Кастырин И.И.',
      open: true,
      children: [
        {
          id: 2,
          type: 'posts',
          name: 'Объявления',
        },
        {
          id: 5,
          type: 'task',
          name: 'Задания',
        },
        {
          id: 2,
          type: 'chat',
          name: 'Чат со студентами',
        },
        {
          id: 5,
          type: 'room',
          name: 'Видеоконференция',
        },
      ],
    },
  ];

  @action setChannel = (index, name, value) => {
    this.channels[index][name] = value;
  };

  @action pushNewChannel = (data) => {
    console.log(data);
    this.channels.push({
      id: new Date().getTime(),
      type: data.type,
      name: data.name,
    });
    console.log(data);
  };

  @action pushNewChannelToCategory = (data, id) => {
    this.channels.map((c) =>
      c.id === id
        ? c.children?.push({
            id: new Date().getTime(),
            type: data.type,
            name: data.name,
          })
        : c,
    );
  };
}

export default CommunityChannelsSt;
