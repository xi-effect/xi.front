import { action, observable, computed, runInAction, makeObservable, makeAutoObservable } from 'mobx'


class ManagmentStore {
    // `this` from rootstore passed to the constructor and we can 
    // assign it to a variable accessible in this class called 
    // `rootStore`. Therefore, we can access other store like 
    // useStore for e.g (this.rootStore.userStore)
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeObservable(this)
    }

    @observable pageCreation = {
        id: null,
        name: '',
        description: '',
        theme: '',
        kind: '',
        components: [],
        blueprint: false,
        reusable: false,
        public: false,
    }

    @action setPagecreationDefault = () => {
        this.pageCreation = {
            id: null,
            name: '',
            description: '',
            theme: '',
            kind: '',
            components: [],
            blueprint: false,
            reusable: false,
            public: false,
        }
    }

    @action setPageCreationAll = (value) => {
        this.pageCreation = value
    }

    @action setPageCreation = (name, value) => {
        this.pageCreation[name] = value
    }

    @action setPageCreationComponents = (index, name, value) => {
        this.pageCreation.components[index][name] = value
        console.log("this.pageCreation.components", this.pageCreation.components)
    }

    @action setPageCreationContentComponents = (index, contentIndex, name, value) => {
        this.pageCreation.components[index]["content"][contentIndex][name] = value
    }


    @action pushNewComponent = (type) => {
        if (type === "h") {
            this.pageCreation.components.push({ type: "h", fontSize: 36, textAlign: "center", fontWeight: "normal", fontStyle: "normal", textDecoration: "none", label: "заголовок" })
        }
        if (type === "text") {
            this.pageCreation.components.push({ type: "text", fontSize: 14, textAlign: "left", fontWeight: "normal", fontStyle: "normal", textDecoration: "none", label: "текст" })
        }
        if (type === "alert") {
            this.pageCreation.components.push({ type: "alert", alertType: "success", fontSize: 14, textAlign: "left", fontWeight: "normal", fontStyle: "normal", textDecoration: "none", label: "текст уведомления" })
        }
        if (type === "divider") {
            this.pageCreation.components.push({ type: "divider", })
        }
        if (type === "img") {
            this.pageCreation.components.push({ type: "img", authorId: null, imageId: null, })
        }
        if (type === "quiz") {
            this.pageCreation.components.push({ type: "quiz", quizType: 'single', fontSize: 14, textAlign: "left", fontWeight: "normal", fontStyle: "normal", textDecoration: "none", content: [{ label: "", rightAnswer: false, }], successAnswer: null })
        }
        if (type === "list") {
            this.pageCreation.components.push({ type: "list", listType: 'dotted', fontSize: 14, textAlign: "left", fontWeight: "normal", fontStyle: "normal", textDecoration: "none", content: [{ label: "", }, ] })
        }
        if (type === "markdown") {
            this.pageCreation.components.push({ type: "markdown", label: "markdown" })
        }
        //this.idComponents()
        console.log("compot", this.pageCreation.components)
    }
    
    @action setSingleQuiz = (index, indexA) => {
        for (let i = 0; i < this.pageCreation.components[index].content.length; i += 1) {
            this.pageCreation.components[index].content[i].rightAnswer = false
        };
        this.pageCreation.components[index].content[indexA].rightAnswer = true
    }

    @action setNumberList = (index, indexA) => {
        for (let i = 0; i < this.pageCreation.components[index].content.length; i += 1) {
            this.pageCreation.components[index].content[i].rightAnswer = false
        }
        this.pageCreation.components[index].content[indexA].rightAnswer = true
    }

    @action changeQuizType = (index) => {
        for (let i = 0; i < this.pageCreation.components[index].content.length; i += 1) {
            this.pageCreation.components[index].content[i].rightAnswer = false
        }
    }

    @action changeListType = (index) => {
        for (let i = 0; i < this.pageCreation.components[index].content.length; i += 1) {
            this.pageCreation.components[index].content[i].rightAnswer = false
        }
    }

    @action setContentToComponent = (index, value) => {
        this.pageCreation.components[index]["content"] = value
    }

    @action pushContentToComponent = (index, type) => {
        if (type === 'list') {
            this.pageCreation.components[index]["content"].push({ label: "", })
        }
        if (type === 'quiz') {
            this.pageCreation.components[index]["content"].push({ label: "", rightAnswer: false, })
        }
    }

    @action duplicateComponent = (index) => {
        this.pageCreation.components.push(this.pageCreation.components[index])
    }

    @action deleteComponent = (index) => {
        this.pageCreation.components = this.pageCreation.components.filter((n, id) => {
            if (id == index) return false
            return true
        })
    }

    @action deleteComponentContent = (index, indexContent) => {
        this.pageCreation.components[index].content = this.pageCreation.components[index].content.filter((n, id) => {
            if (id == indexContent) return false
            return true
        })
    }

    @action idComponents = () => {
        for (let i = 0; i < this.pageCreation.components.length; i += 1) {
            this.pageCreation.components[i]["id"] = i
        }
    }

    @action savePage = (close = false) => {
        // Сохранить изменения в странице
        if (this.pageCreation.id) {
            //console.log("updatePage", this.pageCreation)
            this.rootStore.fetchDataScr(`${this.rootStore.url}/wip/pages/${this.pageCreation.id}/`, "PUT", this.pageCreation).then(
                (data) => {
                    if (data) {
                        console.log("done", data)

                    } else {
                        console.log("fail", data)
                    }

                })
        }
        // Создать новую страницу 
        if (!this.pageCreation.id) {
            //console.log("savePage", this.pageCreation)
            this.rootStore.fetchDataScr(`${this.rootStore.url}/wip/pages/`, "POST", this.pageCreation).then(
                (data) => {
                    if (data.id) {
                        console.log("done")
                        console.log("id", data.id)
                        this.setPageCreation("id", data.id)
                    } else {
                        console.log("fail")
                    }

                })
        }
        if (close) {
            this.setPageCreationList("dialogOpen", false)
            this.setPagecreationDefault()
            this.setPageCreationList("counter", 0)
            this.LoadPageList()
        }
    }

    @observable pageCreationList = {
        pages: [],
        counter: 0,
        selectId: null,
        dialogOpen: false,
    }

    @action setPageCreationList = (name, value) => {
        this.pageCreationList[name] = value
        if (name === `selectId`) console.log("selectId", this.pageCreationList.selectId)
    }

    @action LoadPageList = () => {
        this.rootStore.fetchDataScr(`${this.rootStore.url}/wip/pages/index/`, "POST", { "counter": this.pageCreationList.counter }).then(
            (data) => {
                console.log("log", data.results)
                this.setPageCreationList("pages", data.results)
            })
    }

    @action prevPageList = () => {
        this.setPageCreationList("counter", this.pageCreationList.counter - 1)
        this.LoadPageList()
    }

    @action nextPageList = () => {
        this.setPageCreationList("counter", this.pageCreationList.counter + 1)
        this.LoadPageList()
    }

    @action deletePageInList = (id) => {
        this.rootStore.fetchDataScr(`${this.rootStore.url}/wip/pages/${id}/`, "DELETE").then(
            (data) => {
                if (data.a) {
                    console.log("done", data)
                    this.setPageCreationList("counter", 0)
                    this.LoadPageList()

                } else {
                    console.log("fail", data)
                }

            })

    }

    @action changeOldPageList = (id) => {
        this.rootStore.fetchDataScr(`${this.rootStore.url}/wip/pages/${id}/`, "GET").then(
            (data) => {
                if (data) {
                    console.log("done")
                    console.log("data", data)
                    this.setPageCreationAll(data)
                    this.setPageCreationList("dialogOpen", true)
                } else {
                    console.log("fail")
                }

            })
    }


    @observable moduleCreation = {
        id: null,
        name: '',
        description: '',
        theme: '',
        difficulty: "",
        category: "",
        type: '',
        imageId: null,
        authorId: null,
        points: [],
    }

    @action setModulecreationDefault = () => {
        this.moduleCreation = {
            id: null,
            name: '',
            description: '',
            theme: '',
            difficulty: "",
            category: "",
            type: '',
            imageId: null,
            authorId: null,
            points: [],
        }
    }


    @action setModuleCreationAll = (value) => {
        this.moduleCreation = value
    }

    @action setModuleCreation = (name, value) => {
        this.moduleCreation[name] = value
    }

    @action setModuleCreationPoints = (index, name, value) => {
        this.moduleCreation.points[index][name] = value
    }

    @action pushNewPoint = () => {
        this.moduleCreation.points.push({ label: `Точка ${this.moduleCreation.points.length + 1}`, type: "theory", openAccordion: true, openSpeedDial: false, pages: [] })
    }

    @action deletePoint = (index) => {
        this.moduleCreation.points = this.moduleCreation.points.filter((n, id) => {
            if (id == index) return false
            return true
        })
    }

    @action deletePageInPoint = (indexPoint, indexPage) => {
        this.moduleCreation.points[indexPoint].pages = this.moduleCreation.points[indexPoint].pages.filter((n, id) => {
            if (id == indexPage) return false
            return true
        })
    }

    @action setPointUp = (index) => {
        if (index != 0) {
            const item = this.moduleCreation.points[index]
            this.moduleCreation.points[index] = this.moduleCreation.points[index - 1]
            this.moduleCreation.points[index - 1] = item
        }
        // const result = Array.from(this.moduleCreation.points);
        // const [removed] = result.splice(index, 1);
        // this.moduleCreation.points = result.splice(index + 1, 0, removed);
    }

    @action setPointDown = (index) => {
        //console.log(this.moduleCreation.points.length, index)
        if (this.moduleCreation.points.length != index + 1) {
            const item = this.moduleCreation.points[index]
            this.moduleCreation.points[index] = this.moduleCreation.points[index + 1]
            this.moduleCreation.points[index + 1] = item
        }
    }

    @action saveModule = (close = false) => {
        // Сохранить изменения в странице
        if (this.moduleCreation.id) {
            //console.log("updatePage", this.pageCreation)
            this.rootStore.fetchDataScr(`${this.rootStore.url}/wip/modules/${this.moduleCreation.id}/`, "PUT", this.moduleCreation).then(
                (data) => {
                    if (data) {
                        console.log("done", data)

                    } else {
                        console.log("fail", data)
                    }

                })
        }
        // Создать новую страницу 
        if (!this.moduleCreation.id) {
            //console.log("savePage", this.pageCreation)
            this.rootStore.fetchDataScr(`${this.rootStore.url}/wip/modules/`, "POST", this.moduleCreation).then(
                (data) => {
                    if (data.id) {
                        console.log("done")
                        console.log("id", data.id)
                        this.setModuleCreation("id", data.id)
                    } else {
                        console.log("fail")
                    }

                })
        }
        if (close) {
            this.setModuleCreationList("dialogOpen", false)
            this.setModulecreationDefault()
            this.setModuleCreationList("counter", 0)
            this.LoadModuleList()
        }
    }


    @observable moduleCreationList = {
        modules: [],
        counter: 0,
        selectId: null,
        dialogOpen: false,
    }

    @action setModuleCreationList = (name, value) => {
        this.moduleCreationList[name] = value
        if (name === `selectId`) console.log("selectId", this.moduleCreationList.selectId)
    }

    @action LoadModuleList = () => {
        this.rootStore.fetchDataScr(`${this.rootStore.url}/wip/modules/index/`, "POST", { "counter": this.moduleCreationList.counter }).then(
            (data) => {
                console.log("log", data.results)
                this.setModuleCreationList("modules", data.results)
            })
    }

    @action prevModuleList = () => {
        this.setModuleCreationList("counter", this.moduleCreationList.counter - 1)
        this.LoadModuleList()
    }

    @action nextModuleList = () => {
        this.setModuleCreationList("counter", this.moduleCreationList.counter + 1)
        this.LoadModuleList()
    }

    @action deleteModuleInList = (id) => {
        this.rootStore.fetchDataScr(`${this.rootStore.url}/wip/pages/${id}/`, "DELETE").then(
            (data) => {
                if (data.a) {
                    console.log("done", data)
                    this.setModuleCreationList("counter", 0)
                    this.LoadModuleList()

                } else {
                    console.log("fail", data)
                }

            })

    }

    @action changeOldModuleList = (id) => {
        this.rootStore.fetchDataScr(`${this.rootStore.url}/wip/pages/${id}/`, "GET").then(
            (data) => {
                if (data) {
                    console.log("done")
                    console.log("data", data)
                    this.setModuleCreationAll(data)
                    this.setModuleCreationList("dialogOpen", true)
                } else {
                    console.log("fail")
                }

            })
    }
}

export default ManagmentStore;