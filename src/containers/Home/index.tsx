import { useQuery } from 'react-query';
import {
  getCompanies, getCompany, getCompanyIndication,
  getCompanyContacts, getSector, postCompanyContacts,
  postIndication, postCompany, getCompanyToVote, postVote, verifyVoteOfUser,
  getIndications, editIndicationCall, editIndicationStatusCall
} from '~/utils';
import Modal from 'react-modal';
import { useUser } from '~/context'
import { useEffect, useState, useRef } from 'react'
import { Text } from "~/components";
import S from "./styles";

export default function Home(props: any) {

  /* #region  UseStates */
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    function_service: "",
    phone: "",
  })
  const [newCompany, setNewCompany] = useState({
    name: "",
    document: "",
    address: "",
    userId: 0,
    contact: "",
    email: "",
    phone: "",
    function: ""
  })
  const [editIndicationBody, setEditIndicationBody] = useState({
    id: "",
    description: "",
  })
  const [openToVote, setopenToVote] = useState(true)
  const [sectorId, setSectorId] = useState(0)
  const [sectorIdToVote, setSectorIdToVote] = useState(0)
  const [sectorDescription, setSectorDescription] = useState("")
  const [indicatedDescription, setIndicatedDescription] = useState("")
  const [companyFilteredToIndication, setCompanyFilteredToIndication] = useState([{
    value: "",
    label: ""
  }])
  const [companyFilteredToVote, setCompanyFilteredToVote] = useState([{
    value: "",
    label: ""
  }])
  const [indicateDescription, setindicateDescription] = useState("")
  const [statusIndication, setStatusIndication] = useState("")
  const [selectedCompany, setSelectedCompany] = useState(undefined)
  const [selectedCompanyIndication, setSelectedCompanyIndication] = useState(undefined)
  const [selectedCompanyVote, setSelectedCompanyVote] = useState(0)
  const [note, setNote] = useState(5)
  const { user } = useUser()
  const [section, setSection] = useState("Indications");
  const [createContact, setCreateContact] = useState(false)
  const [createCompany, setCreateCompany] = useState(false)
  const [openToNewCompany, setOpenToNewCompany] = useState(false)
  const [companyName, setcompanyName] = useState(0)
  const [focusTextAreaIndication, setFocusTextAreaIndication] = useState(0)
  const [editIndication, setEditIndication] = useState(false)
  const [idInidicationToEdit, setIdInidicationToEdit] = useState(0)
  /* #endregion */

  /* #region  Calls to back */
  const { data: { data: dataCompany } = {}, refetch: refetchCompany } = useQuery("companyssssss", () => getCompany(selectedCompany), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const { data: { data: dataCompanyIndication } = {}, refetch: refetchCompanyIndication } = useQuery("companyIndication", async () => await getCompanyIndication(sectorId), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const { data: { data: dataCompanyToVote } = {}, refetch: refetchCompanyToVote } = useQuery("companyToVote", async () => await getCompanyToVote(sectorIdToVote), {
    refetchOnWindowFocus: true,
    enabled: true,
  });


  const { data: { data: dataSector } = {} } = useQuery(
    "sectors",
    getSector
  );

  const { refetch: refetchNewIndication } = useQuery("newindication", () => postIndication(selectedCompanyIndication, newIndication), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const { refetch: refetchNewVote } = useQuery("newVote", () => postVote(newVote), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const { data: { data: dataCompanies } = {} } = useQuery(
    "companies", () => getCompanies()
  );

  const { data: { data: dataContacts } = {}, refetch: refetchContacts } = useQuery("contacts", () => getCompanyContacts(selectedCompany), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const { data: { data: dataIndications } = {} } = useQuery(
    "allIndications", () => getIndications()
  );

  const { refetch: refetchNewContacts } = useQuery("newcontacts", () => postCompanyContacts(selectedCompany, newContact), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const { refetch: refetchNewCompany } = useQuery("newcompany", () => postCompany(newCompany), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const { refetch: refetchEditIndication } = useQuery("editIndication", () => editIndicationCall({id: idInidicationToEdit, description: indicateDescription}), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const { refetch: refetchEditIndicationStatus } = useQuery("editIndicationStatus", () => editIndicationStatusCall({id: changeStatus.id, status: changeStatus.status}), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const { refetch: refetchVoteOfUser } = useQuery("verifyVoteOfUser", async () => await verifyVoteOfUser(companyToVoteVar, sectorIdToVote), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  /* #endregion */

  /* #region  Functions and logics */
  const isSelected = (name) => (
    name === section
  )

  const companyToIndicateOptions = []
  const companyToVoteOptions = []
  let newIndication = {}
  let newVote = {}
  let companyToVoteVar = 0
  let changeStatus:any = {}
  const inputRef = useRef<any>();

  const changeNewContact = (key, e) => {
    setNewContact({
      ...newContact,
      [key]: e.target.value
    })
  }

  const getSectorDescription = async (e) => {
    const sector = dataSector.filter(sector => sector.sector_id == e.target.value)

    setSectorDescription(sector[0].description)
    setSectorId(sector[0].sector_id)
  }

  const getSectorDescriptionToVote = async (e) => {
    const sector = dataSector.filter(sector => sector.sector_id == e.target.value)
    setSectorIdToVote(sector[0].sector_id)
  }

  const selectCompanyToIndicate = (option) => {
    setSelectedCompanyIndication(option.value)
  }

  const selectCompanyToVote = async (option) => {
    setSelectedCompanyVote(option.value)

    const indicationDescription = dataCompanyToVote.filter(indicates => indicates.companyId == option.value)
    setIndicatedDescription(indicationDescription[0].description)
    companyToVoteVar = option.value

 
    const verifyIfVotedBefore = await refetchVoteOfUser()
    setopenToVote(verifyIfVotedBefore.data.data.data === null ? true : false)
  }

  const includeDescription = ((e) => {
    setFocusTextAreaIndication(e.target.selectionStart)
    setindicateDescription(e.target.value)
  })

  const saveIndication = async () => {
    newIndication = {
      description: indicateDescription,
      sectorId: sectorId,
      userId: user.id,
    }

    refetchNewIndication()
    clearIndication()
  }

  const saveVote = async () => {
    newVote = {
      companyId: selectedCompanyVote,
      sectorId: sectorIdToVote,
      note: note
    }

    refetchNewVote()
    setopenToVote(false)
    clearIndication()
  }

  const clearIndication = () => {
    newIndication = {
      userId: 0,
      description: "",
      sectorId: undefined
    }

    setindicateDescription("")
    setSelectedCompanyIndication(0)
  }

  const saveCompany = async () => {
    await refetchNewCompany()
    setCreateCompany(false)
    await refetchCompanyIndication()
    searchNewCompany()
  }

  const editIndicationDescription = async () => {
    await refetchEditIndication()
  }

  const editIndicationStatus = async () => {
    await refetchEditIndicationStatus()
  }


  const searchNewCompany = () => {

    companyFilteredToIndication.map(c => console.log(c.label))

    const company = companyFilteredToIndication.find(company => company.label == newCompany.name)
    setSelectedCompanyIndication(company.value)
  }


  const companiesToVote = () => {
    const company = companyFilteredToIndication.find(company => company.label == newCompany.name)
    setSelectedCompanyIndication(company.value)
  }

  const changeNewCompany = (key, e) => {
    setNewCompany({
      ...newCompany,
      userId: user.id,
      [key]: e.target.value
    })
  }

  const onRequestCompany = (e) => {
    setSelectedCompany(e.target.value)
  }

  const btnAddCompanyState = (e) => {
    if ((e == 3) || (e == 4) || (e == 5)) {
      setOpenToNewCompany(true)
    } else {
      setOpenToNewCompany(false)
    }
  }

  const saveContact = async () => {
    await refetchNewContacts()
    refetchContacts()
    setCreateContact(false)
    clearContact()
  }

  const sendDescriptionToEdit = async (description, idIndication) => {
    setEditIndication(true)
    setIdInidicationToEdit(idIndication)
    setindicateDescription(description)
  }

  const alterStatusToIndication = async (status, idIndication) => {
    changeStatus = {
      id: idIndication,
      status,
    }
    editIndicationStatus()
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

  const getCompanyName = (key) => {
    setcompanyName(key)
  }

  const getToSetNote = (e) => {
    setNote(e.target.value)
  }

  /* #endregion */

  /* #region  UseEfects */
  useEffect(() => {
    refetchCompanyIndication()
    btnAddCompanyState(sectorId)
    setSelectedCompanyIndication(0)
  }, [sectorId])

  useEffect(() => {
    refetchCompanyToVote()
  }, [sectorIdToVote])

  useEffect(() => {
    if (!dataCompanyIndication) return

    dataCompanyIndication.map(company => {
      companyToIndicateOptions.push({
        value: company.company_id,
        label: company.name
      })

      setCompanyFilteredToIndication(companyToIndicateOptions)
    })

  }, [dataCompanyIndication])

  useEffect(() => {
    if (!dataCompanyToVote) return

    dataCompanyToVote.map(company => {
      companyToVoteOptions.push({
        value: company.companyId,
        label: company.name
      })

      setCompanyFilteredToVote(companyToVoteOptions)
    })

  }, [dataCompanyToVote])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setSelectionRange(focusTextAreaIndication, focusTextAreaIndication);
      inputRef.current.focus();
      inputRef.current.selectionEnd = focusTextAreaIndication
    }
  }, [indicateDescription])
  /* #endregion */



  /* #region  Xhtml */
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
        <Text color="#292d6e" mx='8px' mb="24px" variant="h1">Preencha a sua indicação</Text>

        <Text color="#292d6e" mx='8px' mb="8px" variant="h3">Nome da categoria</Text>
        <S.IndicationContentSelects>

          <S.InputSelect name="Section" style={{ flex: 1 }} onChange={(e) => getSectorDescription(e)} value={sectorId} >
            {dataSector?.length && dataSector.map(({ name, sector_id }) => (
              <option value={sector_id}>{name}</option>
            ))}
          </S.InputSelect>

        </S.IndicationContentSelects>
        <Text color="#292d6e" mx='8px' mb="8px" variant="h3">Descrição da categoria</Text>
        <S.InputTextArea key="categoryDescription" value={sectorDescription}  rows="3"  />

       


        <Text color="#292d6e" mx='8px' mb="8px" variant="h3">Nome da empresa</Text>
        <S.SelectEmpresas>
          <S.IndicationContentSelects>

            <S.ReactSelectElement
              multi={true}
              classNamePrefix="Select"
              options={companyFilteredToIndication}
              onChange={(e) => selectCompanyToIndicate(e)}
              defaultValue={
                selectedCompanyIndication === 0 ? {value: "0", label: "Escolha ou insira"} : companyFilteredToIndication.find(company => company.value == String(selectedCompanyIndication))
              }
            />

            <S.AddCompanyButton  onClick={() => setCreateCompany(true)}>+</S.AddCompanyButton>

          </S.IndicationContentSelects>
        </S.SelectEmpresas>
        <>
          <Text key="incriptionDescription" color="#292d6e" mx='8px' mb="8px" variant="h3">Descrição da inscrição</Text>
          <S.InputTextArea
            ref={inputRef}
            rows="8"
            key="nameIndicationDescription"
            value={indicateDescription}
            onChange={(e) => includeDescription(e)}
          />
        </>
        <S.IndicationContentButton onClick={saveIndication}> Salvar indicação</S.IndicationContentButton>
      </S.IndicationContent>
    )
  }

  const VotationContent = () => {
    return (
      <S.VotationContent>
        <Text color="#292d6e" mx='8px' mb="24px" variant="h1">Indicações realizadas</Text>

        <Text color="#292d6e" mx='8px' mb="8px" variant="h3">Nome da categoria</Text>
        <S.IndicationContentSelects>
          <S.InputSelect name="Section" style={{ flex: 1 }} onChange={(e) => getSectorDescriptionToVote(e)} value={sectorIdToVote} >
            {dataSector?.length && dataSector.map(({ name, sector_id }) => (
              <option value={sector_id}>{name}</option>
            ))}
          </S.InputSelect>
        </S.IndicationContentSelects>

        <Text color="#292d6e" mx='8px' mb="8px" variant="h3">Nome da empresa</Text>
        <S.SelectEmpresas>
          <S.IndicationContentSelects>
            <S.ReactSelectElementVotation
              multi={true}
              classNamePrefix="Select"
              options={companyFilteredToVote} 
              defaultValue={
                selectedCompanyVote === 0 ? 0 : companyFilteredToVote.find(company => company.value == String(selectedCompanyVote))
              }
              onChange={(e) => selectCompanyToVote(e)}
            />
          </S.IndicationContentSelects>
        </S.SelectEmpresas>

        <Text key="incriptionDescription" color="#292d6e" mx='8px' mb="8px" variant="h3">Descrição da inscrição</Text>
        <S.InputTextArea key="categoryDescription" rows="8" value={indicatedDescription} />
        
        <Text key="incriptionDescription" color="#292d6e" mx='8px' mb="8px" variant="h3">Nota para a empresa</Text>
        <S.RadioArea>
          <S.RadioItem type="radio" value="1" name="noteValue" onChange={(e) => {getToSetNote(e)}} checked={1 == note ? true : false}/> 1
          <S.RadioItem type="radio" value="2" name="noteValue" onChange={(e) => {getToSetNote(e)}} checked={2 == note ? true : false} /> 2
          <S.RadioItem type="radio" value="3" name="noteValue" onChange={(e) => {getToSetNote(e)}} checked={3 == note ? true : false}/> 3
          <S.RadioItem type="radio" value="4" name="noteValue" onChange={(e) => {getToSetNote(e)}} checked={4 == note ? true : false}/> 4
          <S.RadioItem type="radio" value="5" name="noteValue" onChange={(e) => {getToSetNote(e)}} checked={5 == note ? true : false}/> 5
          <S.RadioItem type="radio" value="6" name="noteValue" onChange={(e) => {getToSetNote(e)}} checked={6 == note ? true : false}/> 6
          <S.RadioItem type="radio" value="7" name="noteValue" onChange={(e) => {getToSetNote(e)}} checked={7 == note ? true : false}/> 7
          <S.RadioItem type="radio" value="8" name="noteValue" onChange={(e) => {getToSetNote(e)}} checked={8 == note ? true : false}/> 8
          <S.RadioItem type="radio" value="9" name="noteValue" onChange={(e) => {getToSetNote(e)}} checked={9 == note ? true : false}/> 9
          <S.RadioItem type="radio" value="10" name="noteValue" onChange={(e) => {getToSetNote(e)}} checked={10 == note ? true : false}/> 10
        </S.RadioArea>
        
        <S.IndicationContentButton disabled={!openToVote} onClick={saveVote}> Salvar voto</S.IndicationContentButton>



      </S.VotationContent>
    )
  }

  const MeIndicationsContent = () => {
    return (
      <S.VotationContent>
        <Text color="#292d6e" mx='8px' mb="24px" variant="h1">Minhas inscrições</Text>
        <ExcelComponentMeIndications />
        {/* <Text color="#292d6e" mx='8px' mb="8px" variant="h3">Nome da categoria</Text>
        <S.IndicationContentSelects>
          <S.InputSelect name="Section" style={{ flex: 1 }} onChange={(e) => getSectorDescriptionToVote(e)} value={sectorIdToVote} >
            {dataSector?.length && dataSector.map(({ name, sector_id }) => (
              <option value={sector_id}>{name}</option>
            ))}
          </S.InputSelect>
        </S.IndicationContentSelects>

        <Text color="#292d6e" mx='8px' mb="8px" variant="h3">Nome da empresa</Text>
        <S.SelectEmpresas>
          <S.IndicationContentSelects>
            <S.ReactSelectElementVotation
              multi={true}
              classNamePrefix="Select"
              options={companyFilteredToVote} 
              defaultValue={
                selectedCompanyVote === 0 ? 0 : companyFilteredToVote.find(company => company.value == String(selectedCompanyVote))
              }
              onChange={(e) => selectCompanyToVote(e)}
            />
          </S.IndicationContentSelects>
        </S.SelectEmpresas>

        <Text key="incriptionDescription" color="#292d6e" mx='8px' mb="8px" variant="h3">Descrição da inscrição</Text>
        <S.InputTextArea key="categoryDescription" rows="8" value={indicatedDescription} />
        
        <Text key="incriptionDescription" color="#292d6e" mx='8px' mb="8px" variant="h3">Nota para a empresa</Text>
        <S.RadioArea>
          <S.RadioItem type="radio" value="1" name="noteValue" onChange={(e) => {getToSetNote(e)}} checked={1 == note ? true : false}/> 1
          <S.RadioItem type="radio" value="2" name="noteValue" onChange={(e) => {getToSetNote(e)}} checked={2 == note ? true : false} /> 2
          <S.RadioItem type="radio" value="3" name="noteValue" onChange={(e) => {getToSetNote(e)}} checked={3 == note ? true : false}/> 3
          <S.RadioItem type="radio" value="4" name="noteValue" onChange={(e) => {getToSetNote(e)}} checked={4 == note ? true : false}/> 4
          <S.RadioItem type="radio" value="5" name="noteValue" onChange={(e) => {getToSetNote(e)}} checked={5 == note ? true : false}/> 5
          <S.RadioItem type="radio" value="6" name="noteValue" onChange={(e) => {getToSetNote(e)}} checked={6 == note ? true : false}/> 6
          <S.RadioItem type="radio" value="7" name="noteValue" onChange={(e) => {getToSetNote(e)}} checked={7 == note ? true : false}/> 7
          <S.RadioItem type="radio" value="8" name="noteValue" onChange={(e) => {getToSetNote(e)}} checked={8 == note ? true : false}/> 8
          <S.RadioItem type="radio" value="9" name="noteValue" onChange={(e) => {getToSetNote(e)}} checked={9 == note ? true : false}/> 9
          <S.RadioItem type="radio" value="10" name="noteValue" onChange={(e) => {getToSetNote(e)}} checked={10 == note ? true : false}/> 10
        </S.RadioArea>
        
        <S.IndicationContentButton disabled={!openToVote} onClick={saveVote}> Salvar voto</S.IndicationContentButton> */}



      </S.VotationContent>
    )
  }

  const ExcelComponentMeIndications = () => {
    return (
      <S.ExcelComponent>
        <S.ExcelComponentLine>
          <S.ExcelExcelComponentItem style={{ fontWeight: '700', color: '#292d6e' }}> Setor </S.ExcelExcelComponentItem>
          <S.ExcelExcelComponentItem style={{ fontWeight: '700', color: '#292d6e' }}> Empresa </S.ExcelExcelComponentItem>
          <S.ExcelExcelComponentItem style={{ fontWeight: '700', color: '#292d6e' }}> Justificava </S.ExcelExcelComponentItem>
          <S.ExcelExcelComponentItemStatus style={{ fontWeight: '700', color: '#292d6e' }}> Status </S.ExcelExcelComponentItemStatus>
          <S.ExcelExcelComponentItem style={{ fontWeight: '700', color: '#292d6e' }}> Ações </S.ExcelExcelComponentItem>
        </S.ExcelComponentLine>

        {dataIndications?.length ? (
          dataIndications.map((item) => (
            <S.ExcelComponentLine style={{ display: 'flex' }}>
              <S.ExcelExcelComponentItem>{item.sector || 'Não informado'}</S.ExcelExcelComponentItem>
              <S.ExcelExcelComponentItem>{item.company || 'Não informado'}</S.ExcelExcelComponentItem>
              <S.ExcelExcelComponentItem>{item.description || 'Não informado'}</S.ExcelExcelComponentItem>
              <S.ExcelExcelComponentItemStatus>{item.status === null ? 'null' : item.status }</S.ExcelExcelComponentItemStatus>
              <S.ExcelExcelComponentItem>{
              <>
                <S.EmployerContentButtonAction onClick={() => sendDescriptionToEdit(item.description, item.id)}> Editar </S.EmployerContentButtonAction>
                <S.EmployerContentButtonActionGreen onClick={() => alterStatusToIndication('Aprovada', item.id)}> Aprovar </S.EmployerContentButtonActionGreen>
                <S.EmployerContentButtonActionRed onClick={() => alterStatusToIndication('Excluída', item.id)}> Excluir </S.EmployerContentButtonActionRed>
              </>
            }</S.ExcelExcelComponentItem> 
            </S.ExcelComponentLine>
          ))
        ) : (
          <S.ExcelComponentLine style={{ display: 'flex' }}>
            <S.ExcelExcelComponentItem>Não informado</S.ExcelExcelComponentItem>
            <S.ExcelExcelComponentItem>Não informado</S.ExcelExcelComponentItem>
            <S.ExcelExcelComponentItem>Não informado</S.ExcelExcelComponentItem>
            <S.ExcelExcelComponentItemStatus>Indefinido</S.ExcelExcelComponentItemStatus>
            <S.ExcelExcelComponentItem>{
              <>
                <S.EmployerContentButtonAction> Editar </S.EmployerContentButtonAction>
                <S.EmployerContentButtonAction> Aprovar </S.EmployerContentButtonAction>
                <S.EmployerContentButtonAction> Excluir </S.EmployerContentButtonAction>
              </>
            }</S.ExcelExcelComponentItem> 
          </S.ExcelComponentLine>
        )}
      </S.ExcelComponent>
    )
  }

  const RightContent = () => {
    const content = {
      Employers: EmployerContent,
      Indications: IndicationContent,
      Votations: VotationContent,
      MeIndications:  MeIndicationsContent,
    }

    const RenderContent = content[section]

    return (
      <S.Right>
        <S.HeaderContent>
          <S.Logo></S.Logo>
        </S.HeaderContent>
        {/* <Text textAlign="center" color="#292d6e" variant="h1">50º Prêmio Exportação RS</Text> */}
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
            backgroundColor: `rgba(0,0,0,0.7)`,
            width: `70%`,
            height: '80%',
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          },
          
        }}
        contentLabel="Example Modal"
      >
        <S.ContactContent>
          <Text color="#292d6e" mx='8px' mb="24px" variant="h1">Preencha as informações da empresa</Text>
          <S.ContactContentInputs>
            <S.Input key="nameCompany" placeholder="Nome" value={newCompany.name} onChange={(e) => changeNewCompany('name', e)} />
            <S.Input key="documentCompany" placeholder="CNPJ" value={newCompany.document} onChange={(e) => changeNewCompany('document', e)} />
            <S.Input key="addressCompany" placeholder="C" value={newCompany.address} onChange={(e) => changeNewCompany('address', e)} />
            <S.Input key="contactCompany" placeholder="Nome do Contato" value={newCompany.contact} onChange={(e) => changeNewCompany('contact', e)} />
            <S.Input key="emailCompany" placeholder="Email do Contato" value={newCompany.email} onChange={(e) => changeNewCompany('email', e)} />
            <S.Input key="phoneCompany" placeholder="Telefone do Contato" value={newCompany.phone} onChange={(e) => changeNewCompany('phone', e)} />
            <S.Input key="functionCompany" placeholder="Cargo do Contato" value={newCompany.function} onChange={(e) => changeNewCompany('function', e)} />
          </S.ContactContentInputs>
          <S.ContactContentButton onClick={saveCompany}> Salvar Empresa</S.ContactContentButton>
        </S.ContactContent>
      </Modal>
    )
  }

  const modalEditIntication = () => {
    return (
      <Modal
        isOpen={editIndication}
        onRequestClose={() => setEditIndication(false)}
        style={{
          overlay: {
            backgroundColor: `rgba(0,0,0,0.7)`
          },
        }}
        contentLabel="Example Modal"
      >
        <>
          <S.ContactContent>
            <Text key="incriptionDescription" color="#292d6e" mx='8px' mb="8px" variant="h3">Descrição da inscrição</Text>
            <S.ContactContentInputs>
              <S.InputTextAreaEdit
                ref={inputRef}
                rows="8"
                key="nameIndicationDescription"
                value={indicateDescription}
                onChange={(e) => includeDescription(e)}
              />
            </S.ContactContentInputs>
            <S.ContactContentButton onClick={editIndicationDescription}> Editar Indicação</S.ContactContentButton>
          </S.ContactContent>
        </>
      </Modal>
    )
  }

  /* #endregion */


  return (
    <>
      <S.Content>
        <S.Left>
          {/* <S.LeftButton isSelected={isSelected('Employers')} onClick={() => setSection('Employers')}> Empresas </S.LeftButton> */}
          <S.LeftButton isSelected={isSelected('Indications')} onClick={() => setSection('Indications')}> Inscrição </S.LeftButton>
          {/* <S.LeftButton isSelected={isSelected('Votations')} onClick={() => setSection('Votations')}> Votação </S.LeftButton> */}
          <S.LeftButton isSelected={isSelected('MeIndications')} onClick={() => setSection('MeIndications')}> Minhas Inscrições </S.LeftButton>
        </S.Left>
        <RightContent />
        {modalContent()}
        {modalNewCompany()}
        {modalEditIntication()}
      </S.Content>
    </>
  )
}
