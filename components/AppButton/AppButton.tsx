import {t} from "i18n-js";
import React from "react";
import {Pressable, PressableProps, StyleProp, Text, ViewStyle} from "react-native";
import styles from "./AppButton.styles";

interface Props extends PressableProps {
  title: string;
  style?: StyleProp<ViewStyle>;
}

const AppButton: React.FC<Props> = ({title, style, ...rest}) => {
  return (
    <Pressable {...rest} style={[styles.container, style]}>
      <Text style={styles.text}>{t(title) || title}</Text>
    </Pressable>
  );
};

export default AppButton;
