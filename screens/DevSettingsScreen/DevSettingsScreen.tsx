import React, {useEffect, useState} from "react";
import {Pressable, SafeAreaView, ScrollView, Text, View} from "react-native";
import codePush from "react-native-code-push";
import {styles} from "./DevSettingsScreen.styles";
import {config} from "../../config/config";

const DevSettingsScreen: React.FC = () => {
  const [selectedEnv, setSelectedEnv] = useState(config());
  const [selectedCodePushEnv, setSelectedCodePushEnv] = useState(config().codePush);
  const [selectedOrg, setSelectedOrg] = useState(config().organisation.orgId);
  const [codePushMetadata, setCodePushMetadata] = useState(null);

  const envs = Object.keys(envConfig);
  const codePushEnvs: CodePushDeployEnv[] = ["production", "staging"];

  useEffect(() => {
    codePush.getUpdateMetadata().then(setCodePushMetadata);
  }, []);

  function handleSelectEnv(env: string) {
    setSelectedEnv(env);
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
        <Text style={styles.infoText}>Select environment:</Text>
        {envs.map(env => {
          const selected = selectedEnv === env;
          return (
            <Pressable key={env} onPress={() => handleSelectEnv(env)}>
              <Text style={[styles.itemText, selected && styles.selected]}>{`${toTitleCase(env)} ${
                selected ? "(selected)" : ""
              }`}</Text>
            </Pressable>
          );
        })}
        <Text style={styles.infoText}>Select CodePush env:</Text>
        {codePushEnvs.map(codePushEnv => {
          const selected = selectedCodePushEnv === codePushEnv;
          return (
            <Pressable key={codePushEnv} onPress={() => handleSelectCodePushEnv(codePushEnv)}>
              <Text style={[styles.itemText, selected && styles.selected]}>{`${toTitleCase(codePushEnv)} ${
                selected ? "(selected)" : ""
              }`}</Text>
            </Pressable>
          );
        })}

        <Text style={styles.infoText}>Active config:</Text>
        <Text style={styles.configText}>{JSON.stringify(config(), null, 2)}</Text>
        <Text style={styles.infoText}>Codepush metadata:</Text>
        <Text style={styles.configText}>{codePushMetadata ? JSON.stringify(codePushMetadata, null, 2) : "n/a"}</Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <AppButton type="primary" title="Apply changes" onPress={handleApply} />
      </View>
    </SafeAreaView>
  );
};

export default DevSettingsScreen;
