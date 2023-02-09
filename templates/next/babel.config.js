module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    // https://github.com/react-navigation/react-navigation/issues/5825
    "@babel/plugin-transform-flow-strip-types",
    "react-native-reanimated/plugin",
  ],
};
