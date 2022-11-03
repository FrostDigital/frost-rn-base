import {ApiResponse} from "../models/ApiResponse";
import FetchClient from "../networking/FetchClient";

import create from "zustand";
import {useAppStore} from "./AppStore";

/**
 * State store responsible for interacting with API.
 *
 * Does not really have any state except for keeping track
 * of tokens and network status.
 */

interface RequestOptions {
  path: string;
  query?: {[x: string]: string};
  isAuthRequired?: boolean;
}

interface RequestOptionsWithBody extends RequestOptions {
  body?: any;
}

interface ApiStore {
  // accessToken: string;
  // refreshToken: string;
  fetchClient: FetchClient;
  init: (apiRoot: string) => void;
  get: <T>(opts: RequestOptions) => Promise<ApiResponse<T>>;
  post: <T>(opts: RequestOptionsWithBody) => Promise<ApiResponse<T>>;
  put: <T>(opts: RequestOptionsWithBody) => Promise<ApiResponse<T>>;
  delete: <T>(opts: RequestOptionsWithBody) => Promise<ApiResponse<T>>;
}

// TODO: Intercept expired token or proactively refresh
// TODO: Monitor network state

export const useApiStore = create<ApiStore>((set, get) => ({
  // accessToken: "",
  // refreshToken: "",
  fetchClient: new FetchClient(""),
  init: () => {
    set({fetchClient: new FetchClient("/api")});
  },
  get: <T>({path, query, isAuthRequired}: RequestOptions) => {
    return get().fetchClient.doRequest<T>({
      method: "get",
      path,
      query,
      token: getToken(isAuthRequired),
    });
  },
  post: <T>({path, query, isAuthRequired, body}: RequestOptionsWithBody) => {
    return get().fetchClient.doRequest<T>({
      method: "post",
      path,
      query,
      body,
      token: getToken(isAuthRequired),
    });
  },

  put: <T>({path, query, isAuthRequired, body}: RequestOptionsWithBody) => {
    return get().fetchClient.doRequest<T>({
      method: "put",
      path,
      query,
      body,
      token: getToken(isAuthRequired),
    });
  },

  delete: <T>({path, query, isAuthRequired, body}: RequestOptionsWithBody) => {
    return get().fetchClient.doRequest<T>({
      method: "delete",
      path,
      query,
      body,
      token: getToken(isAuthRequired),
    });
  },
}));

function getToken(isAuthRequired?: boolean) {
  if (isAuthRequired) {
    return useAppStore.getState().accessToken;
  }
}
