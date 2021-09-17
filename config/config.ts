import mergeDeep from "merge-deep";
import {ConfigType} from "./config-types";

/*
 * Add additional app environments here, such as `staging`.
 * While doing that also make sure to add an object with that
 * name in `configByEnv` below 👇
 */
export const appEnvs = ["test", "prod"];

export enum AppEnvs {
  "test" = "test",
  "prod" = "prod",
}

export const configByEnv = {
  // Shared config for all environments
  // Will be overridden if same key exists within env specific config
  hello: "world",

  codePush: {
    enabled: false,
  },

  devSettings: {
    // Optionally protect dev settings behind a pin code
    // will be default be disabled in __DEV__ mode
    pin: "",
    showLog: true,
  },

  // Config only applied if test environment is active
  test: {
    codePush: {
      deploymentKeyProdChannelIOS: "REPLACE_ME",
      deploymentKeyStagingChannelIOS: "REPLACE_ME",
      deploymentKeyProdChannelAndroid: "REPLACE_ME",
      deploymentKeyStagingChannelAndroid: "REPLACE_ME",
    },
    api: {
      apiRoot: "https://api.replace.me",
    },
  },

  // Config only applied if prod environment is active
  prod: {
    codePush: {
      deploymentKeyProdChannelIOS: "REPLACE_ME",
      deploymentKeyStagingChannelIOS: "REPLACE_ME",
      deploymentKeyProdChannelAndroid: "REPLACE_ME",
      deploymentKeyStagingChannelAndroid: "REPLACE_ME",
    },
    api: {
      apiRoot: "https://api.replace.me",
    },
  },
};

let cachedConfig: ConfigType;

export function getConfig() {
  if (!cachedConfig) {
    cachedConfig = mergeConfig(configByEnv);

    // TODO: Find a way of iterating AppEnv type (enum in future?) so there is no need to add envs here
    let configWoEnvSpecifics = {...configByEnv};

    cachedConfig = mergeDeep(configWoEnvSpecifics, configByEnv.test, configByEnv.prod);
  }

  return cachedConfig;
}
