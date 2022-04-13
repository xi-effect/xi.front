/* eslint-disable no-undef */
/* eslint-disable no-shadow */
import { action, observable, makeObservable } from "mobx"
import Router from "next/router"
// import socket from "../../utils/socket"
// import { io } from "socket.io-client";

const Crypto = require("crypto-js")

class AuthorizationSt {
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
        this.rootStore.fetchData(`${this.rootStore.url}/password-reset/confirm/`, "POST", { "code": id, "password": Crypto.SHA384(data.password.trim()).toString() },)
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
        this.rootStore.fetchData(`${this.rootStore.url}/password-reset/`, "POST", { email: data.email.toLowerCase() },)
            .then((data) => {
                console.log(data)
                if (data !== undefined) {
                    if (data.a === true) {
                        this.setPasswordReset("emailResetOk", true)
                    } else if (data.a === false) {
                        this.setPasswordReset("errorEmailNotFounedReset", true)
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
        this.rootStore.fetchData(`${rootStore.url}/reg/`, "POST", { "email": data.email.toLowerCase(), "password": Crypto.SHA384(data.password.trim()).toString(), "username": data.username, "code": data.invite })
            .then((data) => {
                console.log(data)
                if (data !== undefined) {
                    if (data.a) { // true
                        this.rootStore.uiSt.setLoading("loading", true)
                        const router = Router
                        router.push("/home")
                        setTimeout(() => {
                            this.rootStore.uiSt.setLoading("loading", false)
                        }, 2000);
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

    @action clickEnterButton = (data, trigger) => {
        this.setLogin("error", null)
        this.rootStore.fetchData(`${this.rootStore.url}/auth/`, "POST", { "email": data.email.toLowerCase(), "password": Crypto.SHA384(data.password.trim()).toString() })
            .then((data) => {
                console.log("/auth/", data)
                if (data !== undefined) {
                    if (data.a === "Success") {
                        this.rootStore.uiSt.setLoading("loading", true)
                        Router.push("/home")
                        this.rootStore.fetchData(`${this.rootStore.url}/settings/`, "GET")
                            .then((data) => {
                                console.log(data)
                                if (data !== undefined) {
                                    const emailArr = data.email.split("@", 2)
                                    this.rootStore.userSt.setSettings("username", data.username)
                                    this.rootStore.userSt.setSettings("emailBefore", emailArr[0])
                                    this.rootStore.userSt.setSettings("emailAfter", `@${emailArr[1]}`)
                                    this.rootStore.userSt.setSettings("darkTheme", data["dark-theme"])
                                    this.rootStore.userSt.setSettings("emailConfirmed", data["email-confirmed"])
                                } else {
                                    console.log("Проблемы с сервером")
                                }
                                setTimeout(() => {
                                    this.rootStore.uiSt.setLoading("loading", false)
                                }, 2000);
                            });
                    } else if (data.a === "User doesn't exist") {
                        this.setLogin("error", "User doesn't exist")
                        trigger()
                    } else if (data.a === "Wrong password") {
                        this.setLogin("error", "Wrong password")
                        trigger()
                    }
                } else {
                    this.setLogin("error", "Server error")
                    trigger()
                }
            })
    }

    @action isAuthUser = () => {
        this.rootStore.uiSt.setLoading("loading", true);
        this.rootStore.fetchData(`${this.rootStore.url}/settings/main/`, "GET")
            .then((data) => {
                if (data === null) {
                    this.rootStore.uiSt.setLoading("loading", false)
                } else {
                    this.rootStore.uiSt.setLoading("loading", false)
                    Router.push("/home");
                }
            });
    }

}

export default AuthorizationSt;