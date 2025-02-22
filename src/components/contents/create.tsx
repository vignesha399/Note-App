import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Table, TableHead } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import { Skeleton } from '@mui/material';
import { addRow, createTaskThunk, getTimeline, setNumberIncrement } from "../../store/createSlice.ts";
import { Button } from "@mui/material";
import { PrintPage, removeElement, addSerialNum, calculate } from "./addItem.tsx";
import styles from './create.module.css';
import { color } from "html2canvas/dist/types/css/types/color";

export let updatedRows: any[] = [];
export let commonHook: any;
export function CreateList() {

  const createlist = useSelector((state: any) => state.baseReducer);
  const store = useSelector((state: any) => state.authLogin);
  const dispatch = useDispatch<any>();
  const dispatcher = () => {
    dispatch(getTimeline());
  }


  return (<>
    <center>
      {createlist.status === 'pending' && (<><Skeleton height={'20vh'} width={'80%'} /><Skeleton height={'20vh'} width={'80%'} /></>)}
      {createlist.status === 'pending' && <Skeleton height={'20vh'} width={'80%'} />}
      {createlist.status === 'pending' && <Skeleton height={'20vh'} width={'80%'} />}
    </center>
    {createlist.status === 'fulfilled' && <div style={{ width: '100%' }}>
      <ContentPage />
    </div>}
  </>)
}
export function cbUpdatedRows(updatedRow: any) {
  updatedRows = [...updatedRows, ...updatedRow];
  commonHook(addRow(updatedRows));

}
const PriceCell = React.forwardRef<HTMLTableCellElement, { number: number, calculate: (eleId: string) => void }>((props, ref) => {
  const { number, calculate } = props;

  let td1 = React.createElement(
    'td',
    {
      id: `sno${number}`,
      className: styles.td,
    },
    number
  );
  let td2 = React.createElement(
    'td',
    {
      id: `itemname${number}`,
      className: styles.td,
      contentEditable: true
    },
  );
  let td3 = React.createElement(
    'td',
    {
      id: `quantity${number}`,
      className: styles.td,
      contentEditable: true,
      inputMode: 'numeric',
      onInputCapture: _ => calculate(`quantity${number}`)
    },
  );
  let td4 = React.createElement(
    'td',
    {
      id: `price${number}`,
      className: styles.td,
      contentEditable: true,
      inputMode: 'numeric',
      onInputCapture: _ => calculate(`price${number}`)
    },
  );
  let td5 = React.createElement(
    'td',
    {
      id: `total${number}`,
      className: styles.td
    },
  );
  let td6 = React.createElement(
    'td',
    {
      id: `delt${number}`,
      className: styles.td,
      onClick: (e: any) => removeElement(`quantity${number}`, cbUpdatedRows),
      style: { backgroundColor: 'red', textAlign: 'center', borderRadius: '50px', hight: '50%' }
    },
    <>X</>
  );
  let elements = (
    <>
      {td1}
      {td2}
      {td3}
      {td4}
      {td5}
      {td6}
    </>
  )
  let tr = React.createElement('tr', { id: `tr${number}`, className: styles.tr }, elements);
  return tr;
});

export function ContentPage() {
  // const allRow = useSelector((state: any) => state.common.allRow);
  const common = useDispatch();
  commonHook = common;
  const [openPop, setOpenPop] = useState(false);
  let allrowArr: any[] = []
  const [allRow, setAllRow] = useState(allrowArr);
  const store = useSelector((state: any) => state.authLogin);
  let number: number = store.number;


  let setDownloadPopUpTrue = () => {
    setOpenPop(true);
  };

  let addElememts = () => {
    let tr = React.createElement(PriceCell, {
      number,
      calculate,
    });
    return tr;
  };

  const addRows = () => {
    common(setNumberIncrement());
    let r = addElememts();
    setAllRow((pre) => [...pre, r])
    // updatedRows = [...updatedRows, r];
    // common(addRow(updatedRows));
    setTimeout(addSerialNum, 1)
  }

  useEffect(() => {
    if (allRow && allRow.length <= 0) {
      // common(addRow(addElememts()));
      setAllRow(() => [addElememts()]);
    }
  }, [allRow]);


  return (
    <>
      <center>
        <div id={'tableGroceListDiv'} className={styles.tableGroceListDiv}>
          <div id={'downloaddiv'} className={styles.downloaddiv}>
            <h1 style={{ color: "black" }}>
              <center>Add Task</center>
            </h1>
            <Table id="tableGroceListTable">
              <TableHead>
                <tr>
                  <th id="sno" className={styles.th}>S.No</th>
                  <th className={styles.th}>item name</th>
                  <th className={styles.th}>quantity (Kg,g or unit)</th>
                  <th className={styles.th}>price</th>
                  <th className={styles.th}>total price</th>
                </tr>
              </TableHead>
              <tbody id={"tableGroceList"}>
                {allRow && allRow.length > 0 && allRow}
              </tbody>
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



export function CreateTask() {

  const createtask = useSelector((state: any) => state.baseReducer);



  return (<>
    <center>
      {createtask.status === 'pending' && (<><Skeleton height={'20vh'} width={'80%'} /><Skeleton height={'20vh'} width={'80%'} /></>)}
      {createtask.status === 'pending' && <Skeleton height={'20vh'} width={'80%'} />}
      {createtask.status === 'pending' && <Skeleton height={'20vh'} width={'80%'} />}
    </center>
    {createtask.status === 'fulfilled' && <div style={{ width: '100%' }}>
      <TaskPopUp />
    </div>}
  </>)
}

export function ContentTask() {
  const allRow = useSelector((state: any) => state.common.allRow);
  const common = useDispatch();
  const [openPop, setOpenPop] = useState(false);
  const store = useSelector((state: any) => state.authLogin);
  let number: number = store.number;


  let setDownloadPopUpTrue = () => {
    setOpenPop(true);
  };
  let setDownloadPopUpFalse = () => {
    setOpenPop(false);
  };

  let addElememts = () => {
    let tr = React.createElement(PriceCell, {
      number,
      calculate,
    });
    return tr;
  };

  let addRows = () => {
    common(setNumberIncrement());
    common(addRow(addElememts()));
    setTimeout(addSerialNum, 1)
  }

  useEffect(() => {
    if (allRow && allRow.length <= 0) {
      common(addRow(addRows()));
    }
  }, []);

  return (
    <>
      <center>
        <div id={'tableGroceListDiv'} className={styles.tableGroceListDiv}>
          <div id={'downloaddiv'} className={styles.downloaddiv}>
            <h1 style={{ color: "black" }}>
              <center>Add Task</center>
            </h1>
            <Table id="tableGroceListTable">
              <TableHead>
                <tr>
                  <th id="sno" className={styles.th}>S.No</th>
                  <th className={styles.th}>item name</th>
                  <th className={styles.th}>quantity (Kg,g or unit)</th>
                  <th className={styles.th}>price</th>
                  <th className={styles.th}>total price</th>
                </tr>
              </TableHead>
              <tbody id={"tableGroceList"}>
                {/* {allRow && allRow.length > 0 && allRow} */}
              </tbody>
            </Table>
            <p
              id="toA"
              style={{
                width: "100%",
                padding: "3px",
                borderRadius: "5px",
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
          {<TaskPopUp />}
          <div>
          </div>
        </div>
      </center>
    </>
  );
}


export function TaskPopUp() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [taskName, setTaskname] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [endDate, setEndDate] = useState(Date);
  const popupRef = useRef(null);
  const dispatch = useDispatch<any>();
  const dispatcher = (formObj: { [key: string]: string }) => {
    dispatch(createTaskThunk(formObj));

  }


  const handleChange = (eve: any) => {
    if (eve.target.id === 'summary') {
      setTaskname(eve.target.value);
    }
    if (eve.target.id === 'description') {
      setDescription(eve.target.value);
    }
    if (eve.target.id === 'status') {
      setStatus(eve.target.value);
    }
    if (eve.target.id === 'priority') {
      setPriority(eve.target.value);
    }
    if (eve.target.id === 'date') {
      setEndDate(eve.target.value);
    }

  }
  const onError = (eve: React.SyntheticEvent<HTMLInputElement, Event>) => {
    const event = eve.target as HTMLElement;
  }
  const emptyFunc = (errs: string[]) => {
    console.warn(errs)
  }

  const reset = () => {
    setTaskname('');
    setDescription('');
    setStatus('');
    setPriority('');
    setEndDate('');
  }

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    reset();
    setPopupVisible(false);
  };

  const onSubmit = (value: FormEvent<HTMLFormElement>) => {
    value.preventDefault();
    let val = value.target as HTMLElement;
    const obj = {
      summary: val[0].value,
      description: val[1].value,
      status: val[2].value,
      priority: val[3].value,
      endDate: val[4].value,
    }
    dispatcher(obj);
    closePopup()
  }


  return (
    <div>
      <button onClick={openPopup}>Create</button>

      {isPopupVisible && (
        <div className="popup" ref={popupRef}>
          <div className="popup-content">
            <form onSubmit={onSubmit} method="post" className={`text-black`}>
              <h1 style={{color: 'black'}}>Create</h1>
              <span className="close" onClick={closePopup}>&times;</span>
              <div className="inputDiv">
                <label htmlFor="summary">Summary </label>
                <input
                  key={'summury'}
                  id="summary"
                  type="text"
                  value={taskName}
                  onInputCapture={handleChange}
                  required
                  onBlur={onError}
                />
                {document.getElementById('summary')?.style.outlineColor === 'red' && <p style={{ color: 'red', fontSize: '12px' }}>{'This field is required'}</p>}
              </div>
              <div className="inputDiv">
                <label htmlFor="description">Description</label>
                <textarea
                  key={'description'}
                  id="description"
                  name="description"
                  value={description}
                  inputMode="text"
                  onInput={handleChange}
                  required
                />
              </div>
              <div className="inputDiv">
                <label htmlFor="status">Status</label>
                <select
                  itemType=""
                  name="status"
                  id="status"
                  key={'status'}
                  required
                  value={status}
                  onInputCapture={handleChange}
                  defaultValue={'open'}
                >
                  <option key={'open'} value={'open'}>Open</option>
                  <option key={'inprogress'} value={'inprogress'}>Inprogress</option>
                  <option key={'review'} value={'review'}>Review</option>
                  <option key={'done'} value={'done'}>Done</option>
                </select>
              </div>
              <div className="inputDiv">
                <label htmlFor="priority">Priority</label>
                <select
                  key={'priority'}
                  id="priority"
                  name="priority"
                  value={priority}
                  onInputCapture={handleChange}
                  defaultValue={'p1'}
                >
                  <option key={'blocker'} value={'blocker'}>Blocker</option>
                  <option key={'p1'} value={'p1'}>Priority 1</option>
                  <option key={'p2'} value={'p2'}>Priority 2</option>
                  <option key={'high'} value={'high'}>High</option>
                  <option key={'modrate'} value={'modrate'}>Modrate</option>
                  <option key={'low'} value={'low'}>Low</option>
                </select>
              </div>
              <div className="inputDiv">
                <label htmlFor="date">Dead line Date</label>
                <input type="date" name="date" id="date" value={endDate} onInput={handleChange} defaultValue={new Date().toString()} />
              </div>
              <div className="bottonDiv">
                <button type="submit">Create</button>
                <button type="button" onClick={closePopup}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        /* The Popup (background) */
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(91, 87, 87, 0.35); /* Semi-transparent background */
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
        }

        /* Popup Content */
        .popup-content {
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          text-align: center;
          width: 80%;
          max-width: 600px;
        }

        /* Close Button */
        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
          cursor: pointer;
        }

        .close:hover,
        .close:focus {
          color: black;
        }
        
        .inputDiv{
          position: relative;
          display: grid;
          width: min-content;
          margin: 10px
        }
        .inputDiv input{
          border: 1px solid black;
          padding: 3px;
          margin: 2px;
          border-radius: 5px;
          width: 400px;
          outline: blue;
        }
        .inputDiv textarea{
          border: 1px solid black;
          padding: 3px;
          margin: 2px;
          border-radius: 5px;
          width: 400px;
          outline: blue;
        }
        .inputDiv select{
          border: 1px solid black;
          padding: 3px;
          margin: 2px;
          border-radius: 5px;
          width: 200px;
          outline: blue;
        }
        .inputDiv input[type="date"]{
          border: 1px solid black;
          padding: 3px;
          margin: 2px;
          border-radius: 5px;
          width: 200px;
        }
        .inputDiv label{
          padding: 3px;
          margin: 2px;
          position: relative;
          text-align: left;
          color: black
        }
        .bottonDiv {
          width: 100%;
          display: flex;
          justify-content: right;
          align-items: center;
          position: relative;
          padding: 10px;
        }
        .bottonDiv button{
          position: relative;
          right:0px;
          padding: 5px 8px 5px 8px;
          margin: 0 20px 0 10px;
          border-radius: 5px;
        }
        .bottonDiv button[type="submit"]{
          background-color: blue;
          color: white;
        }
        .bottonDiv button[type="button"]{
          background-color: lightgrey;

        }
      `}</style>
    </div>
  );
};

