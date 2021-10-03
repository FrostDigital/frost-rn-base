# Errors and logging

## Error boundary

An [error boundary component](https://reactjs.org/docs/error-boundaries.html) is used to catch any unhandled exception during component rendering.

This is good practice so that we minimize risk that end user ends up with a blank screen (unresponsive app).

### Configuration

Decide if async storage will be wiped on any exception picked up by error boundary with config `clearStoreOnUnhandledException`.
By enabling this the user will (most likely) be logged out.

## Logging

TODO
