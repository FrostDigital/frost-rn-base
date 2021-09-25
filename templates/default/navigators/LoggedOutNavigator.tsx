import {createStackNavigator, StackNavigationProp} from "@react-navigation/stack";
import React from "react";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen/WelcomeScreen";

type LoggedOutParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
};

export type LoggedOutStackNavigationProp = StackNavigationProp<LoggedOutParamList>;

const LoggedOutNavigator: React.FC = () => {
  const Stack = createStackNavigator<LoggedOutParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export default LoggedOutNavigator;
