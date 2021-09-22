import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {Text} from "react-native";

const AuthNavigator: React.FC = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={() => <Text>Logged out</Text>} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
