import {env} from "../env.json";

export type Envs = "test" | "prod";

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

export function config(selectedEnv?: Envs) {
  const envConfig = selectedEnv ? configByEnv[selectedEnv] : configByEnv[env as Envs];
  return {...configByEnv.global, ...envConfig};
}
