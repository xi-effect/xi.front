import { action, observable, computed, runInAction, makeObservable } from 'mobx'
import Router from 'next/router'


let Crypto = require('crypto-js')

class AuthorizationStore {
    // `this` from rootstore passed to the constructor and we can 
    // assign it to a variable accessible in this class called 
    // `rootStore`. Therefore, we can access other store like 
    // useStore for e.g (this.rootStore.userStore)
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }

    @action clickRegistrationButton = (data) => {
        this.rootStore.fetchData(`${rootStore.url}/reg/`, "POST", { "email": data.email, "password": Crypto.SHA384(data.password).toString(), "username": data.username })
            .then((data) => {
                console.log(data)
                if (data != undefined) {
                    if (data.a) { //true
                        const router = Router
                        router.push('/')
                    } else {
                        setEmailAlreadyUsed(true)
                    }
                } else {
                    setErrorServer(true)
                }
            });
    }

    @action clickEnterButton = (data) => {
        this.rootStore.fetchData(`${this.rootStore.url}/auth/`, "POST", { "email": data.email, "password": Crypto.SHA384(data.password).toString() })
            .then((data) => {
                if (data != undefined) {
                    if (data.a == "Success") {
                        const router = Router
                        router.push('/main')
                    }
                }
            })
    }
}

export default AuthorizationStore;