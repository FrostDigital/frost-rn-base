export default interface BaseConfig {
  /**
   * Name of config group, only used for logging or similar.
   * @example CodePush
   */
  name: string;

  /**
   * If config group is enabled
   */
  enabled: boolean;

  /**
   * Config that applies to all environments.
   * Any config with same key in env specific config below will
   * override values here.
   */
  all?: {[x: string]: string | number};

  /**
   * Config specific to test environment.
   */
  test?: {[x: string]: string | number};

  /**
   * Config specific to prod environment.
   */
  prod?: {[x: string]: string | number};

  // Add more envs here if needed to...
}
