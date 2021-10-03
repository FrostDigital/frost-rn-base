import {env} from "../env.json";

export const envs = ["test", "prod"] as const;
export type ConfigEnv = typeof envs[number];

const configByEnv = {
  // Config applied to all envs
  global: {
    codePush: {
      // Set to true if app will use CodePush
      enabled: false,
    },

    devSettings: {
      // Optionally protect dev settings behind a pin code
      // will be default be disabled in __DEV__ mode
      pin: "",
      showLog: true,
    },

    /**
     * If async storage will be cleared when user restarts/reloads app withing ErrorBoundary.
     */
    clearStoreOnUnhandledException: false,
  },

  // Config only applied if test environment is active
  test: {
    codePush: {
      env: "",
      deploymentKeyProdChannelIOS: "REPLACE_ME",
      deploymentKeyStagingChannelIOS: "REPLACE_ME",
      deploymentKeyProdChannelAndroid: "REPLACE_ME",
      deploymentKeyStagingChannelAndroid: "REPLACE_ME",
    },
    api: {
      apiRoot: "https://api-test.replace.me",
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

export let selectedEnv: ConfigEnv = env as ConfigEnv;

/**
 * Set selected env if to override default from `../env.json`.
 *
 * Is mainly used when env is changed in DevSettings by developers or super users.
 *
 * @param selectedEnvOverride
 */
export function setSelectedEnv(selectedEnvOverride: ConfigEnv) {
  selectedEnv = selectedEnvOverride;
}

export function config(_selectedEnv?: ConfigEnv) {
  const envConfig = selectedEnv ? configByEnv[selectedEnv] : configByEnv[env as ConfigEnv];
  return {...configByEnv.global, ...envConfig};
}
