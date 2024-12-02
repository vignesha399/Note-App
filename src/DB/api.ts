import { get, post } from "./index.ts";


export const loginUser = async (email: string, password: string): Promise<any> => {

  return await post('login',{email, password});
};
export const registration = async (name:string, email: string, password: string, dob: Date, bio: string) => {

  return await post('registration',{name, email, password, dob, bio});
};
export const forgotPassword = async (email: string, password: string) => {

  return await post('forgotPassword',{email, password});
};
export const base = async () => {

  return await get('base/base');
};
export const timeline = async () => {

  return await get('base/base');
};