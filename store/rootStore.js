/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import { action, makeObservable } from "mobx"
import { enableStaticRendering } from "mobx-react"
import { useMemo } from "react"
import Router from "next/router"

import UIStore from "./ui/uiSt";
import HomeStore from "./home/homeSt";
import SettingsStore from "./settings/settingsSt";
import AuthorizationStore from "./authorization/authorizationSt";
import MessageStore from "./message/messageSt";
import ProfileStore from "./profile/profileSt";
import CommunityStore from "./community/communitySt";


enableStaticRendering(typeof window === "undefined")

let store

class RootStore {
  url = process.env.NEXT_PUBLIC_SERVER_URL

  constructor() {
    this.uiSt = new UIStore(this)
    this.homeSt = new HomeStore(this)
    this.settingsSt = new SettingsStore(this)
    this.authorizationSt = new AuthorizationStore(this)
    this.messageSt = new MessageStore(this)
    this.profileSt = new ProfileStore(this)
    this.communitySt = new CommunityStore(this)
    makeObservable(this)
  }

  @action getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  @action async fetchData(url, method, data) { // mode, cache, credentials, redirect, referrerPolicy
    // Default options are marked with *
    try {
      let response = null
      if (data != null) {
        response = await fetch(url, {
          method, // *GET, POST, PUT, DELETE, etc.
          // mode: "no-cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "include", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
          },
          // redirect, // manual, *follow, error
          // referrerPolicy, // no-referrer, *client
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
      }
      if (data == null) {
        response = await fetch(url, {
          method, // *GET, POST, PUT, DELETE, etc.
          // mode: "no-cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "include", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
          },
          // redirect, // manual, *follow, error
          // referrerPolicy, // no-referrer, *client
        });
      }
      // console.log(response.headers)
      if (response.ok) {
        const string = await response.text();
        const json = string === "" ? {} : JSON.parse(string);
        return json; // parses JSON response into native JavaScript objects
      }
      const string = await response.text();
      const json = string === "" ? {} : JSON.parse(string);
      return json;

    } catch (error) {
      // console.log(error)
      console.log("Возникла проблема с вашим fetch запросом: ", error.message);
    }
  }

  @action async fetchDataScr(url, method, data = null) { // mode, cache, credentials, redirect, referrerPolicy
    // Default options are marked with *
    try {
      // console.log("Печенье:", this.getCookie("csrf_access_token"))
      let response = null
      if (data != null) {
        response = await fetch(url, {
          method, // *GET, POST, PUT, DELETE, etc.
          // mode: "no-cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "include", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
          },
          // redirect, // manual, *follow, error
          // referrerPolicy, // no-referrer, *client
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
      }
      if (data == null) {
        response = await fetch(url, {
          method, // *GET, POST, PUT, DELETE, etc.
          // mode: "no-cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "include", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
          },
          // redirect, // manual, *follow, error
          // referrerPolicy, // no-referrer, *client
        });
      }
      console.log("response", response)

      if (response.status === 422 || response.status === 401) {
        const router = Router
        router.push("/login")
        return null
      }
      if (response.ok) {
        const string = await response.text();
        const json = string === "" ? {} : JSON.parse(string);
        return json; // parses JSON response into native JavaScript objects
      }
      const string = await response.text();
      const json = string === "" ? {} : JSON.parse(string);
      return json;

    } catch (error) {
      // console.log(error)
      console.log("Возникла проблема с вашим fetch запросом: ", error.message);
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
  if (typeof window === "undefined") return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
