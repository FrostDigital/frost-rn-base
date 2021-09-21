import {NavigationContainer} from "@react-navigation/native";
import React, {useEffect} from "react";
import AuthNavigator from "./navigators/AuthNavigator";
import {useStore} from "./stores/RootStore";

const App = () => {
  const {rootStore} = useStore();

  useEffect(() => {
    rootStore.onBeforeStart();
  }, [rootStore]);

  return (
    <NavigationContainer>
      <AuthNavigator />
      {/* <Text>Hello world</Text> */}
    </NavigationContainer>
  );
};

export default App;
