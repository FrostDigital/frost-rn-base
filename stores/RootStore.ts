import {action, observable} from "mobx";
import React from "react";
import {AppState} from "react-native";
import ApiStore from "./ApiStore";
import AuthStore from "./AuthStore";
import BaseStore from "./BaseStore";
import ConfigStore from "./ConfigStore";
import FeatureFlagStore from "./FeatureFlagStore";
import LogStore from "./LogStore";

/**
 * "One store to rule them all"
 */
export class RootStore {
  stores = {
    apiStore: new ApiStore(this),
    featureFlagStore: new FeatureFlagStore(this),
    authStore: new AuthStore(this),
    configStore: new ConfigStore(this),
    logStore: new LogStore(this),
    // 👊 Add more stores here
  };

  @observable
  initialized?: boolean;

  constructor() {
    console.log("Constructing root store...");

    AppState.addEventListener("change", e => {
      if (e === "active") {
        this.onAppActive();
      } else if (e === "background") {
        this.onAppBackground();
      }
    });
  }

  @action
  async onBeforeStart() {
    for (const store of this.getSortedStores()) {
      try {
        await store.onBeforeStart();
      } catch (err) {
        console.log("Failed to invoke onBeforeStart", store, err);
      }
    }
    console.log("[RootStore]", "Finished onBeforeStart");
    console.log("Configuration", this.stores.configStore);

    this.initialized = true;
  }

  @action
  async onLogout() {
    for (const store of this.getSortedStores()) {
      try {
        await store.onLogout();
      } catch (err) {
        console.log("Failed to invoke onLogout", store, err);
      }
    }
    console.log("[RootStore]", "Finished onLogout");
  }

  async onAppActive() {
    for (const store of this.getSortedStores()) {
      try {
        await store.onAppActive();
      } catch (err) {
        console.log("Failed to invoke onAppActive", store, err);
      }
    }
    console.log("[RootStore]", "Finished onAppActive");
  }

  async onAppBackground() {
    for (const store of this.getSortedStores()) {
      try {
        await store.onAppBackground();
      } catch (err) {
        console.log("Failed to invoke onAppBackground", store, err);
      }
    }
    console.log("[RootStore]", "Finished onAppBackground");
  }

  private getSortedStores(): BaseStore[] {
    return Object.values(this.stores).sort((a, b) => a.priority - b.priority);
  }
}

export const rootStore = new RootStore();

const StoreContext = React.createContext({...rootStore.stores, rootStore});

/**
 * Access any store from any react component using
 * this `useStore` hook
 */
export const useStore = () => React.useContext(StoreContext);
