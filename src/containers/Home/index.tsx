import { useQuery } from 'react-query';
import { getCompanies, getCompany, getCompanyContacts, getSector, postCompanyContacts } from '~/utils';
import Modal from 'react-modal';
import { useUser, useComapny } from '~/context'
import { useEffect, useState } from 'react'
import { Text } from "~/components";
import S from "./styles";

export default function Home(props: any) {
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    function: "",
    phone: "",
  })

  const [name, setName] = useState("")

  const [selectedCompany, setSelectedCompany] = useState(0)
  const { user } = useUser()
  const { setCompany, company } = useComapny()
  const [section, setSection] = useState("Employers");
  const [createContact, setCreateContact] = useState(false)

  const isSelected = (name) => (
    name === section
  )

  const changeNewContact = (key, e) => {
    console.log("selectedCompany", selectedCompany)
    setNewContact({
      ...newContact,
      [key]: e.target.value
    })
  }

  
  const { data: { data: dataCompanies } = {} } = useQuery(
    "companies", 
    getCompanies
  );
  
  const { data: { data: dataCompany } = {} , refetch: refetchCompany } =  useQuery("company", () => getCompany(selectedCompany), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const { data: { data: dataContacts } = {} , refetch: refetchContacts } = useQuery("contacts", () => getCompanyContacts(selectedCompany), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const { data: { data: dataSector } = {} } = useQuery(
    "sectors", 
    getSector
  );

  const { refetch: refetchNewContacts } = useQuery("newcontacts", () => postCompanyContacts(selectedCompany, newContact), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const onRequestCompany = (e) => {
    console.log("Caraca", e.target.value)
    setSelectedCompany(e.target.value)    
  }

  useEffect(()=> {
    if (!selectedCompany) {
      return
    }

    refetchCompany()
    refetchContacts()
  }, [selectedCompany])

  const saveContact = async () => {
    console.log("cara", selectedCompany)
    await refetchNewContacts()
    refetchContacts()
    setCreateContact(false)
  }
  
  const EmployerContent = () => {
    return (
      <S.EmployerContent> 
        <Text color="#414660" mx='8px' mb="24px" variant="h1">Dados da Empresa</Text>
        {
          dataCompanies && (            
            <S.InputSelect onChange={onRequestCompany} value={selectedCompany}>
              <option selected={true} value={null}>Empresa não selecionada</option> 
              {dataCompanies.map(({ name, company_id}) => (            
                <option value={company_id}>{name}</option> 
              ))}
            </S.InputSelect>
          )
        }
        {
          dataCompany && (
            <S.EmployerContentInputs>
              <S.Input disabled value={dataCompany[0].document} />
              <S.Input disabled value={dataCompany[0].company_id}/>
              <S.Input disabled value={dataCompany[0].address}/>
            </S.EmployerContentInputs>
          )
        }
        <S.EmployerContentButtons>
          <S.EmployerContentButton disabled> Atualizar informações da empresa</S.EmployerContentButton>
          <S.EmployerContentButton disabled={!selectedCompany} onClick={() => setCreateContact(true)}> Criar um novo contato</S.EmployerContentButton>
        </S.EmployerContentButtons>

        <Text color="#414660" mx='8px' my="24px" variant="h1">Contatos da Empresa</Text>

        <ExcelComponent />
      </S.EmployerContent>
    )
  }

  const ExcelComponent = () => {
    return (
      <S.ExcelComponent>
        <S.ExcelComponentLine>
          {['Setor', 'Telefone', 'E-mail'].map((item) => (
            <S.ExcelExcelComponentItem style={{fontWeight: '700'}}> { item} </S.ExcelExcelComponentItem>
          ))}
        </S.ExcelComponentLine>

        {dataContacts?.length ? (
          dataContacts.map((item) => (
            <S.ExcelComponentLine style={{display: 'flex'}}>
              <S.ExcelExcelComponentItem>{ item.function_service || 'Não informado' }</S.ExcelExcelComponentItem>
              <S.ExcelExcelComponentItem>{ item.phone || 'Não informado' }</S.ExcelExcelComponentItem>
              <S.ExcelExcelComponentItem>{ item.email || 'Não informado' }</S.ExcelExcelComponentItem>
            </S.ExcelComponentLine>
          ))
        ): (
          <S.ExcelComponentLine style={{display: 'flex'}}>
            <S.ExcelExcelComponentItem>Não informado</S.ExcelExcelComponentItem>
            <S.ExcelExcelComponentItem>Não informado</S.ExcelExcelComponentItem>
            <S.ExcelExcelComponentItem>Não informado</S.ExcelExcelComponentItem>
          </S.ExcelComponentLine>
        )}
      </S.ExcelComponent>
    )

  }

  const IndicationContent = () => {

    return (
      <S.IndicationContent> 
        <Text color="#414660" mx='8px' mb="24px" variant="h1">Preencha as informações de indicação</Text>
        <S.IndicationContentSelects>

          <S.InputSelect name="Section" style={{flex: 1}}>
            {dataSector.map(({ name, sector_id}) => (            
              <option value={sector_id}>{name}</option> 
            ))}
          </S.InputSelect>
        </S.IndicationContentSelects>

        <S.InputTextArea />
        <S.IndicationContentButton> Salvar indicação</S.IndicationContentButton>
      </S.IndicationContent>
    )
  }

  const VotationContent = () => {

    return (
      <div> VotationContent </div>
    )
  }

  const RightContent = () => {
    const content = {
      Employers: EmployerContent,
      Indications: IndicationContent,
      Votations: VotationContent,
    }

    const RenderContent = content[section]

    return (
      <S.Right>
        <RenderContent />
      </S.Right>
    )
  }

  const modalContent = () => {
    return (
      <Modal
        isOpen={createContact}
        onRequestClose={() => setCreateContact(false)}
        style={{
          overlay: {
            backgroundColor: `rgba(0,0,0,0.7)`
          },
        }}
        contentLabel="Example Modal"
      >
        <S.ContactContent>
          <Text color="#414660" mx='8px' mb="24px" variant="h1">Preencha as informações do contato</Text>
          <S.ContactContentInputs>
            <S.Input key="Nome" placeholder="Nome" value={newContact.name} onChange={(e) => changeNewContact('name', e)}/>
            <S.Input placeholderkeyE-mail placeholder="E-mail" value={newContact.email} onChange={(e) => changeNewContact('email', e)}/>
            <S.Input key="Setor" placeholder="Setor" value={newContact.function} onChange={(e) => changeNewContact('function', e)} />
            <S.Input key="Telefone" placeholder="Telefone" value={newContact.phone} onChange={(e) => changeNewContact('phone', e)} />
          </S.ContactContentInputs>
          <S.ContactContentButton onClick={saveContact}> Salvar contato</S.ContactContentButton>
        </S.ContactContent> 
      </Modal>
    )
  }
  return (
    <S.Content justifyContent="center">
      <S.Header>
        <Text textAlign="center" color="white" variant="h1">Nome da Aplicação</Text>
      </S.Header>
      <S.Left>
        <S.LeftButton isSelected={isSelected('Employers')} onClick={() => setSection('Employers')}> Empresas </S.LeftButton>
        <S.LeftButton isSelected={isSelected('Indications')} onClick={() => setSection('Indications')}> Indicações </S.LeftButton>
        <S.LeftButton isSelected={isSelected('Votations')} onClick={() => setSection('Votations')}> Votação </S.LeftButton>
      </S.Left>
      <RightContent />
      {modalContent()}
    </S.Content>
  )
}