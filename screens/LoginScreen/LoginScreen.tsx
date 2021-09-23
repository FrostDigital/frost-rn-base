import {t} from "i18n-js";
import React from "react";
import {SafeAreaView, Text} from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import {useStore} from "../../stores/RootStore";
import {styles} from "./LoginScreen.styles";

const LoginScreen: React.FC = () => {
  const {authStore} = useStore();

  return (
    <SafeAreaView style={styles.rootContainer}>
      <Text style={styles.text}>{t("login.signIn")}</Text>
      <AppButton title="login.signIn" onPress={() => authStore.fakeLogin()} />
    </SafeAreaView>
  );
};

export default LoginScreen;
