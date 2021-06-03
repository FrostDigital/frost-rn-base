import React from "react";
import ApiStore from "./ApiStore";
import AuthStore from "./AuthStore";
import FeatureFlagStore from "./FeatureFlagStore";

/**
 * "One store to rule them all"
 */
export class RootStore {
  apiStore = new ApiStore();
  authStore = new AuthStore(this);
  featureFlagStore = new FeatureFlagStore(this);
}

export const rootStore = new RootStore();

const StoreContext = React.createContext(rootStore);

/**
 * Access any store from any react component using
 * this `useStore` hook
 */
export const useStore = () => React.useContext(StoreContext);
