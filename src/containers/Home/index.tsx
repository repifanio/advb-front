import { useQuery } from 'react-query';
import { getCompanies, getCompany, getCompanyContacts, getSector, postCompanyContacts, postIndication } from '~/utils';
import Modal from 'react-modal';
import { useUser, useComapny } from '~/context'
import { useEffect, useState } from 'react'
import { Text } from "~/components";
import S from "./styles";

export default function Home(props: any) {
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    function_service: "",
    phone: "",
  })

  const [newIndication, setNewIndication] = useState({
    userId: 0,
    description: "",
    sectorId: undefined
  })

  const [name, setName] = useState("")

  const [selectedCompany, setSelectedCompany] = useState(undefined)
  const { user } = useUser()
  const { setCompany, company } = useComapny()
  const [section, setSection] = useState("Employers");
  const [createContact, setCreateContact] = useState(false)
  const [setorDescription, setSetorDescription] = useState("")

  const isSelected = (name) => (
    name === section
  )

  const changeNewContact = (key, e) => {
    setNewContact({
      ...newContact,
      [key]: e.target.value
    })
  }

  const changeNewIndication = (key, e) => {
    e.preventDefault()
    setNewIndication({
      ...newIndication,
      userId: user.id,
      [key]: e.target.value
    })
  }

  const getSectorDescription = (key, e) => {
    const descript = e.filter( item => item.sector_id == key)
    setSetorDescription(descript[0].description)
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
  
  const { refetch: refetchNewIndication } = useQuery("newcontacts", () => postIndication(dataCompany.company_id || selectedCompany , newIndication), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const onRequestCompany = (e) => {
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
    await refetchNewContacts()
    refetchContacts()
    setCreateContact(false)
    clearContact()
  }

  const editCompany = async () => {
    
  }

  const saveIndication = async () => {
    await refetchNewIndication()
    clearIndication()
  }

  const clearContact = () => {
    setNewContact({
      name: "",
      email: "",
      function_service: "",
      phone: "",
    })
  }

  const clearIndication = () => {
    setNewIndication({
      userId: 0,
      description: "",
      sectorId: undefined
    })
  }
  
  const EmployerContent = () => {
    return (
      <S.EmployerContent> 
        <Text color="#292d6e" mx='8px' mb="24px" variant="h1">Dados da Empresa</Text>
        {
          dataCompanies?.length && (
            <>      
            <Text color="#292d6e" mx='8px' mb="8px" variant="h3">Nome da empresa</Text>
            <S.InputSelect onChange={onRequestCompany} value={selectedCompany}>
              <option selected={false} disabled value={null}>Nome da empresa</option> 
              {dataCompanies.map(({ name, company_id}) => (            
                <option value={company_id}>{name}</option> 
              ))}
            </S.InputSelect>
            </>
          )
        }
        {
          dataCompany && (
            <S.EmployerContentInputs>
              <S.InputLabel>
                <Text color="#292d6e" mx='8px' mb="24px" variant="h3">Documento</Text>
                <S.Input disabled value={dataCompany[0].document} />
              </S.InputLabel>
              {/* <S.Input disabled value={dataCompany[0].company_id}/> */}
              <S.InputLabel>
                <Text color="#292d6e" mx='8px' mb="24px" variant="h3">Endereço</Text>
                <S.Input disabled value={dataCompany[0].address}/>
              </S.InputLabel>
            </S.EmployerContentInputs>
          )
        }
        <S.EmployerContentButtons>
          <S.EmployerContentButton disabled={!selectedCompany} > Atualizar informações da empresa</S.EmployerContentButton>
          <S.EmployerContentButton disabled={!selectedCompany} onClick={() => setCreateContact(true)}> Criar um novo contato</S.EmployerContentButton>
        </S.EmployerContentButtons>

        <Text color="#292d6e" mx='8px' my="24px" variant="h1">Contatos da Empresa</Text>

        <ExcelComponent />
      </S.EmployerContent>
    )
  }

  const ExcelComponent = () => {
    return (
      <S.ExcelComponent>
        <S.ExcelComponentLine>
          {['Nome', 'Setor', 'Telefone', 'E-mail'].map((item) => (
            <S.ExcelExcelComponentItem style={{fontWeight: '700', color: '#292d6e'}}> { item} </S.ExcelExcelComponentItem>
          ))}
        </S.ExcelComponentLine>

        {dataContacts?.length ? (
          dataContacts.map((item) => (
            <S.ExcelComponentLine style={{display: 'flex'}}>
              <S.ExcelExcelComponentItem>{ item.name || 'Não informado' }</S.ExcelExcelComponentItem>
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
            <S.ExcelExcelComponentItem>Não informado</S.ExcelExcelComponentItem>
          </S.ExcelComponentLine>
        )}
      </S.ExcelComponent>
    )

  }

  const IndicationContent = () => {
    return (
      <S.IndicationContent> 
        <Text color="#292d6e" mx='8px' mb="24px" variant="h1">Preencha as informações de indicação</Text>
        <>
          <Text color="#292d6e" mx='8px' mb="8px" variant="h3">Nome do setor</Text>
          <S.IndicationContentSelects>
              <S.InputSelect name="Section" style={{flex: 1}} onChange={(e) => { changeNewIndication('sectorId', e); getSectorDescription(e.target.value, dataSector) }} value={newIndication.sectorId} >  
                <option selected={true} disabled value={null}>Escolha o setor</option> 
                {dataSector?.length && dataSector.map(({ name, sector_id}) => (            
                  <option value={sector_id}>{name}</option> 
                ))}
              </S.InputSelect>
          </S.IndicationContentSelects>
        </>
        <>
          <Text color="#292d6e" mx='8px' mb="8px" variant="h3">Descrição da categoria</Text>
          <S.InputTextArea key="categoryDescription" value={setorDescription}/>
        </>
        <>
          <Text color="#292d6e" mx='8px' mb="8px" variant="h3">Nome da empresa</Text>
          <S.IndicationContentSelects>
              <S.InputSelect name="Company" style={{flex: 1}} onChange={onRequestCompany} value={selectedCompany}>
                {dataCompanies?.length && dataCompanies.map(({ name, company_id}) => (            
                  <option value={company_id}>{name}</option> 
                ))}
              </S.InputSelect>
          </S.IndicationContentSelects>
        </>
        
        <Text color="#292d6e" mx='8px' mb="8px" variant="h3">Descrição da indicação</Text>
        <S.InputTextArea 
          autoFocus="autoFocus" 
          onChange={(e) => changeNewIndication('description', e)} 
          value={newIndication.description} 
          onFocus={(e) => {
            var val = e.target.value;
            e.target.value = '';
            e.target.value = val;
          }} 
        />
        <S.IndicationContentButton onClick={saveIndication}> Salvar indicação</S.IndicationContentButton>
      </S.IndicationContent>
    )
  }

  const VotationContent = () => {

    return (
      null
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
          <Text color="#292d6e" mx='8px' mb="24px" variant="h1">Preencha as informações do contato</Text>
          <S.ContactContentInputs>
            <S.Input key="Nome" placeholder="Nome" value={newContact.name} onChange={(e) => changeNewContact('name', e)}/>
            <S.Input placeholderkeyE-mail placeholder="E-mail" value={newContact.email} onChange={(e) => changeNewContact('email', e)}/>
            <S.Input key="Setor" placeholder="Setor" value={newContact.function_service} onChange={(e) => changeNewContact('function_service', e)} />
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
        <S.Logo ></S.Logo>
        {/* <Text textAlign="center" color="#292d6e" variant="h1">50º Prêmio Exportação RS</Text> */}
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