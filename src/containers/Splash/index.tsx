import { Text } from "~/components";
import S from "./styles";

export default function Splash(props: any) {
  return (
    <S.Header justifyContent="center">
      <Text variant="h1">{`Tela Default`}</Text>
    </S.Header>
  )
}