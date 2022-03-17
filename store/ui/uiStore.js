import { action, observable, makeObservable } from "mobx"


class UIStore {
    // `this` from rootstore passed to the constructor and we can 
    // assign it to a variable accessible in this class called 
    // `rootStore`. Therefore, we can access other store like 
    // useStore for e.g (this.rootStore.userStore)
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeObservable(this)
    }

    @observable navigation = {
        swipe: "center",
    }

    @action setNavigation = (name, value) => {
        this.navigation[name] = value
    }

    // Loading Screen
    @observable load = {
        loading: false,
        landing: true,
        login: true,
        registration: true,
        app: true,
    }

    @action setLoading = (name, value) => {
        this.load[name] = value
    }

    @observable knowledge = {
        activeStep: 0,
        activeStepModuleCreate: 0,
    }

    @action setKnowledge = (name, value) => {
        this.knowledge[name] = value
    }

    @observable reportData = {

    }

    @action setReportData = (name, value) => {
        this.reportData[name] = value
    }

    @action clearReportData = () => {
        this.reportData = {}
    }
}

export default UIStore;