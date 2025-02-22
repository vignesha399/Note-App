import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { apps, dashboard, filters, getBase, plans, projects, teams, updateContentTabName } from "../store/createSlice.ts";
import { Skeleton } from '@mui/material';
import { Headers } from "./home/header.tsx";
import { CollapseFrame } from "./fields/fields.tsx";
import { Timeline } from "./contents/timeline.tsx";
import { Yourwork } from "./contents/yourwork.tsx";
import { CreateList, CreateTask, TaskPopUp } from "./contents/create.tsx";
import { Error401 } from "../errors/error401.tsx";
import { Link } from "react-router-dom";

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
export let baseContentData = { id: '0' };

export function MySkeleton() {
  return (
    <center>
      <Skeleton height={'20vh'} width={'80%'} />
      <CardSkeliton />
      <Skeleton height={'20vh'} width={'80%'} />
      <CardSkeliton />
      <Skeleton height={'20vh'} width={'80%'} />
    </center>
  )
}
export function Home() {
  const baseData = useSelector((state: any) => state.baseReducer);
  const clickedTabName = useSelector((state: any) => state.common.contentTabName);
  const runtimeHeader = useSelector((state: any) => state.runtimeHeaders);
  const dispatch = useDispatch<any>();
  const componentArray: TReactArray = { 'timeline': <Timeline />, 'your work': <Yourwork />, 'create list': <CreateList />, 'create task': <CreateTask /> }
  const baseContent = baseData.data && baseData.data.content ? baseData.data.content[0] : baseData.data
  baseContentData = baseContent;
  const dispatcher = () => {
    dispatch(getBase());
  }

  const headerDispatch = (ele: any) => {

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
      case 'create list':
        dispatch(updateContentTabName(ele.target.innerText));
        break;
      case 'create task':
        dispatch(updateContentTabName(ele.target.innerText));
        break;
    }
  }
  const appTitle: string = baseData.status === 'fulfilled' ? !baseData.data.appTitle ? baseData.data.content.appTitle : '' : '';

  useEffect(() => {
    dispatcher();

  }, []);

  return (<>

    {baseData.status === 'pending' && <MySkeleton />}
    {baseData.status === 'rejected' && <Error401 />}
    {baseData.status === 'fulfilled' && <>
      <div className={`flex p-4 space-x-3.5 border border-black`}>
        <div className={`space-x-3.5 p-1`}>
          <h2 className="" key={appTitle}> {appTitle} </h2>
        </div>
        <div className="relative flex space-x-3.5 w-full">
          {
            baseContent.body.headers.map((header: any) => (<div>

              {<Headers data={header} headerDispatch={headerDispatch} runtimeHeader={runtimeHeader} />}

            </div>))
          }
          <div className="flex space-x-3.5 cursor-pointer p-1 bg-blue-800 hover:bg-blue-600 text-white rounded select-none">
            <TaskPopUp />
          </div>
          <p className="absolute inset-y-0 right-0 cursor-pointer p-1 hover:underline text-blue-700 rounded select-none">{<Link to="/login">login?</Link>}</p>
        </div>
      </div>
      <div className={`flex space-x-4 p-4 border border-black min-w-full`} aria-details="section">
        <div about="side nav bar" className={`border overflow-hidden min-w-[30%] p-2 ${clickedTabName.toLowerCase() === 'your work' || clickedTabName.toLowerCase() === 'create list' || clickedTabName.toLowerCase() === 'create task' ? 'hidden' : ''}`} aria-details="section">
          <CollapseFrame child={baseContent.body.section} />
          <hr />
          <CollapseFrame child={baseContent.body.footers} />
        </div>
        <div about="content" className={`p-2 ${clickedTabName.toLowerCase() === 'create list' || clickedTabName.toLowerCase() === 'create task' || clickedTabName.toLowerCase() === 'your work' ? 'min-w-full' : 'min-w-[80%]'}`}>
          {componentArray[clickedTabName.toLowerCase()]}
        </div>
      </div>
    </>}
  </>)
}