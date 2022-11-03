# create-frost-rn-app

A super quick way to generate a boilerplate for your next React Native app.

Using following tech stack and tools:

- Typescript
- Mobx (⚠️ Deprecated in `next` template - using [zustand](https://github.com/pmndrs/zustand) and react-query instead)
- React Navigation
- i18n
- Azure Pipeline CI scripts (⚠️ Only available in `next` template)
- Firebase Messaging
- Soon: CodePush

Will in future include:

- Push notifications via Google Firebase

## Usage

Generate a RN app with `default` template:

```
npx create-frost-rn-app
```

Generate a RN app with `next` template:

```
npx create-frost-rn-app --template next
```

## Templates

Templates are located in `templates/default`.

### Default

Default template with following stack:

- React Native 0.65.1
- Typescript
- Mobx - Global state
- React Navigation
- i18n
- Firebase Messaging
- Storybooks

### Next

Updated template with following stack:

- React Native 0.65.1
- Typescript
- React Query - Data fetching and to some extent global state/cache
- Zustand - Global state
- React Navigation
- i18n
- Firebase Messaging
- Sagobok - a lightweight alternative to Storybook
