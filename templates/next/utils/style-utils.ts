import {Dimensions} from "react-native";

const {width, height} = Dimensions.get("window");

export const WINDOW_HEIGHT = height;
export const WINDOW_WIDTH = width;

const UNITS = {
  vw: width / 100,
  vh: height / 100,
};

/**
 * Returns width relative to view width.
 * Same concept as vw unit in css.
 *
 * Credit: https://github.com/jmstout/react-native-viewport-units
 */
export function vw(val: number, {minWidth, maxWidth}: {minWidth?: number; maxWidth?: number} = {}) {
  const relativeWidth = val * UNITS.vw;

  if (minWidth && relativeWidth < minWidth) {
    return minWidth;
  }

  if (maxWidth && relativeWidth > maxWidth) {
    return maxWidth;
  }

  return relativeWidth;
}

/**
 * Returns width relative to view height.
 * Same concept as vh unit in css.
 *
 * Credit: https://github.com/jmstout/react-native-viewport-units
 */
export function vh(val: number, {minHeight, maxHeight}: {minHeight?: number; maxHeight?: number} = {}) {
  const relativeHeight = val * UNITS.vh;

  if (minHeight && relativeHeight < minHeight) {
    return minHeight;
  }

  if (maxHeight && relativeHeight > maxHeight) {
    return maxHeight;
  }

  return relativeHeight;
}
