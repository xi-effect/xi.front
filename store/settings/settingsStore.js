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
        id: null,
        avatar: {
            accessory: 0,
            body: 0,
            face: 0,
            hair: 0,
            facialHair: 0,
            bgcolor: 0,
        },
        username: '',
        darkTheme: true,
        emailConfirmed: null,
        invite: null,
    }

    @action setSettings = (item, value) => {
        this.settings[item] = value
    }

    @action setSettingsSecond = (item, secondItem, value) => {
        this.settings[item][secondItem] = value
    }

    @action saveNewSettimgs = () => {
        this.rootStore.fetchDataScr(`${this.rootStore.url}/settings/`, "POST", {
            "changed": { ...this.settings, "dark-theme": this.settings.darkTheme }
        }).then((data) => {
            console.log(data)
        })
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