import styled from 'styled-components';
import { Wrapped } from '~/components';

export default {
  Content: styled(Wrapped)`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #414660;
  `,
  Logo: styled.div`
    position: absolute;
    left: 50px;
    top: 36px;
  `,
  ContentLogin: styled.div`
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: 420px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 1px 4px rgb(0 0 0 / 5%), 0 4px 16px rgb(0 0 0 / 6%);
    padding: 36px 50px;
  `,
  Input: styled.input`
    color: #3e3e3e;
    font-weight: 500;
    outline: none;
    border-radius: 4px;
    border: 1px solid #808abc;
    padding: 13px 20px;
    height: auto;
    z-index: 1;
    width: 100%;
    margin-bottom: 16px;
  `,
  Button: styled.button`
    background: #414660;
    text-decoration: none;
    color: white;
    border: none;
    padding: 0 20px;
    border-radius: 4px;
    margin: 3px 0;
    height: 50px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;

    &:disabled {
      opacity: 0.3;
    }
  `
};
