import {observable} from "mobx";
import {Envs} from "../config/config";
import {env} from "../env.json";

class ConfigStore {
  @observable
  private selectedEnv: Envs = env as Envs;

  init() {}
}

export default ConfigStore;
