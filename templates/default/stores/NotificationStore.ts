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

  public initialNotification: FirebaseMessagingTypes.RemoteMessage | null = null;

  public onInitialNotification?: (notif: FirebaseMessagingTypes.RemoteMessage) => any;

  async onBeforeStart() {
    try {
      this.updateToken();

      // Unsubscribe before new one is created, will most likely only happen during
      // development when doing hot reloads or similar
      if (this.unsubscribe) {
        this.unsubscribe();
      }

      this.unsubscribe = messaging().onMessage(this.handleForegroundMessage);

      await this.setAndPublishInitialNotification();
    } catch (err) {
      throw err;
    }
  }

  async onAppActive() {
    await this.setAndPublishInitialNotification();
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

  private async setAndPublishInitialNotification() {
    this.initialNotification = await messaging().getInitialNotification();
    this.initialNotification && this.onInitialNotification && this.onInitialNotification(this.initialNotification);
  }
}

export default NotificationStore;
