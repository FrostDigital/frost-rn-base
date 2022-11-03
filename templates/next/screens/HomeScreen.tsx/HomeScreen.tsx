import React, {useEffect} from "react";
import {SafeAreaView, Text} from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import {t} from "../../i18n/i18n";
import {useAppStore} from "../../stores/AppStore";
import {requestUserPermission} from "../../utils/messaging-utils";
import {styles} from "./HomeScreen.styles";

const HomeScreen: React.FC = () => {
  const logout = useAppStore(state => state.logout);

  function handleSignOut() {
    logout();
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
