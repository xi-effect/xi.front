/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
import {
  action,
  observable,
  makeObservable,
} from "mobx";

import Router from "next/router"

const router = Router
class KnowledgeStore {
  // `this` from rootstore passed to the constructor and we can
  // assign it to a variable accessible in this class called
  // `rootStore`. Therefore, we can access other store like
  // useStore for e.g (this.rootStore.userStore)
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  // PageList

  @observable pageList = {
    pages: [],
    counter: 0,
    search: "",
    loadingInd: true,
    loadingNothing: false,
  };

  @action setPageListData = (name, value) => {
    this.pageList[name] = value;
  };

  @action prevPageInPages = () => {
    this.setPageListData("counter", this.pageList.counter - 1);
    this.loadPageList();
  };

  @action nextPageInPages = () => {
    this.setPageListData("counter", this.pageList.counter + 1);
    this.loadPageList();
  };

  @action goSearchInPages = () => {
    this.setPageListData("loadingNothing", false);
    this.setPageListData("counter", 0);
    this.loadPageList(true);
    console.log("pageList", this.pageList);
  };

  @action clearSearchInPages = () => {
    this.setPageListData("loadingNothing", false);
    this.setPageListData("search", "");
    this.setPageListData("counter", 0);
    this.loadPageList();
  };

  @action loadPageList = (isSearch = false) => {
    this.rootStore
      .fetchDataScr(`${this.rootStore.url}/pages/`, "POST", {
        counter: this.pageList.counter,
        search: this.pageList.search,
      })
      .then((data) => {
        console.log("loadPageList", data);
        this.setPageListData("pages", data.results);
        this.setPageListData("loadingInd", false);
        if (isSearch && data.results.length === 0)
          this.setPageListData("loadingNothing", true);
      });
  };

  // Page

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
    quizCounter: 0,
    rightAnswersCounter: 0,
    showAnswers: false,
  };

  @action setAnswer = (type, index, indexAnswer) => {
    console.log("setAQ", type, index, indexAnswer, this.page.components[index])
    if (type === "multiple") {
      if (!(this.page.components[index].userAnswers.includes(indexAnswer))) {
        console.log("add")
        this.page.components[index].userAnswers.push(indexAnswer)
        console.log("this.page.components[index]", this.page.components[index])
        return;
      }
      if (this.page.components[index].userAnswers.includes(indexAnswer)) {
        console.log("remove")
        this.page.components[index].userAnswers = this.page.components[index].userAnswers.filter(item => item !== indexAnswer)
        console.log("this.page.components[index]", this.page.components[index])
        return;
      }
    }
    if (type === "single") {
      if (this.page.components[index].userAnswers.includes(indexAnswer)) {
        console.log("remove")
        return this.page.components[index].userAnswers = []
      }
      if (!(this.page.components[index].userAnswers.includes(indexAnswer))) {
        console.log("add")
        return this.page.components[index].userAnswers[0] = indexAnswer
      }
    }
  };

  @action isAnswerRight = (index, type = null) => {
    this.page.components[index].successAnswer = false
    if (type === "numanswer") {
      this.page.components[index].userAnswer.replace(",", ".")
      this.page.components[index].label.replace(",", ".")
      if (this.page.components[index].userAnswer === this.page.components[index].label) {
        this.page.components[index].successAnswer = true
      }
    }
    if (type === null) {
      this.page.components[index].rightAnswers.sort()
      this.page.components[index].userAnswers.sort()
      if (JSON.stringify(this.page.components[index].rightAnswers) === JSON.stringify(this.page.components[index].userAnswers)) {
        this.page.components[index].successAnswer = true
      } else {
        this.page.components[index].successAnswer = false
      }
    }
    console.log("logs", this.page.components[index]);
  };



  @action setPage = (value) => {
    this.page = value;
  };

  @action setPageData = (name, value) => {
    this.page[name] = value;
  };

  @action setPageComponentsData = (index, name, value) => {
    this.page.components[index][name] = value;
  };

  @action setComponentsContent = (index, indexA, name, value) => {
    this.page.components[index].content[indexA][name] = value;
  };

  @action getAnswersResults = () => {
    this.page.components.rightAnswersCounter = 0
    this.page.components.forEach((item, index) => {
      if (item.type === "quiz") {
        const ra = item.rightAnswers
        const ua = item.userAnswers
        ra.sort()
        ua.sort()
        if (JSON.stringify(ra) === JSON.stringify(ua)) {
          this.page.components.rightAnswersCounter += 1
        }
      }
      this.module.answers[index] = item.userAnswers
    });
  }

  @action loadPage = () => {
    this.setPageData("loading", true);
    const str = document.location.href.toString();
    const id = str.slice(str.lastIndexOf("/") + 1);
    console.log("id", id);
    this.rootStore
      .fetchDataScr(`${this.rootStore.url}/pages/${id}/`, "GET")
      .then((data) => {
        console.log("meta", data);
        if (data.a === "Page not found") return this.setPageData("loading", true)
        this.setPage(data);
        this.setPageData("authorId", data["author-id"]);
        this.setPageData("authorName", data["author-name"]);
        this.setPageData("loading", false);
      });
  };

  // ModuleList

  @observable moduleList = {
    modules: [],
    counter: 0,
    search: "",
    filters: {
      global: "default",
      category: "default",
      theme: "default",
      difficulty: "default",
    },
    sort: "popularity",
    loadingInd: true,
    loadingNothing: false,
  };

  @action setModuleListData = (name, value) => {
    this.moduleList[name] = value;
  };

  @action setModuleListDataSecondary = (name, secondName, value) => {
    this.moduleList[name][secondName] = value;
  };

  @action setModuleListDataInModules = (index, name, value) => {
    this.moduleList.modules[index][name] = value;
  };

  @action prevPageInModules = () => {
    this.setModuleListData("counter", this.moduleList.counter - 1);
    this.loadModuleList();
  };

  @action nextPageInModules = () => {
    this.setModuleListData("counter", this.moduleList.counter + 1);
    this.loadModuleList();
  };

  @action goSearchInModules = () => {
    this.setModuleListData("loadingNothing", false);
    this.setModuleListData("counter", 0);
    this.loadModuleList(true);
    console.log("moduleList", this.moduleList);
  };

  @action clearSearchInModules = () => {
    this.setModuleListData("loadingNothing", false);
    this.setModuleListData("search", "");
    this.setModuleListData("counter", 0);
    this.loadModuleList();
  };

  @action clearFilters = () => {
    this.setModuleListDataSecondary("filters", "global", null);
    this.setModuleListDataSecondary("filters", "category", null);
    this.setModuleListDataSecondary("filters", "theme", null);
    this.setModuleListDataSecondary("filters", "difficulty", null);
    this.loadModuleList();
  };

  @action setPreferenceInModules = (index, indexName, id, name, value) => {
    this.rootStore
      .fetchDataScr(`${this.rootStore.url}/modules/${id}/preference/`, "POST", {
        a: name,
      })
      .then((data) => {
        if (data.a) {
          if (name !== "hide")
            this.setModuleListDataInModules(index, indexName, value);
          if (name === "hide") this.loadModuleList();
        }
      });
  };

  @action loadModuleList = (isSearch = false) => {
    let filters = {};
    if (this.moduleList.filters.global !== "default")
      filters.global = this.moduleList.filters.global;
    if (this.moduleList.filters.category !== "default")
      filters.category = this.moduleList.filters.category;
    if (this.moduleList.filters.theme !== "default")
      filters.theme = this.moduleList.filters.theme;
    if (this.moduleList.filters.difficulty !== "default")
      filters.difficulty = this.moduleList.filters.difficulty;
    if (
      this.moduleList.filters.global === "default" &&
      this.moduleList.filters.category === "default" &&
      this.moduleList.filters.theme === "default" &&
      this.moduleList.filters.difficulty === "default"
    )
      filters = null;
    this.setModuleListData("loadingInd", true);
    this.rootStore
      .fetchDataScr(`${this.rootStore.url}/modules/`, "POST", {
        filters,
        counter: this.moduleList.counter,
        search: this.moduleList.search,
        sort: this.moduleList.sort,
      })
      .then((data) => {
        console.log("loadModuleList", data);
        this.setModuleListData("modules", data.results);
        this.setModuleListData("loadingInd", false);
        if (isSearch && data.results.length === 0)
          this.setModuleListData("loadingNothing", true);
      });
  };

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
    activeIdInMap: null,
    answers: {},
    showAnswers: false,
  };

  @action clearModule = () => {
    this.module = {};
  };

  @action setModule = (value) => {
    this.module = value;
  };

  @action setModuleData = (name, value) => {
    this.module[name] = value;
  };

  @action loadPageInModule = (nextPageId = null, first = null) => {
    this.setPageData("loading", true);
    if (
      this.module.type === "practice-block" ||
      this.module.type === "standard"
    ) {
      this.rootStore
        .fetchDataScr(
          `${this.rootStore.url}/modules/${this.module.id}/next/`,
          "POST",
          { bun: "cinnamon" }
        )
        .then((data) => {
          console.log("pageInModule", data);
          if (data?.a === "You have reached the end") {
            this.loadModule();
          } else {
            this.setPage(data);
            router.push(`/knowledge/module/${this.module.id}/${this.page.id}`)
            this.setPageData("loading", false);
          }
        });
    }
    if (this.module.type === "theory-block") {
      this.rootStore
        .fetchDataScr(
          `${this.rootStore.url}/modules/${this.module.id}/points/${nextPageId}/`,
          "GET"
        )
        .then((data) => {
          console.log("pageInModule", data);
          if (nextPageId === this.module.map.length) {
            this.loadPageInModule(0);
          } else {
            this.setModuleData("activeIdInMap", nextPageId);
            this.setPage(data);
            router.push(`/knowledge/module/${this.module.id}/${nextPageId}`)
            this.setPageData("loading", false);
          }
        });
    }
    if (this.module.type === "test") {
      if (first === null) {
        this.setModuleData("answers", {});
        this.setPageData("quizCounter", 0);
        this.setPageData("rightAnswersCounter", 0);
        this.getAnswersResults()
        console.log("uA", this.module.answers)
        this.page.components.forEach((item) => {
          if (item.type === "quiz")
            this.setPageData("quizCounter", this.page.quizCounter + 1);
        });
        this.rootStore
          .fetchDataScr(
            `${this.rootStore.url}/modules/${this.module.id}/points/${this.module.activeIdInMap}/reply/`,
            "POST",
            {
              answers: {
                pageName: this.page.name,
                ...this.module.answers,
              },
              "right-answers": this.page.rightAnswersCounter,
              "total-answers": this.page.quizCounter,
            }
          )
          .then((data) => {
            console.log(data)
          });
      }
      this.rootStore
        .fetchDataScr(
          `${this.rootStore.url}/modules/${this.module.id}/points/${nextPageId}/`,
          "GET"
        )
        .then((data) => {
          console.log("pageInModule", data);
          if (nextPageId === this.module.map.length) {
            this.loadPageInModule(0);
          } else {
            this.setModuleData("activeIdInMap", nextPageId);
            this.setPage(data);
            router.push(`/knowledge/module/${this.module.id}/${nextPageId}`)
            console.log("pageInModule2", this.page);
            this.rootStore
              .fetchDataScr(
                `${this.rootStore.url}/modules/${this.module.id}/points/${nextPageId}/reply/`,
                "GET"
              )
              .then((data) => {
                console.log("uaData", data)
                for (const key in data) {
                  console.log("key", key)
                  if (key !== "pageName") {
                    this.setPageComponentsData(key, "userAnswers", data[key])
                  }
                  /* ... делать что-то с obj[key] ... */
                }
                this.setPageData("loading", false);
              });
          }
        });
    }
  };

  @action loadModule = () => {
    this.setModuleData("loading", true);
    this.setPageData("loading", true);
    // Получение id из url
    let str = document.location.href.toString();
    console.log("str", str);
    const firstId = str.slice(str.lastIndexOf("/") + 1);
    str = str.slice(0, str.lastIndexOf("/"));
    console.log("str", str);
    const secondId = str.slice(str.lastIndexOf("/") + 1);
    let lastId = null;

    if (secondId === "module") lastId = firstId;
    else lastId = secondId;
    console.log("lastId", lastId);
    console.log("firstId", firstId);
    console.log("secondId", secondId);

    this.rootStore
      .fetchDataScr(`${this.rootStore.url}/modules/${lastId}/`, "GET")
      .then((data) => {
        console.log("meta", data);
        this.setModule(data);
        this.setModuleData("answers", { a: true });
        this.setModuleData("authorId", data["author-id"]);
        this.setModuleData("openAccordion", false);
        this.setModuleData("loading", false);
        if (this.module.type === "standard") {
          this.rootStore
            .fetchDataScr(
              `${this.rootStore.url}/modules/${this.module.id}/open/`,
              "GET"
            )
            .then((data) => {
              this.setPage(data);
              router.push(`/knowledge/module/${this.module.id}/${this.page.id}`)
              this.setPageData("loading", false);
            });
        } else if (this.module.type === "theory-block") {
          this.rootStore
            .fetchDataScr(
              `${this.rootStore.url}/modules/${this.module.id}/open/`,
              "GET"
            )
            .then((data) => {
              console.log("theory-block", data);
              if (data.id !== null) {
                this.setModuleData("activeIdInMap", data.id);
                this.loadPageInModule(data.id);
              } else {
                this.setModuleData("activeIdInMap", 0);
                this.loadPageInModule(0);
              }
            });
        }
        if (
          this.module.type !== "theory-block" &&
          this.module.type !== "standard"
        ) {
          if (firstId !== "start") {
            this.setModuleData("activeIdInMap", Number(firstId));
            this.loadPageInModule(Number(firstId), true);
          } else {
            this.setModuleData("activeIdInMap", 0);
            this.loadPageInModule(0, true);
          }

        }
      });
  };

  @observable moduleCompleted = {
    isFinished: false,
    results: [],
  }

  @action setModuleCompleted = (name, value) => {
    this.moduleCompleted[name] = value
  }

  @action getTestModuleResults = () => {
    this.setModuleData("answers", {});
    this.setPageData("quizCounter", 0);
    this.setPageData("rightAnswersCounter", 0);
    this.getAnswersResults()
    console.log("uA", this.module.answers)
    this.page.components.forEach((item) => {
      if (item.type === "quiz")
        this.setPageData("quizCounter", this.page.quizCounter + 1);
    });
    this.rootStore
      .fetchDataScr(
        `${this.rootStore.url}/modules/${this.module.id}/points/${this.module.activeIdInMap}/reply/`,
        "POST",
        {
          answers: {
            pageName: this.page.name,
            ...this.module.answers,
          },
          "right-answers": this.page.rightAnswersCounter,
          "total-answers": this.page.quizCounter,
        }
      )
      .then((data) => {
        console.log(data)
        this.rootStore
          .fetchDataScr(
            `${this.rootStore.url}/modules/${this.module.id}/results/`,
            "GET"
          )
          .then((data) => {
            console.log("results", data)
            this.setModuleCompleted("results", data)
            this.setModuleCompleted("isFinished", true)
            this.setModuleData("showAnswers", true)
            router.push(`/knowledge/module/results`)
          });
      });

  }

  @action uploadPageForResults = (id, indx) => {
    this.setPageData("loading", true);
    this.rootStore
      .fetchDataScr(`${this.rootStore.url}/pages/${id}/`, "GET")
      .then((data) => {
        console.log("meta", data);
        this.setPage(data);
        this.setPageData("authorId", data["author-id"]);
        this.setPageData("authorName", data["author-name"]);
        this.page.components.forEach((item, index) => {
          if (item.type === "quiz") {
            this.setPageComponentsData(index, "userAnswers", this.moduleCompleted.results[indx].answers[index])
          }
        })
        router.push(`/knowledge/module/results/${id}/`)
        this.setPageData("loading", false);
      });
  }
}

export default KnowledgeStore;
