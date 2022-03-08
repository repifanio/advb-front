import { IWrappedLayout } from '~/components/Basics/Wrapped/data';
import S from './styles';

export const Wrapped = ({
  children,
  bg = 'transparent',
  ...props
}: IWrappedLayout) => {
  return (
    <S.Wrapped {...{ ...props, bg }}>
      {children}
    </S.Wrapped>
  );
};
