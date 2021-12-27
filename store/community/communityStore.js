import { action, observable, computed, runInAction, makeObservable } from 'mobx'


class CommunityStore {
    // `this` from rootstore passed to the constructor and we can 
    // assign it to a variable accessible in this class called 
    // `rootStore`. Therefore, we can access other store like 
    // useStore for e.g (this.rootStore.userStore)
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeObservable(this)
    }
    @observable categories = [
        {
            name: 'Категория 1',
            open: true,
            channels: [
                {
                    name: 'Канал 1',
                    type: '',
                },
                {
                    name: 'Канал 2',
                    type: '',
                },
                {
                    name: 'Канал 3',
                    type: '',
                },
            ]
        },
        {
            name: 'Категория 2',
            open: true,
            channels: [
                {
                    name: 'Канал 1',
                    type: '',
                },
                {
                    name: 'Канал 2',
                    type: '',
                },
                {
                    name: 'Канал 3',
                    type: '',
                },
            ]
        },
        {
            name: 'Категория 3',
            open: true,
            channels: [
                {
                    name: 'Канал 1',
                    type: '',
                },
                {
                    name: 'Канал 2',
                    type: '',
                },
                {
                    name: 'Канал 3',
                    type: '',
                },
            ]
        }
    ]

    @action setCategories = (index, name, value) => {
        this.categories[index][name] = value
    }

    
}

export default CommunityStore;