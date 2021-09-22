import NetInfo from "@react-native-community/netinfo";
import {observable} from "mobx";
import {config} from "../config/config";
import {ApiError} from "../models/ApiError";
import {ApiResponse} from "../models/ApiResponse";
import {t} from "../i18n/i18n";
import BaseStore from "./BaseStore";
import FetchClient from "../networking/FetchClient";

/**
 * State store responsible for interacting with API.
 *
 * Does not really have any state except for keeping track
 * of tokens and network status.
 */

export const NO_NETWORK_ERROR = {
  status: 500,
  error: {
    code: "NO_NETWORK_ERROR",
    detail: t("ERROR_MESSAGE_NO_NETWORK"),
  },
};

interface RequestOptions {
  path: string;
  query?: {[x: string]: string};
  isAuthRequired?: boolean;
}

interface RequestOptionsWithBody extends RequestOptions {
  body?: any;
}

class ApiStore extends BaseStore {
  fetchClient!: FetchClient;

  @observable
  private isConnected: boolean = true;

  async onBeforeStart() {
    this.initNetInfo();
    this.fetchClient = new FetchClient(config().api.apiRoot);
  }

  async get<T>(opts: RequestOptions) {
    return this.intercept(() =>
      this.fetchClient.doRequest<T>({
        method: "get",
        path: opts.path,
        query: opts.query,
        token: this.getAccessToken(opts.isAuthRequired),
      }),
    );
  }

  post<T>(opts: RequestOptionsWithBody) {
    return this.intercept<T>(() =>
      this.fetchClient.doRequest<T>({
        method: "post",
        path: opts.path,
        body: opts.body,
        query: opts.query,
        token: this.getAccessToken(opts.isAuthRequired),
      }),
    );
  }

  async put<T>(opts: RequestOptionsWithBody) {
    return this.intercept(() =>
      this.fetchClient.doRequest<T>({
        method: "put",
        path: opts.path,
        body: opts.body,
        query: opts.query,
        token: this.getAccessToken(opts.isAuthRequired),
      }),
    );
  }

  async delete<T>(opts: RequestOptionsWithBody) {
    return this.intercept(() =>
      this.fetchClient.doRequest<T>({
        method: "delete",
        path: opts.path,
        body: opts.body,
        query: opts.query,
        token: this.getAccessToken(opts.isAuthRequired),
      }),
    );
  }

  private async initNetInfo() {
    NetInfo.addEventListener(state => {
      this.isConnected = state?.isConnected || false;
    });

    const netInfo = await NetInfo.fetch();
    this.isConnected = netInfo?.isConnected || false;
  }

  private async intercept<T>(request: () => Promise<ApiResponse<T>>) {
    if (!this.isConnected) {
      throw NO_NETWORK_ERROR;
    }
    try {
      return await request();
    } catch (error) {
      throw error as ApiError;
    }
  }

  private getAccessToken(isAuthRequired?: boolean) {
    if (isAuthRequired) {
      return this.rootStore.stores.authStore.accessToken;
    }
  }
}

export default ApiStore;
