import { Children } from 'react';

import { IConditional } from './data';

export const Conditional = ({
  children,
  render,
}: IConditional): JSX.Element => {
  const [first, second] = Children.toArray(children);
  return <>{render ? first : second ? second : <></>}</>;
};
