import messaging, {FirebaseMessagingTypes} from "@react-native-firebase/messaging";
import {observable} from "mobx";
import BaseStore from "./BaseStore";

/**
 * State store that handles notification a.k.a. push messages.
 */
class NotificationStore extends BaseStore {
  @observable
  private token?: string;

  private unsubscribe?: Function;

  private initialNotification: FirebaseMessagingTypes.RemoteMessage | null = null;

  async onBeforeStart() {
    try {
      this.updateToken();

      if (this.unsubscribe) {
        this.unsubscribe();
      }

      this.unsubscribe = messaging().onMessage(this.handleForegroundMessage);
    } catch (err) {
      throw err;
    }
  }

  async onAppActive() {
    this.initialNotification = await messaging().getInitialNotification();

    if (this.initialNotification) {
      console.log("App was opened from notification", this.initialNotification);
    }
  }

  async updateToken() {
    if ((await messaging().hasPermission()) === messaging.AuthorizationStatus.AUTHORIZED) {
      this.token = await messaging().getToken();
      console.log("Got fcm token", this.token);
    }
  }

  async onLogout() {
    this.token = undefined;
  }

  private handleForegroundMessage = (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
    console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
  };
}

export default NotificationStore;
