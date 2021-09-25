export interface FeatureFlag {
  /**
   * Name of feature flag, something a developer or other "under the hood" type of person would understand
   */
  name: string;

  /**
   * If feature is enabled
   */
  enabled: boolean;

  /**
   * Optional description of feature flag.
   */
  description?: string;
}
