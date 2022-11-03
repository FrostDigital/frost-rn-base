import React from "react";

export type Saga = {
  name: string;
  decorator?: React.FC;
  variants: {
    [x: string]: React.FC;
  };
};
