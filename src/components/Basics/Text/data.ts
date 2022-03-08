import { withChildren, IVariants } from '~/utils'
;

import {
  SpaceProps,
  ColorProps,
  BorderProps,
  FontSizeProps,
  FontStyleProps,
  FontFamilyProps,
  FontWeightProps,
  TypographyProps,
  LayoutProps
} from 'styled-system';

export type IFont = 'Regular' | 'Light' | 'Medium' | 'Bold' | 'Black'

export type IFontSize =
  | 'tiny'
  | 'xsmall'
  | 'small'
  | 'default'
  | 'medium'
  | 'big'
  | 'large'
  | 'xlarge'
export interface IText
  extends withChildren,
    BorderProps,
    ColorProps,
    FontSizeProps,
    FontFamilyProps,
    FontWeightProps,
    FontStyleProps,
    SpaceProps,
    LayoutProps,
    TypographyProps {
  variant?: IVariants | string;
  textTransform?: string
  textDecoration?: string
  font?: IFont
  size?: IFontSize
  testID?: string
  numberOfLines?: number
  color?: string
}

export type ITextLayout = IText
