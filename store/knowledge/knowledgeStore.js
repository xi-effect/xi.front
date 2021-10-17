import { action, observable, computed, runInAction, makeObservable } from 'mobx'


class KnowledgeStore {
    // `this` from rootstore passed to the constructor and we can 
    // assign it to a variable accessible in this class called 
    // `rootStore`. Therefore, we can access other store like 
    // useStore for e.g (this.rootStore.userStore)
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeObservable(this)
    }


    //PageList

    @observable pageList = {
        pages: [],
        counter: 0,
        search: "",
        loadingInd: true,
        loadingNothing: false,
    }

    @action setPageListData = (name, value) => {
        this.pageList[name] = value
    }

    @action prevPageInPages = () => {
        this.setPageListData("counter", this.pageList.counter - 1)
        this.loadPageList()
    }

    @action nextPageInPages = () => {
        this.setPageListData("counter", this.pageList.counter + 1)
        this.loadPageList()
    }

    @action goSearchInPages = () => {
        this.setPageListData("loadingNothing", false)
        this.setPageListData("counter", 0)
        this.loadPageList(true)
        console.log("pageList", this.pageList)
    }

    @action clearSearchInPages = () => {
        this.setPageListData("loadingNothing", false)
        this.setPageListData("search", "")
        this.setPageListData("counter", 0)
        this.loadPageList()
    }

    @action loadPageList = (isSearch = false) => {
        this.rootStore.fetchDataScr(`${this.rootStore.url}/pages/`, "POST", { "counter": this.pageList.counter, "search": this.pageList.search }).then(
            (data) => {
                console.log("loadPageList", data)
                this.setPageListData("pages", data)
                this.setPageListData("loadingInd", false)
                if (isSearch && data.length === 0) this.setPageListData("loadingNothing", true)
            })
    }


    //Page

    @observable page = {
        loading: true,
        id: null,
        name: "",
        description: "",
        theme: "",
        kind: "",
        components: [],
        blueprint: null,
        reusable: null,
        public: null,
        authorId: null,
        authorName: null,
        views: null,
        updated: null,
    }

    @action setSingleQuiz = (index, indexA) => {
        for (let i = 0; i < this.page.components[index].content.length; i += 1) {
            this.page.components[index].content[i].userAnswer = false
        }
        this.page.components[index].content[indexA].userAnswer = true
    }

    @action isAnswerRight = (index) => {
        for (let i = 0; i < this.page.components[index].content.length; i += 1) {
            if (this.page.components[index].content[i].userAnswer != this.page.components[index].content[i].rightAnswer) {
                this.page.components[index].successAnswer = false
                return
            }
        }
        this.page.components[index].successAnswer = true
        console.log("logs", this.page.components[index])
    }

    @action setComponentsContent = (index, indexA, name, value) => {
        this.page.components[index].content[indexA][name] = value
    }

    @action setPage = (value) => {
        this.page = value
    }

    @action setPageData = (name, value) => {
        this.page[name] = value
    }

    @action loadPage = () => {
        this.setPageData("loading", true)
        let str = document.location.href.toString()
        const id = str.slice(str.lastIndexOf("/") + 1)
        console.log("id", id)
        this.rootStore.fetchDataScr(`${this.rootStore.url}/pages/${id}/`, "GET").then(
            (data) => {
                console.log("meta", data)
                this.setPage(data)
                this.setPageData("authorId", data["author-id"])
                this.setPageData("authorName", data["author-name"])
                this.setPageData("loading", false)
            })
    }

    //ModuleList

    @observable moduleList = {
        modules: [],
        counter: 0,
        search: "",
        filters: {
            global: null,
            category: null,
            theme: null,
            difficulty: null,
        },
        sort: "popularity",
        loadingInd: true,
        loadingNothing: false,
    }

    @action setModuleListData = (name, value) => {
        this.moduleList[name] = value
    }

    @action setModuleListDataSecondary = (name, secondName, value) => {
        this.moduleList[name][secondName] = value
    }

    @action setModuleListDataInModules = (index, name, value) => {
        this.moduleList.modules[index][name] = value
    }

    @action prevPageInModules = () => {
        this.setModuleListData("counter", this.moduleList.counter - 1)
        this.loadModuleList()
    }

    @action nextPageInModules = () => {
        this.setModuleListData("counter", this.moduleList.counter + 1)
        this.loadModuleList()
    }

    @action goSearchInModules = () => {
        this.setModuleListData("loadingNothing", false)
        this.setModuleListData("counter", 0)
        this.loadModuleList(true)
        console.log("moduleList", this.moduleList)
    }

    @action clearSearchInModules = () => {
        this.setModuleListData("loadingNothing", false)
        this.setModuleListData("search", "")
        this.setModuleListData("counter", 0)
        this.loadModuleList()
    }

    @action clearFilters = () => {
        this.setModuleListDataSecondary("filters", "global", null)
        this.setModuleListDataSecondary("filters", "category", null)
        this.setModuleListDataSecondary("filters", "theme", null)
        this.setModuleListDataSecondary("filters", "difficulty", null)
        this.loadModuleList()
    }

    @action setPreferenceInModules = (index, indexName, id, name, value) => {
        this.rootStore.fetchDataScr(`${this.rootStore.url}/modules/${id}/preference/`, "POST", { "a": name })
            .then((data) => {
                if (data.a) {
                    if (name != "hide") this.setModuleListDataInModules(index, indexName, value)
                    if (name === "hide") this.loadModuleList()
                }
            })
    }



    @action loadModuleList = (isSearch = false) => {
        let filters = {}
        if (this.moduleList.filters.global != null) filters.global = this.moduleList.filters.global
        if (this.moduleList.filters.category != null) filters.category = this.moduleList.filters.category
        if (this.moduleList.filters.theme != null) filters.theme = this.moduleList.filters.theme
        if (this.moduleList.filters.difficulty != null) filters.difficulty = this.moduleList.filters.difficulty
        if (this.moduleList.filters.global === null && this.moduleList.filters.category === null && this.moduleList.filters.theme === null && this.moduleList.filters.difficulty === null) filters = null
        this.setModuleListData("loadingInd", true)
        this.rootStore.fetchDataScr(`${this.rootStore.url}/modules/`, "POST", { "filters": filters, "counter": this.moduleList.counter, "search": this.moduleList.search, "sort": this.moduleList.sort, })
            .then((data) => {
                console.log("loadModuleList", data)
                this.setModuleListData("modules", data)
                this.setModuleListData("loadingInd", false)
                if (isSearch && data.length === 0) this.setModuleListData("loadingNothing", true)
            })
    }

    @observable module = {
        loading: true,
        openAccordion: false,
        id: null,
        name: "",
        description: "",
        theme: "",
        kind: "",
        components: [],
        map: [],
        type: "",
        blueprint: null,
        reusable: null,
        public: null,
        authorId: null,
        authorName: null,
        views: null,
        updated: null,
    }

    @action setModule = (value) => {
        this.module = value
    }

    @action setModuleData = (name, value) => {
        this.module[name] = value
    }

    @action loadPageInModule = () => {
        if (this.module.type === "practice-block" || this.module.type === "standard") {
            this.rootStore.fetchDataScr(`${this.rootStore.url}/modules/${this.module.id}/next/`, "POST", { bun: "cinnamon" })
                .then((data) => {
                    console.log("pageInModule", data)
                    this.setPage(data)
                })
        }
        if (this.module.type === "theory-block" || this.module.type === "test") {
            this.rootStore.fetchDataScr(`${this.rootStore.url}/modules/${this.module.id}/next/`, "POST", { bun: "cinnamon" })
                .then((data) => {
                    console.log("pageInModule", data)
                    this.setPage(data)
                })
        }

    }

    @action loadModule = () => {
        this.setModuleData("loading", true)
        let str = document.location.href.toString()
        console.log("str", str)
        const firstId = str.slice(str.lastIndexOf("/") + 1)
        str = str.slice(0, str.lastIndexOf("/"))
        console.log("str", str)
        const secondId = str.slice(str.lastIndexOf("/") + 1)
        let lastId = null
        if (secondId === "module") lastId = firstId
        else lastId = secondId
        console.log("lastId", lastId)
        this.rootStore.fetchDataScr(`${this.rootStore.url}/modules/${lastId}/`, "GET").then(
            (data) => {
                console.log("meta", data)
                this.setModule(data)
                this.setModuleData("authorId", data["author-id"])
                this.setModuleData("openAccordion", false)
                this.setModuleData("loading", false)
                this.loadPageInModule()
            })
    }
}

export default KnowledgeStore;