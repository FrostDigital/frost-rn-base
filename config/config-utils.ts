import AsyncStorage from "@react-native-community/async-storage";
import mergeDeep from "merge-deep";
import {AppEnv} from "./config-types";

const ENV_OVERRIDE_STORAGE_KEY = "ENV_OVERRIDE_STORAGE_KEY";

let activeEnv: AppEnv;

export function getEnv(): AppEnv {
  if (activeEnv) {
    return activeEnv;
  } else {
    // Default to prod unless in DEV mode when we want test env
    return __DEV__ ? "test" : "prod";
  }
}

/**
 * Sets and persists app env.
 */
export async function setEnv(env: AppEnv) {
  await AsyncStorage.setItem(ENV_OVERRIDE_STORAGE_KEY, env);
  activeEnv = env;
}

/**
 * Initializes config.
 * Should be first thing when app launches.
 */
export async function loadPersistedEnv() {
  const appEnvFromStorage = await AsyncStorage.getItem(ENV_OVERRIDE_STORAGE_KEY);

  if (appEnvFromStorage) {
    activeEnv = appEnvFromStorage as AppEnv;
  }
}



export function mergeConfig(config: ) {
  
    // TODO: Find a way of iterating AppEnv type (enum in future?) so there is no need to add envs here
    let configWoEnvSpecifics = {...configByEnv};

    cachedConfig = mergeDeep(configWoEnvSpecifics, configByEnv.test, configByEnv.prod);
  }

  return cachedConfig;
}
