import React, {useEffect, useState} from "react";
import {Pressable, SafeAreaView, ScrollView, Text, View} from "react-native";
import codePush from "react-native-code-push";
// import {SafeAreaView} from "react-native-safe-area-context";
// import appConfig, {envConfig, orgConfig, setConfigOverride} from "../../config/config";
import {styles} from "./DevSettingsScreen.styles";

const DevSettingsScreen: React.FC = () => {
  const [selectedEnv, setSelectedEnv] = useState(appConfig().env);
  const [selectedCodePushEnv, setSelectedCodePushEnv] = useState(appConfig().codePushEnv);
  const [selectedOrg, setSelectedOrg] = useState(appConfig().organisation.orgId);
  const [codePushMetadata, setCodePushMetadata] = useState(null);

  const organisations = Object.keys(orgConfig).map(id => ({...orgConfig[id], id}));
  const envs = Object.keys(envConfig);
  const codePushEnvs: CodePushDeployEnv[] = ["production", "staging"];

  useEffect(() => {
    codePush.getUpdateMetadata().then(setCodePushMetadata);
  }, []);

  function handleSelectEnv(env: string) {
    setSelectedEnv(env);
  }

  function handleSelectOrganisation(orgId: string) {
    setSelectedOrg(orgId);
  }

  async function handleApply() {
    await setConfigOverride({
      orgId: selectedOrg,
      env: selectedEnv,
      codePushEnv: selectedCodePushEnv,
    });
    RNRestart.Restart();
  }

  function handleSelectCodePushEnv(env: CodePushDeployEnv) {
    setSelectedCodePushEnv(env);
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <AppText size="ml" style={styles.infoText} weight="medium">
          Select organisation:
        </AppText>
        {organisations.map(org => {
          const selected = selectedOrg === org.id;
          return (
            <Pressable key={org.id} onPress={() => handleSelectOrganisation(org.id)}>
              <AppText style={[styles.itemText, selected && styles.selected]}>{`${org.name} ${
                selected ? "(selected)" : ""
              }`}</AppText>
            </Pressable>
          );
        })}
        <AppText size="ml" style={styles.infoText} weight="medium">
          Select environment:
        </AppText>
        {envs.map(env => {
          const selected = selectedEnv === env;
          return (
            <Pressable key={env} onPress={() => handleSelectEnv(env)}>
              <AppText style={[styles.itemText, selected && styles.selected]}>{`${toTitleCase(env)} ${
                selected ? "(selected)" : ""
              }`}</AppText>
            </Pressable>
          );
        })}
        <AppText size="ml" style={styles.infoText} weight="medium">
          Select CodePush env:
        </AppText>
        {codePushEnvs.map(codePushEnv => {
          const selected = selectedCodePushEnv === codePushEnv;
          return (
            <Pressable key={codePushEnv} onPress={() => handleSelectCodePushEnv(codePushEnv)}>
              <AppText style={[styles.itemText, selected && styles.selected]}>{`${toTitleCase(codePushEnv)} ${
                selected ? "(selected)" : ""
              }`}</AppText>
            </Pressable>
          );
        })}

        <AppText size="ml" style={styles.infoText} weight="medium">
          Active config:
        </AppText>
        <Text style={styles.configText}>{JSON.stringify(appConfig(), null, 2)}</Text>
        <AppText size="ml" style={styles.infoText} weight="medium">
          Codepush metadata:
        </AppText>
        <Text style={styles.configText}>{codePushMetadata ? JSON.stringify(codePushMetadata, null, 2) : "n/a"}</Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <AppButton type="primary" title="Apply changes" onPress={handleApply} />
      </View>
    </SafeAreaView>
  );
};

export default DevSettingsScreen;
