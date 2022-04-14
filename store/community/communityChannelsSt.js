import { action, observable, makeObservable } from "mobx";

class CommunityChannelsSt {
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
            id: 0,
            type: "chat",
            name: "Канал 2",
            unread: 0, // Для чатов
        },
        {
            id: 1,
            type: "category",
            name: "Категория 1",
            open: true,
            children: [
                {
                    id: 2,
                    type: "room",
                    name: "Комната",
                },
                {
                    id: 4,
                    type: "chat",
                    name: "Чат",
                },
                {
                    id: 5,
                    type: "page",
                    name: "Страница",
                },
            ]
        },
        {
            id: 2,
            type: "chat",
            name: "Чат",
        },
        {
            id: 4,
            type: "room",
            name: "Комната",
        },
        {
            id: 1,
            type: "category",
            name: "Категория 2",
            open: true,
            children: [
                {
                    id: 2,
                    type: "room",
                    name: "Комната",
                },
                {
                    id: 4,
                    type: "chat",
                    name: "Чат",
                },
            ]
        },
        {
            id: 5,
            type: "room",
            name: "Комната",
        },
        {
            id: 50,
            type: "page",
            name: "Страница",
        },
        {
            id: 2,
            type: "chat",
            name: "Чат",
        },
        {
            id: 4,
            type: "room",
            name: "Комната",
        },
        {
            id: 1,
            type: "category",
            name: "Категория 2",
            open: true,
            children: [
                {
                    id: 2,
                    type: "room",
                    name: "Комната",
                },
                {
                    id: 4,
                    type: "chat",
                    name: "Чат",
                },
            ]
        },
        {
            id: 5,
            type: "room",
            name: "Комната",
        },
        {
            id: 2,
            type: "chat",
            name: "Чат",
        },
        {
            id: 4,
            type: "room",
            name: "Комната",
        },
        {
            id: 1,
            type: "category",
            name: "Категория 2",
            open: true,
            children: [
                {
                    id: 2,
                    type: "room",
                    name: "Комната",
                },
                {
                    id: 4,
                    type: "chat",
                    name: "Чат",
                },
            ]
        },
        {
            id: 5,
            type: "room",
            name: "Комната",
        },
    ]

    @action setChannel = (index, name, value) => {
        this.channels[index][name] = value
    }
}

export default CommunityChannelsSt;