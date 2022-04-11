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
import UserStore from "./user/userSt";
import AuthorizationStore from "./user/authorizationSt";
import MessageStore from "./message/messageSt";
import CommunityStore from "./community/communitySt";


enableStaticRendering(typeof window === "undefined")

let store

class RootStore {
  url = process.env.NEXT_PUBLIC_SERVER_URL

  constructor() {
    this.uiSt = new UIStore(this)
    this.homeSt = new HomeStore(this)
    this.userSt = new UserStore(this)
    this.authorizationSt = new AuthorizationStore(this)
    this.messageSt = new MessageStore(this)
    this.communitySt = new CommunityStore(this)
    makeObservable(this)
  }

  @action async fetchData(url, method, data = null) {
    try {
      let response = null
      if (data != null) {
        response = await fetch(url, {
          method,
          cache: "no-cache",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        });
      }
      if (data == null) {
        response = await fetch(url, {
          method,
          cache: "no-cache",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      if (response.status === 422 || response.status === 401) {
        const router = Router
        router.push("/login")
        return null
      }
      if (response.ok) {
        const string = await response.text();
        const json = string === "" ? {} : JSON.parse(string);
        return json;
      }
      const string = await response.text();
      const json = string === "" ? {} : JSON.parse(string);
      return json;

    } catch (error) {
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
