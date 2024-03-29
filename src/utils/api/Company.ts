import { API } from './API';
export const getCompanies = async (): Promise<any> => {
  try {
    return await API.get('/company');
  } catch (error) {
    console.log('Error no request de companies');
  }
};

export const  getCompanyIndication = async (setor_id): Promise<any> => {
  try {
    return await API.get(`/company/companyIndication/${setor_id}`);
  } catch (error) {
    console.log('Error no request de companies');
  }
};

export const getCompanyToVote = async (setor_id): Promise<any> => {
  try {
    return await API.get(`/votation/${setor_id}`);
  } catch (error) {
    console.log('Error no request de companies');
  }
};

export const getCompany = async ( company_id ): Promise<any> => {
  try {
    return await API.get(`/company/${company_id}`);
  } catch (error) {
    console.log('Error no request de company');
  }
};

export const getCompanyContacts = async ( company_id ): Promise<any> => {
  console.log("cara", company_id)
  try {
    return await API.get(`/company/${company_id}/contacts`);
  } catch (error) {
    console.log('Error no request de company');
  }
};

export const getIndications = async (): Promise<any> => {
  try {
    return await API.get(`/indication`);
  } catch (error) {
    console.log('Error no request de company');
  }
};

export const postCompanyContacts = async ( companyId, contact ): Promise<any> => {
  try {
    const data =  await API.post(`/company/${companyId}/contacts`, {...contact, companyId: Number(companyId)} );    
    alert("Contato criado com sucesso")
    return data;
  } catch (error) {
    alert("Infelizmente não foi possível registrar o contato, tente novamente!.")
  }
};

export const postCompany = async ( company ): Promise<any> => {
  try {
    const data = await API.post(`/company/`, company );
    alert("Empresa adicionada com sucesso!")

    return data;
  } catch (error) {
    alert("Infelizmente não foi possível registrar a empresa, verifique se ela já não consta na lista.")
  }
};

export const verifyVoteOfUser = async ( company_id, setorId ): Promise<any> => {
  try {
    const existVote = await API.post(`/votation/validate`, {data: {companyId: company_id, setorId: setorId}});
    if (existVote.data.data !== null) alert("Você já votou nessa empresa")

    return existVote;

  } catch (error) {
    console.log('Error no request de company');
  }
};