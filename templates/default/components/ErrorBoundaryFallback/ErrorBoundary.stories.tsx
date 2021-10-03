import {storiesOf} from "@storybook/react-native";
import React from "react";
import ErrorBoundaryFallback from "./ErrorBoundaryFallback";

storiesOf("ErrorBoundaryFallback", module).add("default", () => (
  <ErrorBoundaryFallback error={new Error("This is an error")} />
));
