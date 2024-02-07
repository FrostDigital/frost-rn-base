import React, {useState} from "react";
import {SafeAreaView, Text, TextInput, View} from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import {t} from "../../i18n/i18n";
import {useAuth} from "../../networking/auth.hooks";
import {appTheme} from "../../theme/app-theme";

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {mutate: login, isPending} = useAuth(apiError => {
    console.log("Error", apiError);
  });

  return (
    <SafeAreaView style={{flex: 1, padding: 10, justifyContent: "center", alignItems: "center"}}>
      {/* NOTE: Make sure to use the gap property that is available in latest RN versions 💪 */}
      <View style={{gap: 20, width: "90%", alignItems: "center"}}>
        <Text style={{fontSize: 24, textAlign: "center"}}>{t("login.signIn")}</Text>
        <TextInput
          style={{backgroundColor: appTheme.colors["gray.300"], fontSize: 24, padding: 4, width: "100%"}}
          placeholder={t("login.username")}
          onChangeText={setUsername}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={{backgroundColor: appTheme.colors["gray.300"], fontSize: 24, padding: 4, width: "100%"}}
          placeholder={t("login.password")}
          secureTextEntry
          onChangeText={setPassword}
        />
        <Text style={{width: "100%"}}>{t("login.hint")}</Text>
        <AppButton
          disabled={isPending}
          title="login.signIn"
          onPress={() =>
            login({
              username,
              password,
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
