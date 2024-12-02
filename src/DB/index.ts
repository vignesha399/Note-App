import axios from "axios";
import { useSelector } from "react-redux";

const token = document.cookie.split('=')[1];
console.log(token);

type body = {
  email: string, 
  password: string, 
  name?: string, 
  dob?: Date,
  bio?: string
}
const baseURL = 'https://backendvih.netlify.app/.netlify/functions/';
const base = async (url='', method='', headers?:{}, body?: body, param?:{}) => {
  // url = baseURL+url;
  console.log(body, url, method, param);
  // const form = new FormData();
  // form.append('email', body!.email);
  // form.append('password', body!.password);
  // form.append('name', body!.name!);
  // form.append('dob', body!.dob!.toDateString());
  // form.append('bio', body!.bio!);
  // if(document.cookie.)
  
  // if  (document.cookie.split('=')[0] === 'session_token' && document.cookie.split('=')[1] === '') {
  //   window.location.assign('/login')
  // } else {
  //   window.location.assign('/')
  // }
  
  const host = await axios.request({
    url: 'http://localhost:8888/.netlify/functions/'+url,
    // url: baseURL+url,
    params: param,
    method: method,
    headers: {...headers},
    data: body,
    withCredentials: true
  })
  
  return host; 
  // return await axios.post('https://backendvih.netlify.app/.netlify/functions/login', body)
}

export const get = async (url: string) => await base(url, 'GET');
export const post = async (url: string, body:body, headers?:{}) => await base(url, 'POST', headers, body);
export const patch = async (url: string, body:{email: string, password: string}) => await base(url, 'PATCH', {}, body);
export const deleteMethod = async (url: string, method={}, body: {email: string, password: string}, param={}) => await base(url, 'delete', method, body, param);
