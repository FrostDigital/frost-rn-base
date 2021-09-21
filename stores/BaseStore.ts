import {RootStore} from "./RootStore";

abstract class BaseStore {
  constructor(protected rootStore: RootStore) {}

  /**
   * Priority to used when deciding in which order stores are initialized.
   *
   * This should normally be left as-is but in case store is important to run early on
   * if it for example is used to configure the app which preceding stores needs, set this
   * to a low value.
   */
  priority = 5;

  /**
   * Invoked early in start phase.
   */
  async onBeforeStart() {}

  async onBeforeLogout() {}

  async onAfterLogout() {}

  /**
   * Invoked when app became active, when AppState transitioned to "active".
   */
  async onAppActive() {}

  /**
   * Invoked when app became active, when AppState transitioned to "background".
   */
  async onAppBackground() {}
}

export default BaseStore;
