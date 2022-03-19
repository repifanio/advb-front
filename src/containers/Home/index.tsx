import { useQuery } from 'react-query';
import {
  getCompanies, getCompany, getCompanyIndication,
  getCompanyContacts, getSector, postCompanyContacts,
  postIndication, postCompany
} from '~/utils';
import Modal from 'react-modal';
import { useUser, useComapny } from '~/context'
import { useEffect, useState, useRef, useLayoutEffect } from 'react'
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
  const [newCompany, setNewCompany] = useState({
    name: "",
    document: "",
    address: "",
    userId: 0,
  })
  const [name, setName] = useState("")
  const [selectedCompany, setSelectedCompany] = useState(undefined)
  const [selectedCompanyIndication, setSelectedCompanyIndication] = useState(undefined)
  const { user } = useUser()
  const { setCompany, company } = useComapny()
  const [section, setSection] = useState("Employers");
  const [createContact, setCreateContact] = useState(false)
  const [setorDescription, setSetorDescription] = useState("")
  const [setorId, setSectorId] = useState(0)
  const [companyName, setcompanyName] = useState(0)
  const [createCompany, setCreateCompany] = useState(false)
  const [openToNewCompany, setOpenToNewCompany] = useState(false)

  const isSelected = (name) => (
    name === section
  )

  const changeNewContact = (key, e) => {
    setNewContact({
      ...newContact,
      [key]: e.target.value
    })
  }

  const inputRef = useRef<any>();

  useEffect(() => {

    if (inputRef.current) {
      const endOfField = newIndication.description.length;

      inputRef.current.setSelectionRange(endOfField, endOfField);
      inputRef.current.focus();
    }

  }, [newIndication])

  const changeNewIndication = (key, e) => {
    e.preventDefault()
    setNewIndication({
      ...newIndication,
      userId: user.id,
      [key]: e.target.value
    })
  }

  const changeNewCompany = (key, e) => {
    setNewCompany({
      ...newCompany,
      userId: user.id,
      [key]: e.target.value
    })
  }

  const getSectorDescription = (key, e) => {
    const sector = e.filter(item => item.sector_id == key)
    const setorId = sector[0].sector_id;

    setSetorDescription(sector[0].description)
    btnAddCompanyState(setorId)
    setSectorId(setorId)
  }

  const getCompanyName = (key) => {
    setcompanyName(key)
  }

  const { data: { data: dataCompanies } = {} } = useQuery(
    "companies", () => getCompanies()
  );

  const { data: { data: dataCompany } = {}, refetch: refetchCompany } = useQuery("company", () => getCompany(selectedCompany), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const { data: { data: dataCompanyIndication } = {}, refetch: refetchCompanyIndication } = useQuery("companyIndication", () => getCompanyIndication(setorId), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const { data: { data: dataContacts } = {}, refetch: refetchContacts } = useQuery("contacts", () => getCompanyContacts(selectedCompany), {
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

  const { refetch: refetchNewIndication } = useQuery("newcontacts", () => postIndication(selectedCompanyIndication, newIndication), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const { refetch: refetchNewCompany } = useQuery("newcompany", () => postCompany(newCompany), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const onRequestCompany = (e) => {
    setSelectedCompany(e.target.value)
  }

  const onRequestCompanyIndication = (e) => {
    setSelectedCompanyIndication(e.target.value)
  }

  const btnAddCompanyState = (e) => {
    if ((e == 3) || (e == 4) || (e == 5)) {
      setOpenToNewCompany(true)
    } else {
      setOpenToNewCompany(false)
    }
  }

  useEffect(() => {
    if (!selectedCompany) {
      return
    }

    refetchCompany()
    refetchContacts()
  }, [selectedCompany])

  useEffect(() => {
    if (!selectedCompanyIndication) {
      return
    }

    refetchCompanyIndication()
  }, [selectedCompanyIndication])

  const saveContact = async () => {
    await refetchNewContacts()
    refetchContacts()
    setCreateContact(false)
    clearContact()
  }

  const saveCompany = async () => {
    await refetchNewCompany()
    setCreateCompany(false)
    clearNewCompany()
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

  const clearNewCompany = () => {
    setNewCompany({
      name: "",
      document: "",
      address: "",
      userId: 0,
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
              <S.InputSelect onChange={(e) => {
                onRequestCompany(e);
                getCompanyName(e)
              }} value={selectedCompany}>
                <option selected={false} disabled value={null}>Nome da empresa</option>
                {dataCompanies.map(({ name, company_id }) => (
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
                <S.Input disabled value={dataCompany[0].address} />
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
            <S.ExcelExcelComponentItem style={{ fontWeight: '700', color: '#292d6e' }}> {item} </S.ExcelExcelComponentItem>
          ))}
        </S.ExcelComponentLine>

        {dataContacts?.length ? (
          dataContacts.map((item) => (
            <S.ExcelComponentLine style={{ display: 'flex' }}>
              <S.ExcelExcelComponentItem>{item.name || 'Não informado'}</S.ExcelExcelComponentItem>
              <S.ExcelExcelComponentItem>{item.function_service || 'Não informado'}</S.ExcelExcelComponentItem>
              <S.ExcelExcelComponentItem>{item.phone || 'Não informado'}</S.ExcelExcelComponentItem>
              <S.ExcelExcelComponentItem>{item.email || 'Não informado'}</S.ExcelExcelComponentItem>
            </S.ExcelComponentLine>
          ))
        ) : (
          <S.ExcelComponentLine style={{ display: 'flex' }}>
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
        <Text color="#292d6e" mx='8px' mb="24px" variant="h1">Preencha as informações da inscrição</Text>
        <>
          <Text color="#292d6e" mx='8px' mb="8px" variant="h3">Nome da categoria</Text>
          <S.IndicationContentSelects>
            <S.InputSelect name="Section" style={{ flex: 1 }} onChange={(e) => {
              getSectorDescription(e.target.value, dataSector);
              changeNewIndication('sectorId', e);
              onRequestCompanyIndication(e)
            }}
              value={newIndication.description}
            >
              <option selected={true} disabled value={null}>Escolha a categoria</option>
              {dataSector?.length && dataSector.map(({ name, sector_id }) => (
                <option value={sector_id}>{name}</option>
              ))}
            </S.InputSelect>
          </S.IndicationContentSelects>
        </>
        <>
          <Text color="#292d6e" mx='8px' mb="8px" variant="h3">Descrição da categoria</Text>
          <S.InputTextArea key="categoryDescription" rows="8" value={setorDescription} />
        </>
        <>
          <Text color="#292d6e" mx='8px' mb="8px" variant="h3">Nome da empresa</Text>
          <S.SelectEmpresas>
            <S.IndicationContentSelects>
              <S.InputSelect name="Company" style={{ flex: 1 }} onChange={onRequestCompanyIndication} value={selectedCompanyIndication}>
                {dataCompanyIndication?.length && dataCompanyIndication.map(({ name, company_id }) => (
                  <option value={company_id}>{name}</option>
                ))}
              </S.InputSelect>
            </S.IndicationContentSelects>
            <S.AddCompanyButton disabled={!openToNewCompany} onClick={() => setCreateCompany(true)}>+</S.AddCompanyButton>
          </S.SelectEmpresas>
        </>
        <>
          <Text key="incriptionDescription" color="#292d6e" mx='8px' mb="8px" variant="h3">Descrição da inscrição</Text>
          <S.InputTextArea
            ref={inputRef}
            rows="8"
            key="nameIndicationDescription"
            value={newIndication.description}
            onChange={(e) => changeNewIndication('description', e)}
          />
        </>
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
            <S.Input key="Nome" placeholder="Nome" value={newContact.name} onChange={(e) => changeNewContact('name', e)} />
            <S.Input placeholderkeyE-mail placeholder="E-mail" value={newContact.email} onChange={(e) => changeNewContact('email', e)} />
            <S.Input key="Setor" placeholder="Setor" value={newContact.function_service} onChange={(e) => changeNewContact('function_service', e)} />
            <S.Input key="Telefone" placeholder="Telefone" value={newContact.phone} onChange={(e) => changeNewContact('phone', e)} />
          </S.ContactContentInputs>
          <S.ContactContentButton onClick={saveContact}> Salvar contato</S.ContactContentButton>
        </S.ContactContent>
      </Modal>
    )
  }

  const modalNewCompany = () => {
    return (
      <Modal
        isOpen={createCompany}
        onRequestClose={() => setCreateCompany(false)}
        style={{
          overlay: {
            backgroundColor: `rgba(0,0,0,0.7)`
          },
        }}
        contentLabel="Example Modal"
      >
        <S.ContactContent>
          <Text color="#292d6e" mx='8px' mb="24px" variant="h1">Preencha as informações da empresa</Text>
          <S.ContactContentInputs>
            <S.Input key="nameCompany" placeholder="Nome" value={newCompany.name} onChange={(e) => changeNewCompany('name', e)} />
            <S.Input key="documentCompany" placeholder="Documento" value={newCompany.document} onChange={(e) => changeNewCompany('document', e)} />
            <S.Input key="addressCompany" placeholder="Endereço" value={newCompany.address} onChange={(e) => changeNewCompany('address', e)} />
          </S.ContactContentInputs>
          <S.ContactContentButton onClick={saveCompany}> Salvar Empresa</S.ContactContentButton>
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
        <S.LeftButton isSelected={isSelected('Indications')} onClick={() => setSection('Indications')}> Inscrição </S.LeftButton>
        <S.LeftButton isSelected={isSelected('Votations')} onClick={() => setSection('Votations')}> Votação </S.LeftButton>
      </S.Left>
      <RightContent />
      {modalContent()}
      {modalNewCompany()}
    </S.Content>
  )
}
