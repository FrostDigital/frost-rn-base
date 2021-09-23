import React from "react";

const DevSettingsScreen: React.FC = () => {
  // const [selectedEnv, setSelectedEnv] = useState(theSelectedEnv);

  // function handleSelectEnv(env: string) {
  //   setSelectedEnv(env);
  // }

  // async function handleApply() {
  //   await setConfigOverride({
  //     env: selectedEnv,
  //   });
  //   codePush.restartApp();
  // }

  // return (
  //   <SafeAreaView style={styles.rootContainer}>
  //     <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
  //       <Text style={styles.infoText}>Select environment:</Text>
  //       {envs.map(env => {
  //         const selected = selectedEnv === env;
  //         return (
  //           <Pressable key={env} onPress={() => handleSelectEnv(env)}>
  //             <Text style={[styles.itemText, selected && styles.selected]}>{`${toTitleCase(env)} ${
  //               selected ? "(selected)" : ""
  //             }`}</Text>
  //           </Pressable>
  //         );
  //       })}

  //       <Text style={styles.infoText}>Active config:</Text>
  //       <Text style={styles.configText}>{JSON.stringify(config(), null, 2)}</Text>
  //     </ScrollView>
  //     <View style={styles.buttonContainer}>
  //       <AppButton title="Apply changes" onPress={handleApply} />
  //     </View>
  //   </SafeAreaView>
  // );
  return null;
};

export default DevSettingsScreen;
