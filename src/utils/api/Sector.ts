import { API } from './API';
export const getSector = async (): Promise<any> => {
  try {
    return await API.get('/sector');
  } catch (error) {
    console.log('Error no request de companies');
  }
};