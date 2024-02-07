import {useNavigation} from "@react-navigation/core";
import React from "react";
import {Alert, SafeAreaView, Text} from "react-native";
import Animated, {FadeIn, FadeInDown} from "react-native-reanimated";
import AppButton from "../../components/AppButton/AppButton";
import {t} from "../../i18n/i18n";
import {LoggedOutStackNavigationProp} from "../../navigators/LoggedOutNavigator";
import {vw} from "../../utils/style-utils";

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<LoggedOutStackNavigationProp>();

  return (
    <SafeAreaView style={{flex: 1, padding: 10, justifyContent: "center", alignItems: "center"}}>
      <Animated.View entering={FadeIn} style={{gap: 20, marginBottom: 30}}>
        <Text style={{fontSize: 24, textAlign: "center"}}>{t("welcome.title")}</Text>
        <Text style={{fontSize: 18, textAlign: "center"}}>{t("welcome.subtitle")}</Text>
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(250)} style={{alignItems: "center", width: vw(90), gap: 20}}>
        <AppButton title="welcome.login" onPress={() => navigation.navigate("Login")} />
        <AppButton title="welcome.signUp" onPress={() => Alert.alert("This is a dead end 😘")} />
      </Animated.View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
