import { ITextLayout } from '~/components/Basics/Text/data';
import S from './styles';

export const Text = ({
  color = 'texts',
  font = 'Roboto',
  size = 'default',
  ...props
}: ITextLayout) => (
  <S.Text fontFamily={'Roboto'} color={color} size={size} {...props} />
);
