import AsyncStorage from "@react-native-async-storage/async-storage";
import {t} from "i18n-js";
import React, {useEffect, useState} from "react";
import {DevSettings, Pressable, Text, View} from "react-native";
import {getBuildNumber, getVersion} from "react-native-device-info";
import styles from "./ErrorBoundaryFallback.styles";

interface Props {
  error: Error;
  clearAsyncStorageOnError?: boolean;
}

const ErrorBoundaryFallback: React.FC<Props> = ({error, clearAsyncStorageOnError}) => {
  const [deviceInfo, setDeviceInfo] = useState("");

  async function restart() {
    try {
      if (clearAsyncStorageOnError) {
        await AsyncStorage.clear();
      }
    } catch (err) {
      console.log("Could not clear async storage", err);
    } finally {
      DevSettings.reload();
    }
  }

  useEffect(() => {
    async function load() {
      try {
        const buildNum = await getBuildNumber();
        const version = await getVersion();
        setDeviceInfo(`Version ${version} (${buildNum})`);
      } catch (err) {
        console.log("Failed getting device info");
      }
    }

    load();
  }, [setDeviceInfo]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("errorBoundary.title")}</Text>
      <Text style={styles.description}>{t("errorBoundary.description")}</Text>
      <Text style={styles.errorDetails} numberOfLines={1}>
        {error.message}
      </Text>
      <Text style={styles.errorDetails}>{deviceInfo}</Text>
      <Pressable style={styles.btn} onPress={restart}>
        <Text style={styles.btnText}>{t("errorBoundary.restart")}</Text>
      </Pressable>
    </View>
  );
};

export default ErrorBoundaryFallback;
