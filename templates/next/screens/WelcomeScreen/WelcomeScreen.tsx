import {useNavigation} from "@react-navigation/core";
import React from "react";
import {Alert, SafeAreaView, Text} from "react-native";
import Animated, {FadeIn, FadeInDown} from "react-native-reanimated";
import AppButton from "../../components/AppButton/AppButton";
import {t} from "../../i18n/i18n";
import {LoggedOutStackNavigationProp} from "../../navigators/LoggedOutNavigator";
import {styles} from "./WelcomeScreen.styles";

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<LoggedOutStackNavigationProp>();

  return (
    <SafeAreaView style={styles.rootContainer}>
      <Animated.View entering={FadeIn}>
        <Text style={styles.title}>{t("welcome.title")}</Text>
        <Text style={styles.subtitle}>{t("welcome.subtitle")}</Text>
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(250)} style={styles.buttonContainer}>
        <AppButton title="welcome.login" style={styles.button} onPress={() => navigation.navigate("Login")} />
        <AppButton title="welcome.signUp" style={styles.button} onPress={() => Alert.alert("This is a dead end 😘")} />
      </Animated.View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
