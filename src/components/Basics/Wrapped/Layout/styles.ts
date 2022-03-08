import styled from 'styled-components';
import { IWrappedLayout } from '~/components/Basics/Wrapped/data';
import { space as convertSpace } from '~/styles/';

import {
  color,
  space,
  border,
  flexbox,
  boxShadow,
  typography,
  layout,
  display,
  position,
  borderRadius,
  height,
  width,
  justifyContent,
  minHeight
} from 'styled-system';

export default {
  Wrapped: styled.div<IWrappedLayout>`
    ${space};
    ${color};
    ${typography};
    ${border};
    ${flexbox};
    ${boxShadow};
    ${position};
    ${layout};
    ${display};
    ${borderRadius};
    ${height};
    ${width};
    ${justifyContent};
    ${minHeight};

    cursor: ${({ cursor }) => cursor};
    gap: ${({ gap }) => convertSpace[gap] + 'px'};
  `
};
