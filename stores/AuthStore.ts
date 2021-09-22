import AsyncStorage from "@react-native-community/async-storage";
import {action, observable} from "mobx";
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

  get isLoggedIn() {
    return !!this.accessToken;
  }
}

export default AuthStore;
