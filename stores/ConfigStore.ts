import AsyncStorage from "@react-native-async-storage/async-storage";
import {action, observable} from "mobx";
import {ConfigEnv, setSelectedEnv} from "../config/config";
import {env} from "../env.json";
import BaseStore from "./BaseStore";

const ENV_OVERRIDE_KEY = "@env-override";
class ConfigStore extends BaseStore {
  priority = 1;

  @observable
  selectedEnv: ConfigEnv = env as ConfigEnv;

  @action
  async onBeforeStart() {
    const envOverride = await AsyncStorage.getItem(ENV_OVERRIDE_KEY);

    if (envOverride) {
      console.log("Setting env to", env);
      this.selectedEnv = env as ConfigEnv;
      setSelectedEnv(envOverride as ConfigEnv);
    }
  }

  @action
  setEnv(selectedEnv: ConfigEnv) {
    this.selectedEnv = selectedEnv;
    AsyncStorage.setItem(ENV_OVERRIDE_KEY, env);
  }
}

export default ConfigStore;
