import { action, observable, makeObservable } from "mobx";

class CommunitiesInvitesSt {
    // `this` from rootstore passed to the constructor and we can 
    // assign it to a variable accessible in this class called 
    // `rootStore`. Therefore, we can access other store like 
    // useStore for e.g (this.rootStore.userStore)
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeObservable(this)
    }

    @observable channels = null;

    @action createCommunity = () => {

    };


}

export default CommunitiesInvitesSt;