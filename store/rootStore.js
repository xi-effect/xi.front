/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import { action, makeObservable } from "mobx"
import { enableStaticRendering } from "mobx-react"
import { useMemo } from "react"
import Router from "next/router"

import UISt from "./ui/uiSt";
import HomeSt from "./home/homeSt";
import UserSt from "./user/userSt";
import AuthorizationSt from "./user/authorizationSt";
import MessageSt from "./message/messageSt";
import CommunitySt from "./community/communitySt";
import CommunityCreationSt from "./community/communityCreationSt";
import CommunitiesMenuSt from "./community/communitiesMenuSt";
import CommunityChannelsSt from "./community/communityChannelsSt";

enableStaticRendering(typeof window === "undefined")

let store

class RootStore {
  url = process.env.NEXT_PUBLIC_SERVER_URL

  constructor() {
    this.uiSt = new UISt(this)
    this.homeSt = new HomeSt(this)
    this.userSt = new UserSt(this)
    this.authorizationSt = new AuthorizationSt(this)
    this.messageSt = new MessageSt(this)

    // Stores for communities
    this.communitySt = new CommunitySt(this)
    this.communityCreationSt = new CommunityCreationSt(this)
    this.communitiesMenuSt = new CommunitiesMenuSt(this)
    this.communityChannelsSt = new CommunityChannelsSt(this)

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
