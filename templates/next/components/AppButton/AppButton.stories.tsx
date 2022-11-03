import React from "react";
import {View} from "react-native";
import {Saga} from "../../sagobok/Saga";
import AppButton from "./AppButton";

const story: Saga = {
  name: "AppButton",
  decorator: ({children}) => <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>{children}</View>,
  variants: {
    Primary: () => <AppButton title="Press me" onPress={() => console.log("Primary button pressed")} />,
  },
};

export default story;
