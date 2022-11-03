import messaging from "@react-native-firebase/messaging";

/**
 * Request permissions. Only needed on iOS but
 * can safely be invoked on Android which will
 * result in no-op.
 */
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
}
