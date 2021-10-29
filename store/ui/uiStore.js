import { action, observable, computed, runInAction, makeObservable } from 'mobx'


class UIStore {
    // `this` from rootstore passed to the constructor and we can 
    // assign it to a variable accessible in this class called 
    // `rootStore`. Therefore, we can access other store like 
    // useStore for e.g (this.rootStore.userStore)
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeObservable(this)
    }

    //Loading Screen
    @observable loading = {
        "/": true,
        "/login": true,
        "/students": true,
        "/teachers": true,
        "/schools": true,
        "/main": true,
        "/registration": true,
        "/resetpassword/email": true,
        "navigation": true,
    }

    @action setLoading = (page) => {
        this.loading[page] = false
    }

    @observable knowledgeUI = {
        contentTypeOnPage: "info",
        gridTypeOnPage: "grid",
        gridTypeOnPageSizes: [6, 4, 3]
    }

    @action setKnowledgeUI = (name, value) => {
        this.knowledgeUI[name] = value
    }

    @observable menu = {
        messagerItems: [
            {
                label: "Класс",
                chats: [
                    {
                        id: 0,
                        userName: "Беседа",
                        count: 8,
                    },
                    {
                        id: 1,
                        userName: "Чувак",
                        count: 1,
                    },
                    {
                        id: 1,
                        userName: "Ещё один чувак офигенный",
                        count: 2,
                    }
                ]
            },
            {
                label: "Преподаватели",
                chats: [
                    {
                        id: 0,
                        userName: "АФК",
                    },
                    {
                        id: 1,
                        userName: "ГГ",
                    },
                    {
                        id: 2,
                        userName: "КВ",
                    }
                ]
            }
        ]
    }
}

export default UIStore;