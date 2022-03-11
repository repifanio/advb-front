import styled from 'styled-components';
import { Wrapped } from '~/components';
import logoUrl from '../../assets/logo-advb.png' 

export default {
  Content: styled(Wrapped)`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex: 1;
    //background-color: #444;
    padding-top: 80px;
    width: 100%;
  `,
  Left: styled.div`
    //background-color: #808abc;
    background-color: #ffffff;
    height: calc(100vh - 80px);
    min-width: 300px;
    border: solid 1px #4054B2;
  `,
  LeftButton: styled.button`
    background-color: ${({ isSelected }) => isSelected ? '#4054B2' : 'white'};
    color: ${({ isSelected }) => isSelected ? 'white' : '#414660'};
    text-decoration: none;    
    border: none;
    padding: 0 20px;    
    height: 50px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-weight: 700;
    border-bottom: solid 1px #4054B2;
    cursor: pointer;
    :hover {
      background-color: #191D5E;
      color: white;
    }
  `,
  Right: styled.div`
    width: 100%;
  `,
  Header: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 80px;
    width: 100%;
    //background-color: #414660;
    display: flex;
    background-color: #FFFFF;
    justify-content: center;
    align-items: center;
  `,
  EmployerContent: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 16px;
  `,
  EmployerContentInputs: styled.div`
    display: flex;
    align-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;    
  `,
  Input: styled.input`
    color: #3e3e3e;
    font-weight: 500;
    outline: none;
    border-radius: 4px;
    border: 1px solid #808abc;
    padding: 13px 20px;
    height: fit-content;
    width: 100%;
    flex: 1;
    min-width: 200px;
    margin: 8px 8px 16px;
  `,

  InputLabel: styled.div`
    flex: 1;
    min-width: 200px;
    margin-right: 16px;
  `,

  EmployerContentButtons: styled.div`
    display: flex;
    align-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;  
  `,
  EmployerContentButton: styled.button`
    margin: 0 8px 16px;
    background-color: #4054B2;
    color: white;
    text-decoration: none;    
    border: none;
    padding: 0 20px;    
    height: 50px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex: 1;
    min-width: 200px;
    font-weight: 700;
    border-bottom: solid 1px #191D5E;
    border-radius: 4px;
    &:not([disabled]) {
      cursor: pointer;
      :hover {
        background-color: #191D5E;
        color: white;
      }
    }
    &:disabled {
      opacity: 0.3;
      cursor: default;
    }
  `,
  ExcelComponent: styled.div`
    background-color: #808abc;
    border: solid 1px #808abc;
    margin: 0 8px;
  `,
  ExcelComponentLine: styled.div`
    display: flex;
    flex-direction: row;
    // border: solid 1px black;
  `,
  ExcelExcelComponentItem: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 1px;
    // border-right: solid 1px black;
    flex: 1;
    padding: 4px 8px;
    &:last-of-type {
      // border-right: none;
    }
  `,
  IndicationContent: styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
  `,
  IndicationContentSelects: styled.div`
    display: flex;
    align-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;  
  `,
  InputSelect: styled.select`
    color: #3e3e3e;
    font-weight: 500;
    outline: none;
    border-radius: 4px;
    border: 1px solid #808abc;
    padding: 13px 20px;
    height: fit-content;
    flex: 0 1;
    min-width: 200px;
    margin: 0 8px 16px;
  `,
  InputTextArea: styled.textarea`
    color: #3e3e3e;
    font-weight: 500;
    outline: none;
    border-radius: 4px;
    border: 1px solid #808abc;
    padding: 13px 20px;
    height: fit-content;
    flex: 1;
    min-width: 200px;
    margin: 0 8px 16px;
    resize: none;
  `,
  IndicationContentButton: styled.button`
    margin: 0 8px;
    background: #4054B2;
    text-decoration: none;
    color: white;
    border: none;
    padding: 0 20px;
    border-radius: 4px;
    height: 50px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    &:not([disabled]) {
      cursor: pointer;
      :hover {
        background-color: #191D5E;
        color: white;
      }
    }
    &:disabled {
      opacity: 0.3;
      cursor: default;
    }
  `,
  ContactContent: styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
  `,
  ContactContentInputs: styled.div`
    display: flex;
    align-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;    
  `,
  ContactContentButton: styled.button`
  margin: 0 8px;
  background: #4054B2;
  text-decoration: none;
  color: white;
  border: none;
  padding: 0 20px;
  border-radius: 4px;
  height: 50px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  :hover {
    background-color: #191D5E;
    color: white;
  }
`,
  Logo: styled.img.attrs({
    src: `${logoUrl}`
  })` 
    margin-top: 20px;
    width: 350px;
    height: 350px;
  `
};
