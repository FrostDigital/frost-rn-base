import {NavigationContainer} from "@react-navigation/native";
import React, {useEffect} from "react";
import AuthNavigator from "./navigators/AuthNavigator";
import {useStore} from "./stores/RootStore";
import StorybookUIRoot from "./.storybook/Storybook";

// Toggle this to switch to Storybook UI
const ENABLE_STORYBOOK = false;

const App = () => {
  const {rootStore} = useStore();

  useEffect(() => {
    rootStore.onBeforeStart();
  }, [rootStore]);

  if (__DEV__ && ENABLE_STORYBOOK) {
    return <StorybookUIRoot />;
  }

  return (
    <NavigationContainer>
      <AuthNavigator />
      {/* <Text>Hello world</Text> */}
    </NavigationContainer>
  );
};

export default App;
