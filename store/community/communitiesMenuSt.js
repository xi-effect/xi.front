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
            id: 0,
            label: "Hестовое сообщество",
            cId: 1,
        },
        {
            id: 0,
            label: "Rестовое сообщество",
            cId: 1,
        },
        {
            id: 0,
            label: "Uестовое сообщество",
            cId: 1,
        },
        {
            id: 0,
            label: "Fестовое сообщество",
            cId: 1,
        },
        {
            id: 0,
            label: "Aестовое сообщество",
            cId: 1,
        },
        {
            id: 0,
            label: "Qестовое сообщество",
            cId: 1,
        },
        {
            id: 0,
            label: "Pестовое сообщество",
            cId: 1,
        },
        {
            id: 0,
            label: "Тестовое сообщество",
            cId: 1,
        },
        {
            id: 0,
            label: "Тестовое сообщество",
            cId: 1,
        },
        {
            id: 0,
            label: "Тестовое сообщество",
            cId: 1,
        },
        {
            id: 0,
            label: "Тестовое сообщество",
            cId: 1,
        },
        {
            id: 0,
            label: "Тестовое сообщество",
            cId: 1,
        },
        {
            id: 0,
            label: "Тестовое сообщество",
            cId: 1,
        },
        {
            id: 0,
            label: "Тестовое сообщество",
            cId: 1,
        },
        {
            id: 0,
            label: "Тестовое сообщество",
            cId: 1,
        },
        {
            id: 0,
            label: "Тестовое сообщество",
            cId: 1,
        },
        {
            id: 0,
            label: "Тестовое сообщество",
            cId: 1,
        },
        {
            id: 0,
            label: "Тестовое сообщество",
            cId: 1,
        },
    ];

    @action setUserCommunities = (value) => {
        this.userCommunities = value;
    };


}

export default CommunitiesMenuSt;