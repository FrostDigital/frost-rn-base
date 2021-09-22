import AsyncStorage from "@react-native-async-storage/async-storage";
import {action, observable} from "mobx";
import {Envs} from "../config/config";
import {env} from "../env.json";
import BaseStore from "./BaseStore";
import {setSelectedEnv} from "../config/config";

const ENV_OVERRIDE_KEY = "@env-override";
class ConfigStore extends BaseStore {
  priority = 1;

  @observable
  selectedEnv: Envs = env as Envs;

  @action
  async onBeforeStart() {
    const envOverride = await AsyncStorage.getItem(ENV_OVERRIDE_KEY);

    if (envOverride) {
      console.log("Setting env to", env);
      this.selectedEnv = env as Envs;
      setSelectedEnv(envOverride as Envs);
    }
  }

  @action
  setEnv(selectedEnv: Envs) {
    this.selectedEnv = selectedEnv;
    AsyncStorage.setItem(ENV_OVERRIDE_KEY, env);
  }
}

export default ConfigStore;
