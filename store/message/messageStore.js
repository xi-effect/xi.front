import { action, observable, computed, runInAction, makeObservable } from 'mobx'


class MessageStore {
    // `this` from rootstore passed to the constructor and we can 
    // assign it to a variable accessible in this class called 
    // `rootStore`. Therefore, we can access other store like 
    // useStore for e.g (this.rootStore.userStore)
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeObservable(this)
    }

    @observable ui = {
        openDialog: false,
    }

    @action setUi = (name, value) => {
        this.ui[name] = value
    }


    // Диалог создания чата

    @observable dialogChatCreation = {
        openDialog: false,
        usersForChat: [],
        searchResults: [],
        chatName: "",
    }

    @action setDialogChatCreation = (name, value) => {
        this.dialogChatCreation[name] = value
    }

    @action clearDialogChatCreation = () => {
        this.dialogChatCreation = {
            openDialog: false,
            usersForChat: [],
            searchResults: [],
            chatName: "",
        }
    }

    @action searchUsers = (search) => {
        this.rootStore.fetchDataScr(`${this.rootStore.url}/wip/pages/`, "POST", {"search": search}).then(
            (data) => {
                
            })
    }

    @action selectUserInSearch = (index) => {
        this.dialogChatCreation.usersForChat.push(this.dialogChatCreation.searchResults[index])
    }

    @action deleteInUsersForChat = (index) => {
        this.dialogChatCreation.usersForChat = this.dialogChatCreation.usersForChat.filter((n, id) => {
            if (id == index) return false
            return true
        })
    }

    @action createChat = () => {
        if (this.dialogChatCreation.chatName === "") {
            let newChatName = ""
            for (let i = 0; i < this.dialogChatCreation.usersForChat.length; i++) {
                newChatName = newChatName + this.dialogChatCreation.usersForChat[i] + ", "
            }
            this.setDialogChatCreation("chatName", newChatName)
        }
        this.rootStore.fetchDataScr(`${this.rootStore.url}/chats/`, "POST", { "name": this.dialogChatCreation.chatName }).then(
            (data) => {

            })
    }


    // Чат

    @observable chat = {
        messages: []
    }

    @action setChat = (name, value) => {
        this.messages[name] = value
    }

    @action loadMetaForChat = (id) => {
        this.rootStore.fetchDataScr(`${this.rootStore.url}/chats/${id}/`, "GET").then(
            (data) => {

            })
    }

}

export default MessageStore;