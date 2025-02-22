import { baseContentData } from "../../components/home";



export function setReference () {
  
  if(baseContentData.id){
    localStorage.setItem('referenceID', baseContentData.id);
  }else {
    window.location.reload()
  }

}
export function getReference () {
  
  const refID =  localStorage.getItem('referenceID');
  if(refID){
    return refID;
  }else {
    setReference()
    return localStorage.getItem('referenceID');
  }

}


