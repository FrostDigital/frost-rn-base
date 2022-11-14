import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useEffect, useState} from "react";
import {AppRegistry} from "react-native";
import "react-native-reanimated";
import "react-native-gesture-handler";
import App from "./App";
import {setSelectedEnv} from "./config/config";

AppRegistry.registerComponent("FrostRnBase", () => InitializingApp);

export const ENV_OVERRIDE_KEY = "@env-override";

/**
 * Wrapper that as early as possible builds config.
 */
const InitializingApp = () => {
  const [configured, setConfigured] = useState(false);

  useEffect(() => {
    async function setEnv() {
      const override = await AsyncStorage.getItem(ENV_OVERRIDE_KEY);

      if (override) {
        setSelectedEnv(override);
      }

      setConfigured(true);
    }

    setEnv();
  }, []);

  return configured ? <App /> : null;
};
