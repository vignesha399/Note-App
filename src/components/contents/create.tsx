import React, { useCallback, useEffect, useInsertionEffect, useLayoutEffect, useRef, useState } from "react";
import { Table, TableBody, TableHead } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import { Skeleton } from '@mui/material';
import { addRow, getTimeline, setNumberIncrement } from "../../store/createSlice.ts";
import { Button } from "@mui/material";
import { AddItem, PrintPage } from "./addItem.tsx";

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

export function CreatedWork() {

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
    {timelineData.status === 'fulfilled' && <div style={{ width: '100%' }}>
      <Skeleton height={'20vh'} width={'80%'} />
      create
    </div>}
  </>)

}

export function CreateWork() {

  const creatework = useSelector((state: any) => state.baseReducer);
  const store = useSelector((state: any) => state.authLogin);
  const dispatch = useDispatch<any>();
  const dispatcher = () => {
    dispatch(getTimeline());
  }

  if (creatework.status === 'fulfilled') {
    console.log(creatework)
  }


  return (<>

    <center>
      {creatework.status === 'pending' && (<><Skeleton height={'20vh'} width={'80%'} /><Skeleton height={'20vh'} width={'80%'} /></>)}
      {creatework.status === 'pending' && <Skeleton height={'20vh'} width={'80%'} />}
      {creatework.status === 'pending' && <Skeleton height={'20vh'} width={'80%'} />}
    </center>
    {creatework.status === 'fulfilled' && <div style={{ width: '100%' }}>
      <ContentPage />
    </div>}
  </>)
}



export function ContentPage() {
  const allRow = useSelector((state: any) => state.common.allRow);
  const addAnotherRow = useDispatch();
  const [openPop, setOpenPop] = useState(false);
  // const tableGroceList = useRef('');
  const store = useSelector((state: any) => state.authLogin);
  
  
  
  let setDownloadPopUpTrue = () => {
    setOpenPop(true);
  };
  let addRows = () => {
    addAnotherRow(setNumberIncrement());
    addAnotherRow(addRow(<AddItem />));
  };
  
  useEffect(() => {
    if (allRow && allRow.length <= 0) {
      addAnotherRow(addRow(<AddItem />));
    }
    for (let index = 0; index < store.number; index++) {
      const element = store.number;
      console.log(element, index);
      
      
    }
  }, []);

  return (
    <>
      <center>
        <div id="tableGroceListDiv">
          <div id="downloaddiv">
            <h1 style={{ color: "black" }}>
              <center>Grocery List</center>
            </h1>
            <Table id="tableGroceListTable">
              <TableHead>
                <tr>
                  <th id="sno">S.No</th>
                  <th>item name</th> <th>quantity (Kg,g or unit)</th>
                  <th>price</th>
                  <th>total price</th>
                </tr>
              </TableHead>
              <TableBody id={"tableGroceList"}>

                {allRow && allRow.length > 0 && allRow}
              </TableBody>
            </Table>
            <p
              id="toA"
              style={{
                width: "100%",
                padding: "3px",
                "borderRadius": "5px",
                position: "relative",
                cursor: "default",
                right: "0px",
              }}
            >
              Total Amount = <span id="toAV"></span>
            </p>
          </div>
          <div id="buttonDiv">
            <Button
              style={{
                border: "1px solid darkred",
                width: "fit-content",
                padding: "3px",
                "borderRadius": "5px",
                cursor: "default",
              }}
              variant="contained"
              onClick={
                addRows
              }
            >
              Add item
            </Button>
            <Button
              style={{
                border: "1px solid darkred",
                width: "fit-content",
                padding: "3px",
                "borderRadius": "5px",
                cursor: "default",
              }}
              variant="contained"
              onClick={setDownloadPopUpTrue}
            >
              Download list
            </Button>
          </div>
          <div>
            {openPop && <PrintPage open={{ openPop, setOpenPop, typoGText: 'save as a PDF?', buttonName: 'Save PDF' }} />}
          </div>
        </div>
      </center>
    </>
  );
}

