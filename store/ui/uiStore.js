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

    @observable navigation = {
        swipe: 'center',
    }

    @action setNavigation = (name, value) => {
        this.navigation[name] = value
    }

    //Loading Screen
    @observable load = {
        loading: false
    }

    @action setLoading = (name, value) => {
        this.load[name] = value
    }

    @observable knowledgeUI = {
        contentTypeOnPage: "info",
        gridTypeOnPage: "grid",
        gridTypeOnPageSizes: [6, 4, 3]
    }

    @action setKnowledgeUI = (name, value) => {
        this.knowledgeUI[name] = value
    }

}

export default UIStore;