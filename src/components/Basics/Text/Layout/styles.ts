import styled from "styled-components";
import {
  color,
  space,
  border,
  typography,
  variant,
  fontFamily,
  borderBottom,
} from "styled-system";
import { ITextLayout } from "~/components/Basics/Text/data";
import { fonts, fontSizes, colors } from "~/styles/";

const Text = styled.span<ITextLayout>`
  ${space};
  ${color};
  ${typography};
  ${border};
  ${fontFamily};

  font-size: ${({ size }) => fontSizes[size || "default"]};
  font-family: ${({ font }) => fonts[font as string] || "default"};
  color: ${({ color }) => colors[color as string]};
  white-space: pre-line;
  text-decoration-line: ${({ textDecoration }) => textDecoration};
  cursor: ${({ textDecoration }) => textDecoration && "pointer"};
`;

export default {
  Text: styled(Text)(
    variant({
      variants: {
        h1: {
          fontWeight: fonts.bold,
          fontSize: fontSizes.xlarge,
        },
      },
    })
  ),
};
