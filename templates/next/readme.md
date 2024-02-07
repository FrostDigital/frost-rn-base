# Frost React Native App

This is a boilerplate React Native app generated with `npx create-frost-rn-app`.

It is using the following tech stack and tools:

- Typescript
- React Query - Data fetching and to some extent global state/cache
- Zustand - lightweight global state
- React Navigation
- i18n
- Azure Pipeline CI scripts
- Firebase Messaging\*
- Sagobok - a lightweight alternative to Storybook

\*Firebase Messaging is using a rather old version by design. Since `@react-native-firebase` 15+ it requires `use_frameworks` to be used for iOS. This is is not compatible with Flipper plus can potentially cause other issues.

## Installation

```
npm install
npx pod-install
```

## Start the app

```
npm run ios
npm run android
```
