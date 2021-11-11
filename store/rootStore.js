import { action, observable, computed, runInAction, makeObservable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'
import { useMemo } from 'react'
import Router from 'next/router'

import { io } from "socket.io-client";

import UIStore from "./ui/uiStore";
import MainStore from "./main/mainStore";
import KnowledgeStore from "./knowledge/knowledgeStore";
import ManagmentStore from "./managment/managmentStore";
import SettingsStore from "./settings/settingsStore";
import ContentStore from "./content/contentStore";
import AuthorizationStore from "./authorization/authorizationStore";
import MessageStore from "./message/messageStore";

enableStaticRendering(typeof window === 'undefined')

let store

class RootStore {
  url = 'https://xieffect.pythonanywhere.com'
  constructor() {
    this.uiStore = new UIStore(this)
    this.mainStore = new MainStore(this)
    this.knowledgeStore = new KnowledgeStore(this)
    this.managmentStore = new ManagmentStore(this)
    this.settingsStore = new SettingsStore(this)
    this.contentStore = new ContentStore(this)
    this.authorizationStore = new AuthorizationStore(this)
    this.messageStore = new MessageStore(this)
    makeObservable(this)
  }


  // socket = io("http://f877-188-242-138-193.ngrok.io/", {
  //   withCredentials: true,
  // });

  @action getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  @action async fetchData(url, method, data) { // mode, cache, credentials, redirect, referrerPolicy
    // Default options are marked with *
    try {
      let response = null
      if (data != null) {
        response = await fetch(url, {
          method: method, // *GET, POST, PUT, DELETE, etc.
          //mode: 'no-cors', // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "include", // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          // redirect, // manual, *follow, error
          // referrerPolicy, // no-referrer, *client
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
      }
      if (data == null) {
        response = await fetch(url, {
          method: method, // *GET, POST, PUT, DELETE, etc.
          //mode: 'no-cors', // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "include", // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          // redirect, // manual, *follow, error
          // referrerPolicy, // no-referrer, *client
        });
      }
      //console.log(response.headers)
      if (response.ok) {
        const string = await response.text();
        const json = string === "" ? {} : JSON.parse(string);
        return json; // parses JSON response into native JavaScript objects
      } else {
        const string = await response.text();
        const json = string === "" ? {} : JSON.parse(string);
        return json;
      }
    } catch (error) {
      //console.log(error)
      console.log('Возникла проблема с вашим fetch запросом: ', error.message);
    }
  }

  @action async fetchDataScr(url, method, data = null) { // mode, cache, credentials, redirect, referrerPolicy
    // Default options are marked with *
    try {
      //console.log("Печенье:", this.getCookie('csrf_access_token'))
      let response = null
      if (data != null) {
        response = await fetch(url, {
          method: method, // *GET, POST, PUT, DELETE, etc.
          //mode: 'no-cors', // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "include", // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': this.getCookie('csrf_access_token'),
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          // redirect, // manual, *follow, error
          // referrerPolicy, // no-referrer, *client
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
      }
      if (data == null) {
        response = await fetch(url, {
          method: method, // *GET, POST, PUT, DELETE, etc.
          //mode: 'no-cors', // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "include", // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': this.getCookie('csrf_access_token'),
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          // redirect, // manual, *follow, error
          // referrerPolicy, // no-referrer, *client
        });
      }
      console.log("response", response)
      if (response.ok) {
        const string = await response.text();
        const json = string === "" ? {} : JSON.parse(string);
        return json; // parses JSON response into native JavaScript objects
      }
      if (response.status === 422 || response.status === 401) {
        const router = Router
        router.push('/login')
        return null
      }

    } catch (error) {
      console.log(error)
      console.log('Возникла проблема с вашим fetch запросом: ', error.message);
    }
  }

}

function initializeStore(initialData = null) {
  const _store = store ?? new RootStore()

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here
  if (initialData) {
    _store.hydrate(initialData)
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
