import { action, observable, makeObservable } from "mobx"
import socket from "../../utils/socket"

class MessageStore {
    // `this` from rootstore passed to the constructor and we can 
    // assign it to a variable accessible in this class called 
    // `rootStore`. Therefore, we can access other store like 
    // useStore for e.g (this.rootStore.userStore)
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeObservable(this)
    }

    // Список чатов 

    @observable menu = {
        chats: []
    }

    @action setMenu = (name, value) => {
        this.menu[name] = value
    }

    @action loadChatsInMenu = () => {
        // this.rootStore.fetchData(`${this.rootStore.url}/chats/index/`, "POST", { "counter": 0 }).then(
        //     (data) => {
        //         console.log("chats", data.results)
        //         this.setMenu("chats", data.results)
        //     })
    }

    // Диалог создания чата

    @observable dialogChatCreation = {
        openDialog: false,
        usersForChat: [],
        searchResults: [],
        chatName: "",
        search: "",
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
            search: "",
        }
    }

    @action searchUsers = () => {
        this.rootStore.fetchData(`${this.rootStore.url}/users/`, "POST", { "search": this.dialogChatCreation.search, "counter": 0 }).then(
            (data) => {
                this.setDialogChatCreation("searchResults", data.results)
            })
    }

    @action selectUserInSearch = (index) => {
        this.dialogChatCreation.usersForChat.push(this.dialogChatCreation.searchResults[index])
        this.dialogChatCreation.searchResults = this.dialogChatCreation.searchResults.filter((n, id) => {
            if (id === index) return false
            return true
        })
    }

    @action deleteInUsersForChat = (index) => {
        this.dialogChatCreation.usersForChat = this.dialogChatCreation.usersForChat.filter((n, id) => {
            if (id === index) return false
            return true
        })
    }

    @action createChat = () => {
        if (this.dialogChatCreation.chatName === "") {
            let newChatName = ""
            for (let i = 0; i < this.dialogChatCreation.usersForChat.length; i += 1) {
                newChatName = `${newChatName + this.dialogChatCreation.usersForChat[i]}, `
            }
            this.setDialogChatCreation("chatName", newChatName)
        }
        const users = []
        for (let i = 0; i < this.dialogChatCreation.usersForChat.length; i += 1) {
            users.push(this.dialogChatCreation.usersForChat[i].id)
        }
        this.rootStore.fetchData(`${this.rootStore.url}/chats/`, "POST", { "name": this.dialogChatCreation.chatName }).then(
            (data) => {
                this.setChat("id", data.id)
                this.rootStore.fetchData(`${this.rootStore.url}/chats/${this.chat.id}/users/add-all/`, "POST", { "ids": users }).then(
                    () => {
                        this.clearDialogChatCreation()
                    })
            })
    }


    // Чат

    @observable chat = {
        id: "",
        newMessage: "",
        messages: [],
        name: "",
        role: "",
        unread: 0,
        users: 0,
        usersInChat: [],
        uploading: true,
        messageCounter: 1,
        hasNext: true,
    }

    @action setChat = (name, value) => {
        this.chat[name] = value
    }

    @action setChatSecondArray = (firstName, id, name, value) => {
        this.chat[firstName][id][name] = value
    }

    @action clearChat = () => {
        this.chat = {
            id: "",
            newMessage: "",
            messages: [],
            name: "",
            role: "",
            unread: 0,
            users: 0,
            usersInChat: [],
            uploading: true,
            messageCounter: 1,
            hasNext: true,
        }
    }

    @action pushNewMessageToChat = (data) => {
        this.chat.messages.push(...data)
        console.log()
    }

    @action loadMetaForChat = (id) => {
        this.setChat("id", id)
        this.rootStore.fetchData(`${this.rootStore.url}/chats/${id}/`, "GET").then(
            (data) => {
                console.log("metachat", data)
                this.setChat("name", data.name)
                this.setChat("role", data.role)
                this.setChat("unread", data.unread)
                this.setChat("users", data.users)
            })
    }

    @action loadUsersForChat = (id) => {
        this.rootStore.fetchData(`${this.rootStore.url}/chats/${id}/users/`, "POST", { "counter": 0 }).then(
            (data) => {
                console.log("users", data.results)
                this.setChat("usersInChat", data.results)
            })
    }

    @action uploadFirstMessages = (id) => {
        // this.setChat("uploading", true)
        this.rootStore.fetchData(`${this.rootStore.url}/chats/${id}/message-history/`, "POST", { "counter": 0 }).then(
            (data) => {
                // console.log("messageCounter", this.chat.messageCounter)
                console.log("messagesChat", data)
                this.pushNewMessageToChat(data.results)
                if (!data["has-next"]) this.setChat("hasNext", false)
                // this.setChat("uploading", false)
            })
    }

    @action uploadMoreMessages = () => {
        // this.setChat("uploading", true)
        this.rootStore.fetchData(`${this.rootStore.url}/chats/${this.chat.id}/message-history/`, "POST", { "counter": this.chat.messageCounter }).then(
            (data) => {
                this.setChat("messageCounter", this.chat.messageCounter + 1)
                // console.log("messageCounter", this.chat.messageCounter)
                console.log("messagesChat", data)
                if (!data["has-next"]) this.setChat("hasNext", false)
                this.pushNewMessageToChat(data.results)
                // this.setChat("uploading", false)
            })
    }

    @action sendMessage = () => {
        socket.emit("send", { "chat-id": this.chat.id, "content": this.chat.newMessage })

    }

    @action editMessageInChat = (id, content) => {
        const mId = this.chat.messages.findIndex(el => el.id === id)
        if (mId !== -1) {
            this.setChatSecondArray("messages", mId, "content", content)
        }
    }

}

export default MessageStore;