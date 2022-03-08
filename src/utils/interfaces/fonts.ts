export type IFont =
  | 'regular'
  | 'italic'
  | 'light'
  | 'black'
  | 'bold'
  | 'medium'
  | 'thin'
  | 'blackItalic'
  | 'boldItalic'
  | 'lightItalic'
  | 'mediumItalic'
  | 'thinItalic';

export type IFontSize =
  | 'tiny'
  | 'xsmall'
  | 'small'
  | 'default'
  | 'big'
  | 'large'
  | 'xlarge';

export type ITextVariants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'h7'
  | 'h8';

export type IVariants = ITextVariants | Array<ITextVariants>;
