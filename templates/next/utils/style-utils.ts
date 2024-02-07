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

export interface ResponsiveUnit<T> {
  base?: T;
  md?: T;
  lg?: T;
  xl?: T;
}

const breakpoints = {
  md: 500, // medium devices
  lg: 700, // large devices
  xl: 1000, // extra large devices
};

/**
 * Helper function to get responsive unit used for styling.
 * Similar to chakra, native base, tailwindcss, etc.
 *
 * Example usage:
 * ```
 * const styles = StyleSheet.create({
 *    container: {
 *      width: responsiveUnit({base: 100, md: 200, lg: 300, xl: 400}),
 *    },
 * });
 * ```
 */
export function responsiveUnit<T = number>(unit: ResponsiveUnit<T>) {
  if (width >= breakpoints.xl && unit.xl !== undefined) {
    return unit.xl;
  } else if (width >= breakpoints.lg && unit.lg !== undefined) {
    return unit.lg;
  } else if (width >= breakpoints.md && unit.md !== undefined) {
    return unit.md;
  }

  if (unit.base === undefined) {
    throw new Error("Responsive unit must have a base value");
  }

  return unit.base;
}
