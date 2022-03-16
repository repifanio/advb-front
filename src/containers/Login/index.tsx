import Router from 'next/router';
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { login } from '~/utils';
import { useUser } from '~/context';
import { Text } from "~/components";
import S from "./styles";

export default function Login(props: any) {
  const { defineUser } = useUser()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const goTo = (path) => {
    Router.push(path)
  }

  const isEmpty = () => (
    !email || !password
  )
  
  const { data, refetch: onLogin } = useQuery("login", () => login({ email, password }), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  useEffect(() => {
    if (!data) {
      return
    }

    const { data: dataFull } = data;

    console.log(data)
    defineUser({
      token: dataFull.token,
      ...dataFull.user
    })

    goTo('/home')
  }, [data])

  return (
    <S.Content justifyContent="center">
      <S.Logo>
        <Text variant="h1" textAlign="center" mb="30px" color="white">Prêmio Exportação RS</Text>
      </S.Logo>
      <S.ContentLogin>
        <Text variant="h1" textAlign="center" mb="30px">Falta pouco para começar!</Text>
        <S.Input onChange={(e => setEmail(e.target.value))} placeholder="E-mail"/>
        <S.Input onChange={(e => setPassword(e.target.value))} type="password" placeholder="Senha"/>        
        <S.Button disabled={isEmpty()} onClick={onLogin}> Entrar </S.Button>
      </S.ContentLogin>
    </S.Content>
  )
}