import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { apps, dashboard, filters, getBase, plans, projects, teams, updateContentTabName } from "../store/createSlice.ts";
import { Button, FormControl, Input, InputLabel, MenuItem, Select, Skeleton, Stack } from '@mui/material';
import { Headers } from "./home/header.tsx";
import { CollapseFrame, DropdownFrame } from "./fields/fields.tsx";
import { Timeline } from "./contents/timeline.tsx";
import { Yourwork } from "./contents/yourwork.tsx";
import { ContentPage, CreateWork } from "./contents/create.tsx";
import { Error401 } from "../errors/error401.tsx";

function CardSkeliton() {
  return (<div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-blue-400 h-12 w-12"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-blue-400 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-blue-400 rounded"></div>
          <div className="h-4 bg-blue-400 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  </div>)
}

type TReactArray = {
  [key: string]: React.ReactElement;
}
export function Home() {
  const baseData = useSelector((state: any) => state.baseReducer);
  const clickedTabName = useSelector((state: any) => state.common.contentTabName);
  const runtimeHeader = useSelector((state: any) => state.runtimeHeaders);
  const dispatch = useDispatch<any>();
  const componentArray:TReactArray = {'timeline':<Timeline />, 'your work':<Yourwork />, 'create': <CreateWork/>}
  const baseContent = baseData.data[0] && baseData.data[0].content? baseData.data[0].content[0]: baseData.data[0]
  const dispatcher = () => {
    dispatch(getBase());
  }
  const headerDispatch = (ele: any) => {
    console.log(ele.target.innerText.toLowerCase());
    
    switch (ele.target.innerText.toLowerCase()) {
      case 'your work': dispatch(updateContentTabName(ele.target.innerText)); break;
      case 'projects': 
        dispatch(projects(!runtimeHeader.projects.isClicked));
        dispatch(updateContentTabName(ele.target.innerText)); 
        break;
      case 'filters': 
        dispatch(filters(!runtimeHeader.filters.isClicked));
        dispatch(updateContentTabName(ele.target.innerText));
        break;
      case 'dashboard': 
        dispatch(dashboard(!runtimeHeader.dashboard.isClicked));
        dispatch(updateContentTabName(ele.target.innerText));
        break;
      case 'teams': 
        dispatch(teams(!runtimeHeader.teams.isClicked));
        dispatch(updateContentTabName(ele.target.innerText)); 
        break;
      case 'plans': 
        dispatch(plans(!runtimeHeader.plans.isClicked));
        dispatch(updateContentTabName(ele.target.innerText)); 
        break;
      case 'apps': 
        dispatch(apps(!runtimeHeader.apps.isClicked));
        dispatch(updateContentTabName(ele.target.innerText)); 
        break;
      case 'create': 
        dispatch(updateContentTabName(ele.target.innerText)); 
        break;
    }
  }
  const appTitle: string = baseData.status === 'fulfilled' ? !baseData.data[0].appTitle? baseData.data[0].content[0].appTitle: '' : '';
  if (baseData.status !== 'pending') {

  }
  useEffect(() => {
    dispatcher()
    
  }, []);

  console.log(clickedTabName);
  return (<>

    <center>
      {baseData.status === 'pending' && <Skeleton height={'20vh'} width={'80%'} />}
      {baseData.status === 'pending' && <CardSkeliton />}
      {baseData.status === 'pending' && <Skeleton height={'20vh'} width={'80%'} />}
      {baseData.status === 'pending' && <CardSkeliton />}
      {baseData.status === 'pending' && <Skeleton height={'20vh'} width={'80%'} />}
    </center>
    {baseData.status === 'rejected' && <Error401 />}
    {baseData.status === 'fulfilled' && <>
      <div className={`flex p-4 space-x-3.5 border border-black`}>
        <div className={`space-x-3.5 p-1`}>
          <h2 className="" key={appTitle}> {appTitle} </h2>
        </div>
        <div className="flex space-x-3.5">
          {
            baseContent.body.headers.map((header: any) => (<div>

              {<Headers data={header} headerDispatch={headerDispatch} runtimeHeader={runtimeHeader} />}

            </div>))
          }
        </div>
      </div>
      <div className={`flex space-x-4 p-4 border border-black w-full`} aria-details="section">
        <div about="side nav bar" className={`border overflow-hidden min-w-[30%] p-2 ${clickedTabName.toLowerCase() === 'your work' || clickedTabName.toLowerCase() === 'create'? 'hidden': ''}`} aria-details="section">
          <CollapseFrame child={baseContent.body.section} />
          <hr />
          <CollapseFrame child={baseContent.body.footers} />
        </div>
        <div about="content" className="min-w-[80%] p-2">
          {componentArray[clickedTabName.toLowerCase()]}
        </div>
      </div>
    </>}
  </>)
}