import {t} from "i18n-js";
import React, {useEffect} from "react";
import {SafeAreaView, Text} from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import {useStore} from "../../stores/RootStore";
import {requestUserPermission} from "../../utils/messaging-utils";
import {styles} from "./HomeScreen.styles";

const HomeScreen: React.FC = () => {
  const {rootStore} = useStore();

  function handleSignOut() {
    rootStore.logout();
  }

  useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <Text style={styles.title}>{t("home.title")}</Text>
      <AppButton title="home.signOut" style={styles.button} onPress={handleSignOut} />
    </SafeAreaView>
  );
};

export default HomeScreen;
