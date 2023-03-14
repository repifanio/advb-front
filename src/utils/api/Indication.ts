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

export const editIndicationCall = async ( indication ): Promise<any> => {
  try {
    const data = await API.put(`/indication/${indication.id}`, {description: indication.description} );
    alert("Indicação editada com sucesso")

    return data;
  } catch (error) {
    alert("Infelizmente não foi possível registrar a edição, tente novamente!.")
  }
};

export const editIndicationStatusCall = async ( indication ): Promise<any> => {

  console.log('indication', indication)

  try {
    const data = await API.put(`indication/status/${indication.id}`, {status: indication.status} );
    alert("Indicação editada com sucesso")

    return data;
  } catch (error) {
    alert("Infelizmente não foi possível registrar a edição, tente novamente!.")
  }
};