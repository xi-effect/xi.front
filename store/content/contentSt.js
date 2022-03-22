import { action, observable, makeObservable } from "mobx"


class ContentStore {
    // `this` from rootstore passed to the constructor and we can 
    // assign it to a variable accessible in this class called 
    // `rootStore`. Therefore, we can access other store like 
    // useStore for e.g (this.rootStore.userStore)
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeObservable(this)
    }

    // Loading Screen
    @observable images = {

    }

    @action setImage = (authorId, imageId, value) => {
        this.images[`${authorId}-${imageId}`] = value
    }

    @action loadImgFromServer = (authorId, imageId) => {
        this.rootStore.fetchDataScr(`${this.rootStore.url}/images/${imageId}/`, "GET").then(
            (data) => {
                if (data) {
                    this.setImage(authorId, imageId, data)
                } else {
                    console.log("fail", data)
                }

            })
    }

    @observable temporaryImages = {
        moduleCreation: null,
    }

    @action setTemporaryImages = (name, value) => {
        this.temporaryImages[name] = value
    }

}

export default ContentStore;