import {appEnvs, configByEnv} from "./config";

// const appEnvsConst = [...appEnvs] as const;

// Derive a type based on above appEnvs, will produce something like `type AppEnv = "test"|"prod"`
// export type AppEnv = typeof appEnvsConst[number];

// Hairy typescript ninja to get typed config 🙈
export type ConfigType = Omit<typeof configByEnv, AppEnv> & typeof configByEnv[AppEnv];

export type ConfigByEnvType = typeof configByEnv;

function getStringValuesFromEnum<T>(myEnum: T): (keyof T)[] {
  return Object.keys(myEnum) as any;
}
