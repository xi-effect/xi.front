import { action, observable, makeObservable } from "mobx";
import Router from "next/router";

class CommunityCreationSt {
    // `this` from rootstore passed to the constructor and we can 
    // assign it to a variable accessible in this class called 
    // `rootStore`. Therefore, we can access other store like 
    // useStore for e.g (this.rootStore.userStore)
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeObservable(this)
    }

    @observable channels = null;

    @action createCommunity = (dataForm, trigger) => {
        this.rootStore.fetchData(`${this.rootStore.url}/reg/`, "POST", { "name": dataForm.name, })
            .then((data) => {
                if (data !== undefined) {
                    if (data.id) {
                        Router.push(`/community/${data.id}`)
                    }
                } else {
                    trigger()
                    console.warn('сервер тю-тю')
                }
            });
    };


}

export default CommunityCreationSt;