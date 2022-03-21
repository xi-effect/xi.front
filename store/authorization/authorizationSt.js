/* eslint-disable no-undef */
/* eslint-disable no-shadow */
import { action, observable, makeObservable } from "mobx"
import Router from "next/router"
// import socket from "../../utils/socket"
// import { io } from "socket.io-client";

const Crypto = require("crypto-js")

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
                if (data !== undefined) {
                    if (data.a === "Success") { // "Success"
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
        this.rootStore.fetchDataScr(`${this.rootStore.url}/password-reset/`, "POST", { email: data.email },)
            .then((data) => {
                console.log(data)
                if (data !== undefined) {
                    if (data.a === true) {
                        this.setPasswordReset("errorEmailNotFounedReset", true)
                    } else if (data.a === false) {
                        this.setPasswordReset("emailResetOk", true)
                    }

                }
            });
    }

    @observable signup = {
        error: null,
    }

    @action setSignup = (name, value) => {
        this.signup[name] = value
    }

    @action clickRegistrationButton = (data) => {
        this.setSignup("error", null)
        this.rootStore.fetchData(`${rootStore.url}/reg/`, "POST", { "email": data.email, "password": Crypto.SHA384(data.password).toString(), "username": data.username, "code": data.invite })
            .then((data) => {
                console.log(data)
                if (data !== undefined) {
                    if (data.a) { // true
                        this.rootStore.uiSt.setLoading("loading", true)
                        const router = Router
                        router.push("/home")
                        setTimeout(() => {
                            this.rootStore.uiSt.setLoading("loading", false)
                        }, 3000);
                    } else {
                        this.setSignup("error", "emailAlreadyUsed")
                    }
                } else {
                    this.setSignup("error", "serverError")
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
        console.log("clickEnterButton")
        this.setLogin("error", null)
        this.rootStore.fetchData(`${this.rootStore.url}/auth/`, "POST", { "email": data.email, "password": Crypto.SHA384(data.password).toString() })
            .then((data) => {
                console.log("/auth/", data)
                if (data !== undefined) {
                    if (data.a === "Success") {
                        this.rootStore.uiSt.setLoading("loading", true)
                        const router = Router
                        router.push("/home")
                        this.rootStore.fetchDataScr(`${this.rootStore.url}/settings/`, "GET")
                            .then((data) => {
                                console.log(data)
                                if (data !== undefined) {
                                    const emailArr = data.email.split("@", 2)
                                    this.rootStore.settingsSt.setSettings("username", data.username)
                                    this.rootStore.settingsSt.setSettings("emailBefore", emailArr[0])
                                    this.rootStore.settingsSt.setSettings("emailAfter", `@${emailArr[1]}`)
                                    this.rootStore.settingsSt.setSettings("darkTheme", data["dark-theme"])
                                    this.rootStore.settingsSt.setSettings("emailConfirmed", data["email-confirmed"])
                                } else {
                                    console.log("Проблемы с сервером")
                                }
                                setTimeout(() => {
                                    this.rootStore.uiSt.setLoading("loading", false)
                                }, 3000);
                            });
                    } else if (data.a === "User doesn't exist") {
                        this.setLogin("error", "User doesn't exist")
                    } else if (data.a === "Wrong password") {
                        this.setLogin("error", "Wrong password")
                    }
                } else {
                    this.setLogin("error", "Server error")

                }
            })
    }
}

export default AuthorizationStore;