import AsyncStorage from "@react-native-async-storage/async-storage";
import {create} from "zustand";
import messaging, {FirebaseMessagingTypes} from "@react-native-firebase/messaging";
import {AuthUser} from "../models/AuthUser";
import {useApiStore} from "./ApiStore";
import {config} from "../config/config";

const ACCESS_TOKEN_KEY = "@accessToken";
const REFRESH_TOKEN_KEY = "@refreshToken";
const USER_KEY = "@user";

/**
 * Store responsible for the global state of the application.
 * Split this on up into multiple stores if it becomes too large.
 *
 * Note that caching of API responses would ideally be done by react-query.
 */

interface AppStore {
  /**
   * Authenticated user, if any.
   */
  user?: AuthUser;

  isLoggedIn: () => boolean;

  /**
   * Invoked early in start phase when app starts.
   * Is _not_ invoked when app transitioned to active.
   *
   * This is a good place to sync persisted state with the store so it is available
   * for the rest of the app.
   */
  onBeforeStart: () => Promise<void>;

  /**
   * Should be invoked after the user logged in and the access token is received.
   * A place to store the token in storage and set it in the store.
   */
  login: (token: string, user: AuthUser) => any;

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
    useApiStore.getState().init(config().apiRoot);
    // Get and set access token from storage, if user is logged in
    set({
      accessToken: (await AsyncStorage.getItem(ACCESS_TOKEN_KEY)) || undefined,
      // refreshToken: (await AsyncStorage.getItem(REFRESH_TOKEN_KEY)) || undefined,
      user: JSON.parse((await AsyncStorage.getItem(USER_KEY)) || "null"),
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

  login: async (accessToken, user) => {
    set({
      accessToken,
      user,
      // refreshToken: user.refreshToken,
    });

    await AsyncStorage.multiSet([
      [ACCESS_TOKEN_KEY, accessToken],
      [USER_KEY, JSON.stringify(user)],
      // [REFRESH_TOKEN_KEY, user.refreshToken],
    ]);
  },

  logout: async () => {
    set({
      accessToken: undefined,
      refreshToken: undefined,
      deviceToken: undefined,
      user: undefined,
    });
    await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY]);
  },

  onAppActive: async () => {
    // 👉 Add stuff that will happen when app became active here, if any
  },

  onAppBackground: async () => {
    // 👉 Add stuff that will happen when app is about to be dismissed to background here, if any
  },

  deviceToken: "",

  unsubscribeFromNotifications: undefined,

  handleForegroundNotification: (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
    console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
  },
}));
