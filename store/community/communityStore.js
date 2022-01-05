import { action, observable, computed, runInAction, makeObservable } from 'mobx'


class CommunityStore {
    // `this` from rootstore passed to the constructor and we can 
    // assign it to a variable accessible in this class called 
    // `rootStore`. Therefore, we can access other store like 
    // useStore for e.g (this.rootStore.userStore)
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeObservable(this)
    }
    @observable channels = [
        {
            isCategory: false,
            name: 'Расписание 1',
            type: 'schedule',
        },
        {
            isCategory: false,
            name: 'Канал 2',
            type: 'chat',
        },
        {
            isCategory: true,
            name: 'Категория 1',
            open: true,
            underchannels: [
                {
                    name: 'Комната',
                    type: 'voiceroom',
                },
                {
                    name: 'Комната',
                    type: 'voiceroom',
                },
                {
                    name: 'Чат',
                    type: 'chat',
                },
            ]
        },
        {
            isCategory: true,
            name: 'Категория 2',
            open: true,
            underchannels: [
                {
                    name: 'Чат',
                    type: 'chat',
                },
                {
                    name: 'Чат',
                    type: 'chat',
                },
                {
                    name: 'Чат',
                    type: 'chat',
                },
            ]
        },
        {
            isCategory: false,
            name: 'Комната',
            type: 'voiceroom',
        },
        {
            isCategory: false,
            name: 'Чат',
            type: 'chat',
        },
        {
            isCategory: true,
            name: 'Категория 3',
            open: true,
            underchannels: [
                {
                    name: 'Расписание 2',
                    type: 'schedule',
                },
                {
                    name: 'Чат',
                    type: 'chat',
                },
                {
                    name: 'Чат',
                    type: 'chat',
                },
            ]
        },
        {
            isCategory: false,
            name: 'Расписание 5',
            type: 'schedule',
        },
        {
            isCategory: false,
            name: 'Расписание 6',
            type: 'schedule',
        },
    ]

    @action setChannel = (index, name, value) => {
        this.channels[index][name] = value
    }


}

export default CommunityStore;