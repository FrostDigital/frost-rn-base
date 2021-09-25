import {NavigationContainer} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import AuthNavigator from "./navigators/AuthNavigator";
import {useStore} from "./stores/RootStore";
import StorybookUIRoot from "./.storybook/Storybook";
import RNBootSplash from "react-native-bootsplash";

// Toggle this to switch to Storybook UI
const ENABLE_STORYBOOK = false;

const App = () => {
  const {rootStore} = useStore();
  const [isInitialized, setInitialized] = useState(false);

  useEffect(() => {
    async function init() {
      await rootStore.onBeforeStart();
      setInitialized(true);
      RNBootSplash.hide({fade: true});
    }

    init();
  }, [rootStore]);

  if (__DEV__ && ENABLE_STORYBOOK) {
    return <StorybookUIRoot />;
  }

  return <NavigationContainer>{isInitialized && <AuthNavigator />}</NavigationContainer>;
};

export default App;
