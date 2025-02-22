import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Grid2, Skeleton } from '@mui/material';
import { deleteTaskThunk, getTaskThunk, getTimeline, updateListPopUpOpen, updateTaskID } from "../../store/createSlice.ts";
import { setAnswer, ws } from "../../socket/index.ts";
import styles from './common.module.css';
import { removeElement } from "./addItem.tsx";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Error401 } from "../../errors/error401.tsx";

const OpenView = () => {
  const openViewPopUp = useSelector((state: any) => state.common);
  const gTask = useSelector((state: any) => state.gTasks);
  const setView = useDispatch();
  const setFalse = () => setView(updateListPopUpOpen(false))

  const tags = ['span', 'span', 'div', 'p', 'p', 'p', 'p', 'p', 'p']

  return (
    <>
      <p onClick={setFalse} className="cursor-pointer p-4 w-fit hover:bg-gray-200 rounded-sm m-2">{<KeyboardBackspaceIcon />} Back to Results</p>
      {<Grid2 container spacing={2} sx={{
          '--Grid-borderWidth': '1px',
          borderTop: 'var(--Grid-borderWidth) solid',
          borderLeft: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
          borderRadius: '5px',
          '& > div': {
            borderRight: 'var(--Grid-borderWidth) solid',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
            borderRadius: '5px',
          },
        }}>
        <Grid2 size={{xs: 6, md: 8}} padding={'5px'}>
          {(gTask.data && gTask.data.length > 0)
            ? gTask.data.map((e: { [key: string]: string }) => {
              const prop = { ...e, tags, aside: '1' }
              if (e.fieldID === openViewPopUp.taskID)
                return (<>
                  {<TaskListComp {...prop} style={styles.tr} view={'true'} />}
                </>)
            })
            : <>No Task Found!</>
          }
        </Grid2>
        <Grid2 size={{xs: 6, md: 4}} padding={'5px'}>
          {(gTask.data && gTask.data.length > 0)
            ? gTask.data.map((e: { [key: string]: string }) => {
              const prop = { ...e, tags, aside: '2' }
              if (e.fieldID === openViewPopUp.taskID)
                return (<>
                  {<TaskListComp {...prop} style={styles.tr} view={'true'} />}
                </>)
            })
            : <>No Task Found!</>
          }
        </Grid2>
      </Grid2>}

    </>
  )
}
const TaskListComp = React.forwardRef<HTMLTableCellElement, { [key: string]: string | Array<string> }>((props) => {
  const setView = useDispatch<any>();
  const { ID, summary, description, status, priority, endDate, fieldID, view, tags, aside } = props;
  const number = ID;
  const [summary1, setSummary] = useState(summary);
  const [description1, setDescription] = useState(description);
  const [status1, setStatus] = useState(status);
  const [priority1, setPriority] = useState(priority);
  const [extDate, setExtDate] = useState('');
  const [actualDate, setActualDate] = useState('');
  const [effortTime, setEffortTime] = useState('');


  const callDelete = (id: string) => {
    setView(deleteTaskThunk(id))
  };


  const sendUpdate = (obj: {[key: string]: string}) => {
    if (ws.readyState === 1) {
      ws.send(JSON.stringify(obj));
    }
  }
  const handleChange = (eve: any) => {
    if (eve.target.id === 'summary') {
      setSummary(eve.target.value);
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
    if (eve.target.id === 'extend') {
      setExtDate(eve.target.value);
    }
    if (eve.target.id === 'actualDate') {
      setActualDate(eve.target.value);
    }
    if (eve.target.id === 'effortTime') {
      setEffortTime(eve.target.value);
    }

    setTimeout(() => {
      const obj = {
        [eve.target.id]:eve.target.value, 
        fieldID,
        collection: 'tasks'
      };
      sendUpdate(obj as {[key: string]: string})
    }, 1000)
  }
  const fontWeight = view ? 'bold' : '';
  const color = view ? 'rgb(37, 150, 190)' : '';
  const snoBorder = view ? '0.3px solid black' : 'none';
  const noTD = view ? 'display: flex, align-items: center' : '';

  let td1 = React.createElement(
    tags[0],
    {
      id: `rID${ID}`,
      className: styles.td,
      style: { padding: '5px', margin: '2px', minWidth: '20px', maxWidth: '20px', borderRadius: '5px', noTD },
    },
    fieldID
  );
  let td2 = React.createElement(
    tags[1],
    { className: styles.td, style: { minWidth: '100%', maxWidth: '100%', fontWeight, color } },
    React.createElement(
      'textarea',
      {
        id: `summary`,
        className: styles.input,
        style: { padding: '5px', margin: '2px', minWidth: '90%', borderRadius: '5px' },
        value: summary1,
        type: 'text',
        onChange: handleChange
      },
    )
  );
  let td3 = React.createElement(
    tags[2],
    { className: styles.td, style: { minWidth: '100%', maxWidth: '100%', noTD } },
    React.createElement(
      'textarea',
      {
        id: `description`,
        className: styles.input,
        style: { padding: '5px', margin: '2px', minWidth: '100%', minHeight: 'min-content', borderRadius: '5px', border: 'none'},
        value: description1,
        onChange: handleChange
      },
    )
  );
  let td4 = React.createElement(  
    tags[3],
    { style: { minWidth: '100px', maxWidth: '150px', } },
    React.createElement(
      'select',
      {
        id: `status`,
        className: styles.input,
        style: { padding: '5px', margin: '2px', minWidth: '100%', maxWidth: '100%', borderRadius: '5px' },
        value: status1,
        onChange: handleChange
      },
      React.createElement("option", { value: "open" }, "Open"),
      React.createElement("option", { value: "inProgress" }, "In Progress"),
      React.createElement("option", { value: "review" }, "Review"),
      React.createElement("option", { value: "done" }, "Done"),
    )
  );
  let td5 = React.createElement(
    tags[4],
    { style: { minWidth: '100px', maxWidth: '150px' }, className: styles.td },
    React.createElement(
      'select',
      {
        id: `priority`,
        className: styles.input,
        style: { padding: '5px', margin: '2px', minWidth: '100%', maxWidth: '100%', borderRadius: '5px' },
        value: priority1,
        onChange: handleChange
      },
      React.createElement("option", { value: "blocker" }, "Blocker"),
      React.createElement("option", { value: "p1" }, "Priority 1"),
      React.createElement("option", { value: "p2" }, "Priority 2"),
      React.createElement("option", { value: "high" }, "High"),
      React.createElement("option", { value: "modrate" }, "Modrate"),
      React.createElement("option", { value: "low" }, "Low"),
    )
  );
  let td6 = React.createElement(
    tags[5],
    { style: { minWidth: '100px', maxWidth: '150px' }, className: styles.td },
    React.createElement(
      'input',
      {
        id: `endDate`,
        className: styles.input,
        style: { padding: '5px', margin: '2px', minWidth: '100%', maxWidth: '100%', borderRadius: '5px' },
        value: endDate,
        type: 'date',
        disabled: true,
      },
    )
  );
  let td7 = React.createElement(
    tags[6],
    { style: { minWidth: '100px', maxWidth: '150px' }, className: styles.td },
    React.createElement(
      'input',
      {
        id: `extend`,
        className: styles.input,
        style: { padding: '5px', margin: '2px', minWidth: '100%', maxWidth: '100%', borderRadius: '5px' },
        value: extDate,
        type: 'date',
        onChange: handleChange

      },
    )
  );
  let td8 = React.createElement(
    tags[7],
    {
      id: `view`,
      className: `cursor-pointer`,
      onClick: (e: any) => { setView(updateListPopUpOpen(true)); setView(updateTaskID(fieldID)) },
      style: { textAlign: 'center', borderRadius: '50px', hight: '50%' }
    },
    <KeyboardArrowRightIcon />
  );
  let td9 = React.createElement(
    tags[8],
    {
      id: `remove`,
      className: `${styles.td} cursor-pointer`,
      onClick: (e: any) => { callDelete(`${fieldID}`) },
      style: { backgroundColor: 'red', textAlign: 'center', borderRadius: '50px', hight: '50%', }
    },
    <>X</>
  );
  let Vtd1 = React.createElement(
    'p',
    { style: { minWidth: '100px', maxWidth: '150px' }, className: styles.td },
    React.createElement(
      'input',
      {
        id: `actualDate`,
        className: styles.input,
        style: { padding: '5px', margin: '2px', minWidth: '100%', maxWidth: '100%', borderRadius: '5px' },
        value: actualDate,
        type: 'date',
        onChange: handleChange

      },
    )
  );
  let Vtd2 = React.createElement(
    'p',
    { style: { minWidth: '100px', maxWidth: '150px' }, className: styles.td },
    React.createElement(
      'input',
      {
        id: `effortTime `,
        className: styles.input,
        style: { padding: '5px', margin: '2px', minWidth: '100%', maxWidth: '100%', borderRadius: '5px' },
        value: effortTime,
        type: 'number',
        onChange: handleChange

      },
    )
  );

  let elements = (
    <>
      {td1}
      {td2}
      {view ? td3 : ''}
      {td4}
      {td5}
      {td6}
      {td7}
      {view ? '' : td8}
      {view ? '' : td9}
    </>
  )

  let tr: React.ReactElement<any, string | React.JSXElementConstructor<any>>
  if (view) {
    if (aside === '1') {
      tr = React.createElement('div', { style: { minWidth: '100%' } },
      <>
        <p 
          // style={{ position: 'relative', display: 'flex' }}
        >
          <>
            <b>ID: </b>{td1}</><br/>
            <><b>Summary: </b><br/>{td2}</>
        </p><br/>
        <> <b>Description:</b> {td3}</>
      </>)
    }else {
      tr = React.createElement('div', { style: { minWidth: '100%' } }, 
      <>
        Status: {td4}
        Priority: {td5}
        Actual Completed Date: {Vtd1}
        Dead line: {td6}
        Extended Date: {td7}
        Effort time (In minutes): {Vtd2}
      </>)
    }
  } else {
    tr = React.createElement('tr', { id: `tr${number}`, className: styles.tr, style: { width: '100%', padding: '5px' } }, elements);
  }
  return tr;
});



export function Yourwork() {

  const openViewPopUp = useSelector((state: any) => state.common);
  const gTask = useSelector((state: any) => state.gTasks);
  const dispatch = useDispatch<any>();
  const dispatcher = () => {
    dispatch(getTaskThunk());
  }

  useEffect(() => {
    dispatcher()
  }, []);

  ws.onopen = () => {
    if (ws.OPEN) {
      ws.send('sending data')
      ws.onmessage = (eve: any) => {
        ws.send("working")
      }
    }
  };
  const tags = ['td', 'td', 'td', 'td', 'td', 'td', 'td', 'td', 'td']
  return (<>

    <center>
      {gTask.promiseStatus === 'pending' && (<><Skeleton height={'20vh'} width={'80%'} /><Skeleton height={'20vh'} width={'80%'} /></>)}
      {gTask.promiseStatus === 'pending' && <Skeleton height={'20vh'} width={'80%'} />}
      {gTask.promiseStatus === 'pending' && <Skeleton height={'20vh'} width={'80%'} />}
      {gTask.promiseStatus === 'rejected' && <>{gTask.code == 401 ? <Error401 /> : <>Something went wrong! < br /> It has {new String(gTask.promiseStatus)}</>}</>}
    </center>

    {openViewPopUp.listPopUpOpen && gTask.promiseStatus !== 'pending'  && <OpenView />}

    {!openViewPopUp.listPopUpOpen && gTask.promiseStatus === 'fulfilled' && <div style={{ width: '100%' }}>
      <table id="tableGroceListTable" style={{ minWidth: '100%' }}>
        <thead>
          <tr>
            <th id="sno">ID</th>
            <th>Summary</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Dead Line</th>
            <th>Extend date</th>
          </tr>
        </thead>
        <tbody>
          {(gTask.data && gTask.data.length > 0)
            ? gTask.data.map((e: { [key: string]: string }, i: number) => {
              const prop = { tags, ...e }
              return (<>
                {<TaskListComp {...prop} style={styles.tr} key={i as unknown as string} />}
              </>)
            })
            : <>No Tasks Created!</>
          }
        </tbody>
      </table>
    </div>}
  </>)

}