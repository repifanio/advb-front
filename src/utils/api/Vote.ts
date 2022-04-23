import { API } from './API';

export const postVote = async (vote): Promise<any> => {
  try {
    const data = await API.post(`/votation`, vote );
    alert("Voto criado com sucesso!")

    return data;
  } catch (error) {
    alert("Infelizmente não foi possível registrar o voto, tente novamente!.")
  }
};