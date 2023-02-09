import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {useAppStore} from "../stores/AppStore";
import LoggedInNavigator from "./LoggedInNavigator";
import LoggedOutNavigator from "./LoggedOutNavigator";

type AuthNavParamList = {
  LoggedIn: undefined;
  LoggedOut: undefined;
};

const AuthNavigator: React.FC = () => {
  const isLoggedIn = useAppStore(state => state.isLoggedIn());

  const Stack = createStackNavigator<AuthNavParamList>();

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="LoggedIn"
            component={LoggedInNavigator}
            options={{animationEnabled: false, headerShown: false}}
          />
        </>
      ) : (
        <Stack.Screen
          name="LoggedOut"
          component={LoggedOutNavigator}
          options={{animationEnabled: false, headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
