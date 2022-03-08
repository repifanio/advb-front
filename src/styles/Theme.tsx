import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { metrics } from './metrics';
import { IStringMap, StringToNumberMap } from '../utils';

const { defaultSpace } = metrics;

export const space = [
  0,
  defaultSpace() / 2,
  ...Array.from({ length: 12 }, (_, k) => defaultSpace(k + 1)),
];

export const fontSizes: IStringMap = {
  tiny: '10px',
  xsmall: '11px',
  small: '12px',
  default: '13px',
  big: '18px',
  large: '20px',
  xlarge: '24px',
};

export const colors: IStringMap = {
  texts: '#221E1E',
  primary: '#A00F2D',
  secondary: '#E55531',
  background: '#F5F5F5',
  active: '#E6AF32',
  inactive: '#C6C6C6',
  success: '#0f853E',
  transparent: 'transparent',
};

export const fonts: IStringMap = {
  default: 'Regular',
  regular: 'Regular',
  italic: 'Italic',
  light: 'lighter',
  black: 'Black',
  bold: 'Bold',
  medium: '500',
  thin: 'Thin',
  blackItalic: 'Black-Italic',
  boldItalic: 'Bold-Italic',
  lightItalic: 'Light-Italic',
  mediumItalic: 'Medium-Italic',
  thinItalic: 'Thin-Italic',
};

export const radii: StringToNumberMap = {
  light: defaultSpace() / 2,
  medium: defaultSpace(),
};

export const shadows: IStringMap = {
  cell: '0px 0px 8px rgba(0,0,0,0.12)',
  button: '0px 6px 10px rgba(34, 30, 30, 0.15)',
};

export const breakpoints: string[] = [
  '425px',
  '768px',
  '1024px',
  '1200px',
  '1920px',
];

export const theme = {
  radii,
  space,
  fonts,
  colors,
  shadows,
  fontSizes,
  breakpoints,
};

export const ThemeProvider = ({ children }) => (
  <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
);
