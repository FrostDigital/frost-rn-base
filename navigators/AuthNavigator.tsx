import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {Text} from "react-native";
import {useStore} from "../stores/RootStore";

const AuthNavigator: React.FC = () => {
  const {authStore} = useStore();

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      {authStore.isLoggedIn ? (
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
