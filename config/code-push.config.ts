import BaseConfig from "../models/BaseConfig";

const codePushConfig: BaseConfig = {
  name: "CodePush",
  enabled: false,
  prod: {
    deploymentKeyProdChannelIOS: "REPLACE_ME",
    deploymentKeyStagingChannelIOS: "REPLACE_ME",
    deploymentKeyProdChannelAndroid: "REPLACE_ME",
    deploymentKeyStagingChannelAndroid: "REPLACE_ME",
  },
  test: {
    deploymentKeyProdChannelIOS: "REPLACE_ME",
    deploymentKeyStagingChannelIOS: "REPLACE_ME",
    deploymentKeyProdChannelAndroid: "REPLACE_ME",
    deploymentKeyStagingChannelAndroid: "REPLACE_ME",
  },
};

export default codePushConfig;
