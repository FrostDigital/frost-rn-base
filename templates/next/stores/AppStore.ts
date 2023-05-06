import AsyncStorage from "@react-native-async-storage/async-storage";
import {create} from "zustand";
import messaging, {FirebaseMessagingTypes} from "@react-native-firebase/messaging";

const ACCESS_TOKEN_KEY = "@accessToken";
const REFRESH_TOKEN_KEY = "@refreshToken";

/**
 * Store responsible for the global state of the application.
 *
 * It's responsibilities is per app to decide but normally it would
 * be to track if user is logged, cache the auth users details etc.
 *
 * Note caching of API responses would ideally be done by react-query.
 */

interface AppStore {
  isLoggedIn: () => boolean;

  /**
   * Invoked early in start phase when app starts.
   * Is _not_ invoked when app transitioned to active.
   */
  onBeforeStart: () => Promise<void>;

  /**
   * Should be invoked when user logs out.
   * A place to clean state that is not relevant when user logged out.
   */
  logout: () => Promise<void>;

  /**
   * Invoked when app became active, when AppState transitioned to "active".
   */
  onAppActive: () => Promise<void>;

  /**
   * Invoked when app became active, when AppState transitioned to "background".
   */
  onAppBackground: () => Promise<void>;

  /**
   * Access token set when user is logged in.
   *
   * ApiStore (useApiStore) will use this access token when
   * accessing an authenticated endpoint.
   */
  accessToken?: string;

  /**
   * Refresh token set when user is logged in.
   *
   * ApiStore (useApiStore) will use this when there is a need to
   * refresh the current token
   */
  refreshToken?: string;

  // TODO: Remove me, just for demo purposes
  fakeLogin: () => any;

  /**
   * Firebase messaging token a.k.a. device token used for push notifications.
   */
  deviceToken?: string;

  unsubscribeFromNotifications?: () => any;

  /**
   * Callback to react on notifications received when app is in foreground.
   */
  handleForegroundNotification?: (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => any;
}

export const useAppStore = create<AppStore>((set, get) => ({
  isLoggedIn: () => !!get().accessToken,

  onBeforeStart: async () => {
    // Get and set access token from storage, if user is logged in
    set({
      accessToken: (await AsyncStorage.getItem(ACCESS_TOKEN_KEY)) || undefined,
      refreshToken: (await AsyncStorage.getItem(REFRESH_TOKEN_KEY)) || undefined,
    });

    // Retrieve device token from Firebase
    if ((await messaging().hasPermission()) === messaging.AuthorizationStatus.AUTHORIZED) {
      const deviceToken = await messaging().getToken();
      set({deviceToken});
      console.log("Got fcm token", deviceToken);
    }

    const handleForegroundMessage = get().handleForegroundNotification;

    // Unsubscribe before new one is created, will most likely only happen during
    // development when doing hot reloads or similar
    const oldUnsubscribe = get().unsubscribeFromNotifications;
    if (oldUnsubscribe) {
      oldUnsubscribe();
    }

    const unsubscribeFromNotifications = handleForegroundMessage
      ? messaging().onMessage(handleForegroundMessage)
      : undefined;

    set({
      unsubscribeFromNotifications,
    });
  },

  logout: async () => {
    set({
      accessToken: undefined,
      refreshToken: undefined,
      deviceToken: undefined,
    });
    await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
  },

  onAppActive: async () => {
    // 👉 Add stuff that will happen when app became active here, if any
  },

  onAppBackground: async () => {
    // 👉 Add stuff that will happen when app is about to be dismissed to background here, if any
  },

  // TODO: Remove me, just for demo purposes
  fakeLogin: () => {
    const accessToken = "fake";
    const refreshToken = "fake";

    set({
      accessToken,
      refreshToken,
    });

    AsyncStorage.multiSet([
      [ACCESS_TOKEN_KEY, accessToken],
      [REFRESH_TOKEN_KEY, refreshToken],
    ]);
  },

  deviceToken: "",

  unsubscribeFromNotifications: undefined,

  handleForegroundNotification: (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
    console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
  },
}));
