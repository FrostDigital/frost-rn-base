import React from "react";
import {SafeAreaView, Text} from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import {t} from "../../i18n/i18n";
import {useAppStore} from "../../stores/AppStore";
import {styles} from "./LoginScreen.styles";

const LoginScreen: React.FC = () => {
  const fakeLogin = useAppStore(state => state.fakeLogin);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <Text style={styles.text}>{t("login.signIn")}</Text>
      <AppButton title="login.signIn" onPress={fakeLogin} />
    </SafeAreaView>
  );
};

export default LoginScreen;
