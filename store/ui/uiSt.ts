import { action, observable, makeObservable } from 'mobx';
import RootStore from '../rootStore';

type DialogsType = {
  communityCreation: boolean,
  categoryCreation: boolean;
  channelCreation: boolean;
  invite: boolean;
  privacy: boolean;
  settings: boolean;
  userSettings: boolean;
  communitySettings: boolean;
  communityMenu: boolean;
};

class UISt {
  // `this` from rootstore passed to the constructor and we can
  // assign it to a variable accessible in this class called
  // `rootStore`. Therefore, we can access other store like
  // useStore for e.g (this.rootStore.userStore)
  rootStore: RootStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable navigation = {
    swipe: 'center',
  };

  @action setNavigation = (name: string, value: string) => {
    this.navigation[name] = value;
  };

  // Loading Screen
  @observable load = {
    loading: null,
  };

  @action setLoading = (name: string, value: boolean) => {
    this.load[name] = value;
  };

  @observable knowledge = {
    activeStep: 0,
    activeStepModuleCreate: 0,
  };

  @action setKnowledge = (name, value) => {
    this.knowledge[name] = value;
  };

  @observable reportData = {};

  @action setReportData = (name, value) => {
    this.reportData[name] = value;
  };

  @action clearReportData = () => {
    this.reportData = {};
  };

  @observable dialogs: DialogsType = {
    communityCreation: false,
    categoryCreation: false,
    channelCreation: false,
    invite: false,
    privacy: false,
    settings: false,
    userSettings: false,
    communitySettings: false,
    communityMenu: false,
  };

  @action setDialogs = (name: string, value: boolean) => {
    this.dialogs[name] = value;
  };
}

export default UISt;
