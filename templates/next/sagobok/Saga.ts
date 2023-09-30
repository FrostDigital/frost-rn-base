import React from "react";

export type Saga = {
  name: string;
  decorator?: React.FC<{children: React.ReactNode}>;
  variants: {
    [x: string]: React.FC;
  };
};
