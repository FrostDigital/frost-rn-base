import {storiesOf} from "@storybook/react-native";
import React from "react";
import {StyleSheet, View} from "react-native";

import AppButton from "./AppButton";

storiesOf("AppButton", module)
  .addDecorator((story: any) => <View style={styles.rootContainer}>{story()}</View>)
  .add("Primary", () => <AppButton title="Press me" onPress={() => console.log("Primary button pressed")} />);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
