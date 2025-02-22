import axios, { AxiosResponse } from "axios";


type body = {
  email: string, 
  password: string, 
  name?: string, 
  dob?: Date,
  bio?: string
} | {[key:string ]: string} | {[key:string ]: string}[]
const baseURL = 'https://backendvih.netlify.app/.netlify/functions/';
const token = document.cookie.split('=')[1];
const base = async (url='', method='', headers?:{}, body?: body, param?:{}) => {
  
  // if  (document.cookie.split('=')[0] === 'session_token' && document.cookie.split('=')[1] === '') {
  //   window.location.assign('/login')
  // } else {
  //   window.location.assign('/')
  // }
  return await axios.request({
    // url: 'http://localhost:8888/.netlify/functions/' + url,
    url: baseURL+url,
    params: param,
    method: method,
    headers: {...headers, 'Content-Type': 'application/json', 'Cookie': token},
    data: body,
    withCredentials: true
  })
  
  // return await axios.post('https://backendvih.netlify.app/.netlify/functions/login', body)
}

export const get = async (url: string, param?: {}) => await base(url, 'GET', {}, {}, param);
export const post = async (url: string, body:body, headers?:{}) => await base(url, 'POST', headers, body);
export const patch = async (url: string, body:body) => await base(url, 'PATCH', {}, body);
export const deleteMethod = async (url: string, body: body, param={}, headers={}) => await base(url, 'delete', headers, body, param,);
