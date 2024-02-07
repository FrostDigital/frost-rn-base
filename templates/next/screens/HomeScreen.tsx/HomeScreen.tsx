import React, {useEffect} from "react";
import {SafeAreaView, Text} from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import {t} from "../../i18n/i18n";
import {useAppStore} from "../../stores/AppStore";
import {requestUserPermission} from "../../utils/messaging-utils";

const HomeScreen: React.FC = () => {
  const logout = useAppStore(state => state.logout);

  function handleSignOut() {
    logout();
  }

  useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, padding: 10, justifyContent: "center", alignItems: "center"}}>
      <Text style={{fontSize: 24, textAlign: "center", margin: 15}}>{t("home.title")}</Text>
      <AppButton title="home.signOut" style={{width: "90%", marginVertical: 10}} onPress={handleSignOut} />
    </SafeAreaView>
  );
};

export default HomeScreen;
