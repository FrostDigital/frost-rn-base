import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {Text} from "react-native";

const AuthNavigator: React.FC = () => {
  // const isSignedIn = false;

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={() => <Text>Home</Text>} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
