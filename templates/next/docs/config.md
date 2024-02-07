# Configuration

It is generally a good practice to extract configuration to a single source such as a config file.

It can become a quite complex task when dealing with multiple environments and also when parts of configuration needs to be exposed during build time or even dynamic when toggling settings in [dev settings](dev-settings.md).

Add config in `/config/config.ts` and divided it into app environments if needed to (by default `test` and `prod`).

Place common configuration in `global` and environment specific configuration in `test` or `prod` (or other environments if you decide to add those).

If same key exists in both root and environment specific config the latter one will be used.

Example:

```typescript
const config = {
  global: {
    hello: "world",
  },

  test: {
    // Add config specific to test here
    hello: "test world",
  },

  prod: {
    // Add config specific to prod here
  },
};
```

If running app with active env `test` the `config.hello` would be `test world`.
