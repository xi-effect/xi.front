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

    @observable login = {
        email: '',
        password: '',
        showPassword: false,
        error: false,
        errorEmail: false,
        errorPassword: false,
        errorServer: false,
    }

    @action setLogin = (item, value) => {
        this.login[item] = value
    }

    @action clickEnterButton = () => {
        this.setLogin("error", false)
        this.setLogin("errorEmail", false)
        this.setLogin("errorPassword", false)
        this.setLogin("errorServer", false)
        if (this.login.email.length > 0 && this.login.password.length > 0) {
            this.rootStore.fetchData(`${this.rootStore.url}/auth/`, "POST", { "email": this.login.email, "password": Crypto.SHA384(this.login.password).toString() })
                .then((data) => {
                    if (data != undefined) {
                        if (data.a == "Success") {
                            const router = Router
                            router.push('/main')
                            setTimeout(() => {
                                this.setLogin("email", '')
                                this.setLogin("password", '')
                            }, 10000)
                        }
                        if (data.a == "User doesn't exist") {
                            this.setLogin("errorEmail", true)
                        }
                        if (data.a == "Wrong password") {
                            this.setLogin("errorPassword", true)
                        }
                    } else {
                        this.setLogin("errorServer", true)
                    }
                });
        }
        else {
            this.setLogin("error", true)
        }
    }
}

export default AuthorizationStore;