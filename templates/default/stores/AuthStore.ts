import AsyncStorage from "@react-native-async-storage/async-storage";
import {action, computed, observable} from "mobx";
import BaseStore from "./BaseStore";

const ACCESS_TOKEN_KEY = "@accessToken";
const REFRESH_TOKEN_KEY = "@refreshToken";

class AuthStore extends BaseStore {
  @observable
  accessToken?: string;

  @observable
  refreshToken?: string;

  @action
  async onBeforeStart() {
    this.accessToken = (await AsyncStorage.getItem(ACCESS_TOKEN_KEY)) || undefined;
    this.refreshToken = (await AsyncStorage.getItem(REFRESH_TOKEN_KEY)) || undefined;
  }

  @action
  async onLogout() {
    this.accessToken = undefined;
    this.refreshToken = undefined;
    await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
  }

  @computed
  get isLoggedIn() {
    return !!this.accessToken;
  }

  @action
  fakeLogin() {
    // TODO: Remove me, just for demo purposes
    this.accessToken = "fake";
    this.refreshToken = "fake";
    this.persistTokens();
  }

  async persistTokens() {
    if (this.accessToken && this.refreshToken) {
      return AsyncStorage.multiSet([
        [ACCESS_TOKEN_KEY, this.accessToken],
        [REFRESH_TOKEN_KEY, this.refreshToken],
      ]);
    }
  }
}

export default AuthStore;
