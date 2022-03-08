import { API } from './API';
export const getCompanies = async (): Promise<any> => {
  try {
    return await API.get('/company');
  } catch (error) {
    console.log('Error no request de companies');
  }
};

export const getCompany = async ( company_id ): Promise<any> => {
  console.log("cara", company_id)
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

export const postCompanyContacts = async ( companyId, contact ): Promise<any> => {
  try {
    return await API.post(`/company/${companyId}/contacts`, {...contact, companyId: Number(companyId)} );
  } catch (error) {
    alert("Infelizmente não foi possível registrar o contato, tente novamente!.")
  }
};