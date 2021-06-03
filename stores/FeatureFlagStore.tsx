import {action, observable} from "mobx";
import AsyncStorage from "@react-native-community/async-storage";
import {FeatureFlag} from "../models/FeatureFlag";

const FEATURE_FLAGS_STORAGE_KEY = "FEATURE_FLAGS";

/**
 * State store that holds and toggles feature flags.
 */
class FeatureFlagStore {
  @observable
  private featureFlags = new Map<string, FeatureFlag>();

  /**
   * Sync persisted feature flags with in-memory store.
   * Should be invoked when app is launched.
   */
  @action
  async init() {
    try {
      const featureFlagsStr = await AsyncStorage.getItem(FEATURE_FLAGS_STORAGE_KEY);
      const featureFlags: FeatureFlag[] = JSON.parse(featureFlagsStr || "[]");

      for (const ff of featureFlags) {
        this.featureFlags.set(ff.name, ff);
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * Toggles a feature flag by its name.
   * Will persist changes.
   */
  @action
  enable(name: string, enabled: boolean) {
    this.featureFlags.set(name, {name, enabled});
    return this.persist();
  }

  /**
   * Registers feature flags. Will keep existing value if
   * already existing so can safely be invoked multiple times.
   *
   * Will persist changes.
   */
  @action
  register(featureFlags: FeatureFlag[]) {
    for (const ff of featureFlags) {
      if (!this.featureFlags.has(ff.name)) {
        this.featureFlags.set(ff.name, ff);
      }
    }

    this.persist();
  }

  /**
   * Get array of all feature flags.
   */
  all() {
    return Array.from(this.featureFlags.values());
  }

  /**
   * Saves feature flag config to local storage
   */
  private persist() {
    let ffJson: FeatureFlag[] = [];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (let [_key, value] of this.featureFlags) {
      ffJson.push(value);
    }

    return AsyncStorage.setItem(FEATURE_FLAGS_STORAGE_KEY, JSON.stringify(ffJson));
  }
}

export default FeatureFlagStore;
