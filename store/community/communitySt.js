/* eslint-disable no-shadow */
import { action, observable, makeObservable } from "mobx";

class CommunitySt {
    // `this` from rootstore passed to the constructor and we can 
    // assign it to a variable accessible in this class called 
    // `rootStore`. Therefore, we can access other store like 
    // useStore for e.g (this.rootStore.userStore)
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }

    @observable meta = {
        id: null,
        name: "",
        description: "",
    };

    @action setMeta = (name, value) => {
        this.meta[name] = value;
    };

    @action getMeta = (id = null) => {
        this.rootStore.fetchData(`${this.rootStore.url}/communities/${id || this.meta.id}/`, "GET")
            .then(({ id, name, description }) => {
                if (id) this.setMeta("id", id);
                if (name) this.setMeta("name", name);
                if (description) this.setMeta("description", description);
            });
    };

}

export default CommunitySt;