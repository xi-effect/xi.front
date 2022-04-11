import { action, observable, makeObservable } from "mobx"
import Router from "next/router";

class UserStore {
    // `this` from rootstore passed to the constructor and we can 
    // assign it to a variable accessible in this class called 
    // `rootStore`. Therefore, we can access other store like 
    // useStore for e.g (this.rootStore.userStore)
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeObservable(this)
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
        username: "",
        darkTheme: true,
        emailConfirmed: null,
        invite: null,
    }

    @action setSettings = (item, value) => {
        this.settings[item] = value
    };

    @action setSettingsSecond = (item, secondItem, value) => {
        this.settings[item][secondItem] = value
    };

    @action getMainSettings = (type = null) => {
        this.rootStore.fetchData(`${this.rootStore.url}/settings/main/`, "GET").then((data) => {
            if (data) {
                this.setSettings("darkTheme", data["dark-theme"]);
                this.setSettings("id", data.id);
                this.setSettings("username", data.username);
                if (type === "login") {
                    Router.push('/home')
                }
            }
            if (type === "login") {
                setTimeout(() => {
                    this.rootStore.uiSt.setLoading("loading", false);
                }, 500);
            }
        });
    };

    @action getAllSettings = () => {
        this.rootStore.fetchData(`${this.rootStore.url}/settings/`, "GET").then((data) => {
            if (data) {
                const emailArr = data.email.split("@", 2)
                this.setSettings("emailBefore", emailArr[0])
                this.setSettings("emailAfter", `@${emailArr[1]}`)
                this.setSettings("emailConfirmed", data["email-confirmed"])
                this.setSettings("avatar", data.avatar)
                this.setSettings("invite", data.code)
            }
        });
    };

    @action saveNewSettings = () => {
        this.rootStore.fetchData(`${this.rootStore.url}/settings/`, "POST", {
            "changed": { ...this.settings, "dark-theme": this.settings.darkTheme }
        }).then((data) => {
            console.log(data)
        })
    };

    @action logout = () => {
        this.rootStore.fetchData(`${this.rootStore.url}/logout/`, "POST", { "lol": "kek" }).then(
            (data) => {
                if (data?.a) {
                    const router = Router
                    router.push("/login")
                    this.settings = {
                        id: null,
                        avatar: {
                            accessory: 0,
                            body: 0,
                            face: 0,
                            hair: 0,
                            facialHair: 0,
                            bgcolor: 0,
                        },
                        username: "",
                        darkTheme: true,
                        emailConfirmed: null,
                        invite: null,
                    }
                }
            })
    };
}

export default UserStore;