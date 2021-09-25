import {useNavigation} from "@react-navigation/core";
import {t} from "i18n-js";
import React from "react";
import {SafeAreaView, Text} from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import {LoggedOutStackNavigationProp} from "../../navigators/LoggedOutNavigator";
import {styles} from "./WelcomeScreen.styles";

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<LoggedOutStackNavigationProp>();

  return (
    <SafeAreaView style={styles.rootContainer}>
      <Text style={styles.title}>{t("welcome.title")}</Text>
      <Text style={styles.subtitle}>{t("welcome.subtitle")}</Text>
      <AppButton title="welcome.login" style={styles.button} onPress={() => navigation.navigate("Login")} />
      <AppButton title="welcome.signUp" style={styles.button} />
    </SafeAreaView>
  );
};

export default WelcomeScreen;
