import { action, observable, computed, runInAction, makeObservable } from 'mobx'
import Router from 'next/router'

class SettingsStore {
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

    @action logout = () => {
        this.rootStore.fetchDataScr(`${this.rootStore.url}/logout/`, "POST", { "lol": "kek" }).then(
            (data) => {
                if (data?.a) {
                    const router = Router
                    router.push('/login')
                }
            })
    }
}

export default SettingsStore;