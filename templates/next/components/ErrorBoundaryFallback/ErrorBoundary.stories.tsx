import React from "react";
import ErrorBoundaryFallback from "./ErrorBoundaryFallback";
import {Saga} from "../../sagobok/Saga";

const story: Saga = {
  name: "ErrorBoundaryFallback",
  variants: {
    Default: () => <ErrorBoundaryFallback error={new Error("This is an error")} />,
  },
};

export default story;
