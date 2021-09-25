# Splash

Package [react-native-bootsplash](https://github.com/zoontek/react-native-bootsplash) is wired up and used in the app so that it displays a splash screen while launching the app.

You can regenerate new splash assets with [this command](https://github.com/zoontek/react-native-bootsplash#assets-generation) or by modyfying existing splash screen files.

Here is an example:

```
npx react-native generate-bootsplash assets/logo@3x.png --background-color=#ffffff --assets-path=assets
```

Make sure to invoke `RNBootSplash.hide(/*{fade: true}*/);` when appropriate in the app to hide the splash.
