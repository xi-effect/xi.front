import { action, observable, makeObservable } from "mobx";


class UISt {
    // `this` from rootstore passed to the constructor and we can 
    // assign it to a variable accessible in this class called 
    // `rootStore`. Therefore, we can access other store like 
    // useStore for e.g (this.rootStore.userStore)
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }

    @observable navigation = {
        swipe: "center",
    };

    @action setNavigation = (name, value) => {
        this.navigation[name] = value;
    };

    // Loading Screen
    @observable load = {
        loading: null,
    };

    @action setLoading = (name, value) => {
        this.load[name] = value;
    };

    @observable knowledge = {
        activeStep: 0,
        activeStepModuleCreate: 0,
    };

    @action setKnowledge = (name, value) => {
        this.knowledge[name] = value;
    };

    @observable reportData = {

    };

    @action setReportData = (name, value) => {
        this.reportData[name] = value;
    };

    @action clearReportData = () => {
        this.reportData = {};
    };

    @observable dialogs = {
        categoryCreation: false,
        channelCreation: false,
        invite: false,
        privacy: false,
        settings: false,
        userSettings: false,
        communitySettings: false,
        communityMenu: false,
    };

    @action setDialogs = (name, value) => {
        this.dialogs[name] = value;
    };
}

export default UISt;