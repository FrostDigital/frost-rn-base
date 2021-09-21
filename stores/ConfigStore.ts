import {observable} from "mobx";
import {Envs} from "../config/config";
import {env} from "../env.json";
import BaseStore from "./BaseStore";

class ConfigStore extends BaseStore {
  priority = 1;

  @observable
  private selectedEnv: Envs = env as Envs;

  init() {}
}

export default ConfigStore;
