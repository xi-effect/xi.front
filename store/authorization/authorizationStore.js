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

    @observable newPasswordReset = {
        emailResetOk: false,
    }

    @action setNewPasswordReset = (name, value) => {
        this.newPasswordReset[name] = value
    }

    @action saveNewPassword = (id, data) => {
        this.setNewPasswordReset("emailResetOk", false)
        this.rootStore.fetchData(`${this.rootStore.url}/password-reset/confirm/`, "POST", { "code": id, "password": Crypto.SHA384(data.password).toString() },)
            .then((data) => {
                if (data != undefined) {
                    if (data.a == "Success") { //"Success"
                        this.setNewPasswordReset("emailResetOk", true)
                    }
                }
            })
    }

    @observable passwordReset = {
        errorEmailNotFounedReset: false,
        emailResetOk: false,
    }

    @action setPasswordReset = (name, value) => {
        this.passwordReset[name] = value
    }

    @action clickPasswordResetButton = (data) => {
        this.setPasswordReset("errorEmailNotFounedReset", false)
        this.setPasswordReset("emailResetOk", false)
        this.rootStore.fetchData(`${this.rootStore.url}/password-reset/${data.email}/`, "GET")
            .then((data) => {
                if (data != undefined) {
                    if (data.a === true) {
                        this.setPasswordReset("errorEmailNotFounedReset", true)
                    } else if (data.a === false) {
                        this.setPasswordReset("emailResetOk", true)
                    }

                }
            });
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

    @observable login = {
        error: null,
    }

    @action setLogin = (name, value) => {
        this.login[name] = value
    }

    @action clickEnterButton = (data) => {
        this.setLogin(error, null)
        this.rootStore.fetchData(`${this.rootStore.url}/auth/`, "POST", { "email": data.email, "password": Crypto.SHA384(data.password).toString() })
            .then((data) => {
                if (data != undefined) {
                    if (data.a == "Success") {
                        const router = Router
                        router.push('/main')
                    } else if (data.a === "User doesn't exist") {
                        this.setLogin(error, "User doesn't exist")
                    } else if (data.a === "Wrong password") {
                        this.setLogin(error, "Wrong password")
                    }
                } else {
                    this.setLogin(error, "Server error")

                }
            })
    }
}

export default AuthorizationStore;