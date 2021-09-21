import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {Text} from "react-native";

const AuthNavigator: React.FC = () => {
  const isSignedIn = true;

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      {isSignedIn ? (
        <>
          <Stack.Screen
            name="LoggedIn"
            component={() => <Text>LoggedIn</Text>}
            options={{animationEnabled: false, headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="LoggedOut" component={() => <Text>LoggedOut</Text>} options={{animationEnabled: false}} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
