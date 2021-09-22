import React from "react";
import {Pressable, PressableProps, StyleProp, Text, ViewStyle} from "react-native";
import appButtonStyles from "./AppButton.styles";

interface Props extends PressableProps {
  title: string;
  style?: StyleProp<ViewStyle>;
}

const AppButton: React.FC<Props> = ({title, style, ...rest}) => {
  return (
    <Pressable {...rest} style={[appButtonStyles.container, style]}>
      <Text style={appButtonStyles.text}>{title}</Text>
    </Pressable>
  );
};

export default AppButton;
