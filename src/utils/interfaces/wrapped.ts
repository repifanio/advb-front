import { withChildren } from '~/utils';
import {
  BorderProps,
  BoxShadowProps,
  ColorProps,
  FlexboxProps,
  SpaceProps,
  TypographyProps,
  BackgroundColorProps,
  LayoutProps,
  PositionProps,
  DisplayProps,
} from 'styled-system';

export interface IWrapped
  extends withChildren,
    BorderProps,
    PositionProps,
    BoxShadowProps,
    ColorProps,
    FlexboxProps,
    SpaceProps,
    TypographyProps,
    BackgroundColorProps,
    DisplayProps,
    LayoutProps {
  onClick?: void | (() => void);
  ref?: any;
  id?: string;
}
