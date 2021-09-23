import {createStackNavigator} from "@react-navigation/stack";
import {observer} from "mobx-react-lite";
import React from "react";
import {useStore} from "../stores/RootStore";
import LoggedInNavigator from "./LoggedInNavigator";
import LoggedOutNavigator from "./LoggedOutNavigator";

type AuthNavParamList = {
  LoggedIn: undefined;
  LoggedOut: undefined;
};

const AuthNavigator: React.FC = () => {
  const {authStore} = useStore();

  const Stack = createStackNavigator<AuthNavParamList>();

  return (
    <Stack.Navigator>
      {authStore.isLoggedIn ? (
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

export default observer(AuthNavigator);
