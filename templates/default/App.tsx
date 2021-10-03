import {NavigationContainer} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import RNBootSplash from "react-native-bootsplash";
import ErrorBoundary from "react-native-error-boundary";
import StorybookUIRoot from "./.storybook/Storybook";
import ErrorBoundaryFallback from "./components/ErrorBoundaryFallback/ErrorBoundaryFallback";
import {config} from "./config/config";
import AuthNavigator from "./navigators/AuthNavigator";
import {useStore} from "./stores/RootStore";

// Toggle this to switch to Storybook UI
const ENABLE_STORYBOOK = false;

const App = () => {
  const {rootStore, logStore} = useStore();
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

  function handleError(error: Error, stackTrace: string) {
    logStore.error(`ErrorBoundary ${error.message}`);
    logStore.error(stackTrace);
  }

  return (
    <ErrorBoundary
      onError={handleError}
      FallbackComponent={({error}) => (
        <ErrorBoundaryFallback error={error} clearAsyncStorageOnError={config().clearStoreOnUnhandledException} />
      )}>
      <NavigationContainer>{isInitialized && <AuthNavigator />}</NavigationContainer>
    </ErrorBoundary>
  );
};

export default App;
