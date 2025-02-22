import { ClickAwayListener } from "@mui/material";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { clicked, updateContentTabName } from "../../store/createSlice.ts";
import { TClicked } from "./fields.d";
import {PageDevelopment as Home} from "../../temp/home.tsx";
import {ArrowDropDown} from '@mui/icons-material';



export function DropdownFrame(props: TClicked) {
  const runtimeHeader = useSelector((state: any) => state.runtimeHeaders);
  const dispatch = useDispatch();

  const visible = runtimeHeader[props.section.title]?.isClicked ? 'block': 'hidden';
  
  return(
        <div>
          {props.section.children? props.section.children.map((e: any)=> {
            return (<div className={`absolute border rounded-md bg-slate-50 z-10 select-none ${visible}`} key={e}>
            {e.children.map((ele: any) => {
              return <p key={ele.title} className={`pt-2 pb-2 px-3 hover:bg-gray-300 select-none`} ><a href="#">{ele.title}</a></p>
            })}
          </div>)
          }): ''}
      </div>
  )
}
function typesProps(){

}

function InputProps() {

  return(<>

  </>)
}

type TReactArray = {
  [key: string]: React.ReactElement;
}
export function CollapseFrame(props: any) {
  
  const array: TReactArray[] = [{'home':<Home />}];
  const dispatch = useDispatch();
  const {child} = props;
  const [parentName, setParentName] = useState('');
  const renderChild = (head: any) => {
    if(parentName !== head.target.innerText){
      dispatch(updateContentTabName(head.target.innerText));
      setParentName(head.target.innerText);
    }
    else setParentName('')
  }
  return (<>
    {child.map((element: any, i: number)=>{
      return (<>
        {(element.title)
          ?<h2 key={element.title} className={`cursor-pointer p-2`}><span onClick={(e) => renderChild(e)} key={element.title}>{element.title}</span>{element.children? <ArrowDropDown key={i} /> : ''}</h2> 
          :<div className={`p-2`} key={i}>{element.list.map((e:any) => <h2 key={e} className={`p-2 rounded hover:bg-blue-100`}>{e}</h2>)}</div>
        }

        {element.children && parentName === element.title && <div className="indent-2" key={element.title}><CollapseFrame child={element.children} key={element}/></div>}
      </>)
      
    })}
  </>)
}

