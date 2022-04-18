import { action, observable, makeObservable } from "mobx";

class CommunitiesMenuSt {
    // `this` from rootstore passed to the constructor and we can 
    // assign it to a variable accessible in this class called 
    // `rootStore`. Therefore, we can access other store like 
    // useStore for e.g (this.rootStore.userStore)
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeObservable(this)
    }

    @observable userCommunities = [
        {
            id: 0,
            label: "Тестовое сообщество",
            cId: 1,
        },
        {
            id: 1,
            label: "Hестовое сообщество",
            cId: 2,
        },
        {
            id: 2,
            label: "Rестовое сообщество",
            cId: 3,
        },
        {
            id: 3,
            label: "Uестовое сообщество",
            cId: 4,
        },
        {
            id: 4,
            label: "Fестовое сообщество",
            cId: 5,
        },
        {
            id: 5,
            label: "Aестовое сообщество",
            cId: 6,
        },
        {
            id: 6,
            label: "Qестовое сообщество",
            cId: 7,
        },
        {
            id: 7,
            label: "Pестовое сообщество",
            cId: 8,
        },
        {
            id: 8,
            label: "Тестовое сообщество",
            cId: 9,
        },
        {
            id: 9,
            label: "Тестовое сообщество",
            cId: 10,
        },
        {
            id: 10,
            label: "Тестовое сообщество",
            cId: 11,
        },
        {
            id: 11,
            label: "Тестовое сообщество",
            cId: 12,
        },
        {
            id: 12,
            label: "Тестовое сообщество",
            cId: 13,
        },
        {
            id: 13,
            label: "Тестовое сообщество",
            cId: 14,
        },
        {
            id: 14,
            label: "Тестовое сообщество",
            cId: 15,
        },
        {
            id: 15,
            label: "Тестовое сообщество",
            cId: 16,
        },
        {
            id: 16,
            label: "Тестовое сообщество",
            cId: 17,
        },
        {
            id: 17,
            label: "Тестовое сообщество",
            cId: 18,
        },
        {
            id: 18,
            label: "Тестовое сообщество",
            cId: 19,
        },
    ];

    @action setUserCommunities = (value) => {
        this.userCommunities = value;
    };


}

export default CommunitiesMenuSt;