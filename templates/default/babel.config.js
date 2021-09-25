module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    // https://github.com/react-navigation/react-navigation/issues/5825
    "@babel/plugin-transform-flow-strip-types",
    // Mobx config below
    ["@babel/plugin-proposal-decorators", {legacy: true}],
    ["@babel/plugin-proposal-class-properties", {loose: false}],
    // In contrast to MobX 4/5, "loose" must be false!    ^
  ],
};
