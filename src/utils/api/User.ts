import { API } from './API';
export const login = async ({ email, password}): Promise<any> => {
  try {
    return await API.post('/user/login', { email, password });
  } catch (error) {
    alert("Login ou senha incorretos, por favor tente novamente.")
  }
};