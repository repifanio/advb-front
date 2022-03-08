import { API } from './API';

export const postIndication = async ( companyId, indication ): Promise<any> => {
  try {
    const data = await API.post(`/indication/company/${companyId}`, indication );
    alert("Indicação criada com sucesso")

    return data;
  } catch (error) {
    alert("Infelizmente não foi possível registrar a indicação, tente novamente!.")
  }
};