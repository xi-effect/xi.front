import { action, observable, makeObservable } from "mobx"

class ProfileStore {
    // `this` from rootstore passed to the constructor and we can 
    // assign it to a variable accessible in this class called 
    // `rootStore`. Therefore, we can access other store like 
    // useStore for e.g (this.rootStore.userStore)
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeObservable(this)
    }

    @observable user = {

    }

    @action setUserAll = (value) => {
        this.user = value
    }

    @action setUserData = (name, value) => {
        this.user[name] = value
    }

    @action loadUserInfo = (id) => {
        this.rootStore.fetchDataScr(`${this.rootStore.url}/users/${id}/profile/`, "GET").then(
            (data) => {
                console.log("data", data)
                this.setUserAll(data)
            })
    }

}

export default ProfileStore;