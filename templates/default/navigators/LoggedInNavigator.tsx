import {createStackNavigator, StackNavigationProp} from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen.tsx/HomeScreen";

type LoggedInParamList = {
  Home: undefined;
};

export type LoggedInStackNavigationProp = StackNavigationProp<LoggedInParamList>;

const LoggedInNavigator: React.FC = () => {
  const Stack = createStackNavigator<LoggedInParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default LoggedInNavigator;
