import { action, observable, computed, runInAction, makeObservable } from 'mobx'


class AuthorizationStore {
    // `this` from rootstore passed to the constructor and we can 
    // assign it to a variable accessible in this class called 
    // `rootStore`. Therefore, we can access other store like 
    // useStore for e.g (this.rootStore.userStore)
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }

    @observable settings = {
        avatar: null,
        username: '',
        darkTheme: true,
        emailAfter: '',
        emailBefore: '',
        emailConfirmed: null,
    }

    @action setSettings = (item, value) => {
        this.settings[item] = value
    }
}

export default AuthorizationStore;