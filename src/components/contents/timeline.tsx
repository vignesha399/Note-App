import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Skeleton } from '@mui/material';
import { getTimeline } from "../../store/createSlice.ts";

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

export function Timeline() {

  const timelineData = useSelector((state: any) => state.timelineReducer);
  const dispatch = useDispatch<any>();
  const dispatcher = () => {
    dispatch(getTimeline());
  }

  if (timelineData.status !== 'pending') {
    console.log(timelineData)


  }
  useEffect(() => {
    dispatcher()

  }, []);

  return (<>

    <center>
      {timelineData.status === 'pending' && (<><Skeleton height={'20vh'} width={'80%'} /><Skeleton height={'20vh'} width={'80%'} /></>)}
      {timelineData.status === 'pending' && <Skeleton height={'20vh'} width={'80%'} />}
      {timelineData.status === 'pending' && <Skeleton height={'20vh'} width={'80%'} />}
    </center>
    {timelineData.status === 'fulfilled' && <div style={{width: '100%'}}>
      <Skeleton height={'20vh'} width={'80%'} />
    </div>}
  </>)

}