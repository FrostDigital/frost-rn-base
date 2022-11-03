import NetInfo from "@react-native-community/netinfo";
import {NavigationContainer} from "@react-navigation/native";
import {onlineManager, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React, {useEffect, useState} from "react";
import {AppState} from "react-native";
import RNBootSplash from "react-native-bootsplash";
import ErrorBoundary from "react-native-error-boundary";
import ErrorBoundaryFallback from "./components/ErrorBoundaryFallback/ErrorBoundaryFallback";
import {config} from "./config/config";
import AuthNavigator from "./navigators/AuthNavigator";
import SagoBok from "./sagobok/SagoBok";
import {useAppStore} from "./stores/AppStore";

const ENABLE_SAGOBOK = false;

// Enable automatic online status management in react-query
// https://tanstack.com/query/v4/docs/react-native#online-status-management
onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected);
  });
});

const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: 2}},
});

const App = () => {
  const {onAppActive, onAppBackground, onBeforeStart} = useAppStore(state => ({
    onBeforeStart: state.onBeforeStart,
    onAppActive: state.onAppActive,
    onAppBackground: state.onAppBackground,
  }));

  const [isInitialized, setInitialized] = useState(false);

  useEffect(() => {
    async function init() {
      await onBeforeStart();
      setInitialized(true);
      RNBootSplash.hide({fade: true});
    }

    init();
  }, [onBeforeStart]);

  useEffect(() => {
    const sub = AppState.addEventListener("change", e => {
      if (e === "active") {
        onAppActive();
      } else if (e === "background") {
        onAppBackground();
      }
    });

    return () => {
      sub.remove();
    };
  }, [onAppActive, onAppBackground]);

  if (ENABLE_SAGOBOK && __DEV__) {
    return (
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <SagoBok />
        </NavigationContainer>
      </QueryClientProvider>
    );
  }

  function handleError(error: Error, stackTrace: string) {
    console.error("ErrorBoundary", error.message);
    console.error(stackTrace);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary
        onError={handleError}
        FallbackComponent={({error}) => (
          <ErrorBoundaryFallback error={error} clearAsyncStorageOnError={config().clearStoreOnUnhandledException} />
        )}>
        <NavigationContainer>{isInitialized && <AuthNavigator />}</NavigationContainer>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;
