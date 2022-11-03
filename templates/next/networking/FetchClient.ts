import {ApiError} from "../models/ApiError";
import {ApiResponse} from "../models/ApiResponse";
import {gitHash} from "../env.json";
import {getBuildNumber, getVersion, getBaseOs} from "react-native-device-info";

type ContentType = "application/json" | "multipart/form-data";

export default class FetchClient {
  private apiRoot: string;
  private appBuildNum?: string;
  private appVersion?: string;
  private appOs?: string;

  constructor(apiRoot: string) {
    this.apiRoot = apiRoot;
    this.setDeviceInfo();
  }

  /**
   * Set info about host device which is sent as additional
   * header in all requests for debug purposes.
   */
  private async setDeviceInfo() {
    try {
      this.appBuildNum = await getBuildNumber();
      this.appVersion = await getVersion();
      this.appOs = await getBaseOs();
    } catch (err) {
      console.log("Failed getting device info", err);
    }
  }

  async doRequest<T>({
    method,
    path,
    query = undefined,
    body = undefined,
    token = undefined,
    contentType = "application/json",
  }: {
    method: "get" | "post" | "put" | "delete";
    path: string;
    query?: any;
    body?: any;
    token?: string;
    contentType?: ContentType;
  }): Promise<ApiResponse<T>> {
    let headers;
    headers = new Headers({
      "Content-Type": contentType,
      "X-App-Version": `${this.appOs} ${this.appVersion} (${this.appBuildNum}, ${gitHash})`,
    });

    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    const fetchOptions = {
      mode: "cors",
      credentials: "include",
      headers,
      method,
      body: body ? (contentType === "multipart/form-data" ? body : JSON.stringify(body)) : undefined,
    };

    const qs = query ? "?" + this.objectToQueryString(query) : "";

    if (__DEV__) {
      console.log((fetchOptions.method || "GET").toUpperCase(), this.apiRoot + path + qs);
    }

    // @ts-ignore
    const resp = await fetch(this.apiRoot + path + qs, fetchOptions);

    let jsonResp;

    try {
      jsonResp = await resp.json();
    } catch (err) {
      console.log("Failed parsing json response", err);

      throw {
        status: 500,
        error: {
          code: "CLIENT_ERROR",
          detail: "Something went wrong when parsing json response on client: " + err,
        },
      };
    }

    if (__DEV__) {
      console.log(resp.status, jsonResp);
    }

    if (resp.status < 400) {
      return jsonResp;
    } else {
      throw jsonResp as ApiError;
    }
  }

  /**
   * Object to create query string from a JSON object.
   *
   * @param {Object} object
   */
  private objectToQueryString(object: any) {
    const arr = Object.keys(object).map(key => {
      return encodeURI(key + "=" + object[key]);
    });

    return arr.join("&");
  }
}
