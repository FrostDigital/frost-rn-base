# Google Firebase Cloud Messaging

Google Firebase Cloud Messages is included in base project by default. There are however some configuration steps needed in order to get it to work for you:

1. Create project in Firebase and add iOS and Android apps
2. Create APNs Authentication Key and upload it to Firebase
3. Make sure that identifier and provisioning profile with Push Notifications exists in developer.apple.com
4. Download `GoogleService-Info.plist` for iOS and `google-service.json` for Android and replace existing ones in project (in `/ios` and `/android` folder).

## Test using included test script

> IMPORTANT! Push notifications will not be delivered to iOS simulator. To test pushes in iOS you need to have a physical device.

There is a test script included in project to simplify test of push messages without need for backend or to use the firebase console.

In order to use is you need to replace `serverKey` in `scripts/send-push.js` to server key from Firebase. You may also want to tweak fields and payload in the notification object so that you for example can test deep links.

Usage:

```
node scripts/send-push.js ecB_XupSa03ntNu06G364c:APA91bFeUZrSIhQf61BW6Vjtqu3QXdOf4vGzus1FRjUvyv2fo0bMD7s2V9C-GLtUw_-pt3j6kMOl1bGvxyBQkoaEdEpfJEdYPE7B01EXMkmDb2Xra6_jV4U0zAgl_7a9ykDYvwqDkOA1
```

The (very) long text string is the device token for your phone which you need to extract from app log when starting the app. Look for the line:

```
LOG  Got fcm token ecB_XupSa03ntNu06G364c:APA91bFeUZrSIhQf61BW6Vjtqu3QXdOf4vGzus1FRjUvyv2fo0bMD7s2V9C-GLtUw_-pt3j6kMOl1bGvxyBQkoaEdEpfJEdYPE7B01EXMkmDb2Xra6_jV4U0zAgl_7a9ykDYvwqDkOA1
```

## De-integrate Google Firebase

If you do not need or want Firebase in your project you can remove it like so:

Remove line ~17 in `android/build.gradle`:

```
classpath 'com.google.gms:google-services:4.3.10'
```

Remove line 2 in `android/app/build.gradle`:

```
apply plugin: 'com.google.gms.google-services'
```

Remove dependencies in `package.json`:

```
@react-native-firebase/app
@react-native-firebase/messaging
```

Remove configuration files for iOS and Android:

```
android/google-services.json
ios/GoogleService-Info.plist
```

_Note: You might need to remove reference to file in xcode and not just delete file!_

Remove line 1 in `AppDelegate.m`:

```
#import <Firebase.h>
```

Remove line ~37 in `AppDelegate.m` (in method `didFinishLaunchingWithOptions`):

```
[FIRApp configure];
```

Do not forget to prune dependencies and re-run `pod install` at this point.

Lastly remove all invocations from within the typescript project, but this will not be covered here (you will probably notice it anyways when dependencies were removed).
