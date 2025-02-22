import { combineReducers, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { base, createTask, getTasks, loginUser, timeline, deleteTasks } from "../DB/api.ts";



interface ILogin {
  id: string,
  password: string,
  status?: number,
  data?: any,
}
export const getBase = createAsyncThunk('base', async () => {
  return await base();
})
export const login = createAsyncThunk<ILogin, ILogin>('login', async (cred: ILogin) => {
  let promise = await loginUser(cred.id, cred.password);

  return promise;
})
export const createTaskThunk = createAsyncThunk('createTaskThunk', async (cred: { [key: string]: string }) => {
  let promise = await createTask(cred);

  return promise;
})
export const getTaskThunk = createAsyncThunk('getTaskThunk', async () => {
  let promise = await getTasks();

  return promise;
})
export const deleteTaskThunk = createAsyncThunk('deleteTaskThunk', async (id: string) => {
  let promise = await deleteTasks(id);

  return promise;
})

export const getTimeline = createAsyncThunk('timeline', async () => {
  return await timeline();
})

const headerInitalState = {
  yourwork: { isClicked: false },
  projects: { isClicked: false },
  filters: { isClicked: false },
  dashboard: { isClicked: false },
  teams: { isClicked: false },
  plans: { isClicked: false },
  apps: { isClicked: false },
}


const getBaseDetails = createSlice({
  name: 'base',
  initialState: {
    status: '',
    code: 0,
    data: [],
  },
  reducers: {},

  extraReducers: (builder) => {

    builder.addCase(getBase.pending, (state, action) => {
      state.status = action.meta.requestStatus;

    })
      .addCase(getBase.rejected, (state, action) => {
        state.status = action.meta.requestStatus;
        let e = action.error.message?.split(' ')[action.error.message?.split(' ').length -1];
        state.code = e as unknown as number || 0;
      })
      .addCase(getBase.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = action.meta.requestStatus;
          const payloadResult: any = action.payload;
          state.data = payloadResult.data;
          localStorage.setItem('referenceID', payloadResult.data.id);
        }
      })
  }
});

const runtimeHeaders = createSlice({
  name: "headers",
  initialState: headerInitalState,
  reducers: {
    yourwork: (state, action) => void (state.projects.isClicked = action.payload),
    projects: (state, action) => void (state.projects.isClicked = action.payload),
    filters: (state, action) => void (state.filters.isClicked = action.payload),
    dashboard: (state, action) => void (state.dashboard.isClicked = action.payload),
    teams: (state, action) => void (state.teams.isClicked = action.payload),
    plans: (state, action) => void (state.plans.isClicked = action.payload),
    apps: (state, action) => void (state.apps.isClicked = action.payload),

    clicked: (state, _action) => {
      state.yourwork.isClicked = false;
      state.projects.isClicked = false;
      state.filters.isClicked = false;
      state.dashboard.isClicked = false;
      state.teams.isClicked = false;
      state.plans.isClicked = false;
      state.apps.isClicked = false;
    }
  }
})
const getTimelineDetails = createSlice({
  name: 'timeline',
  initialState: {
    status: 'pending',
    code: 0,
    data: [],
  },
  reducers: {
    content: (state, action) => {
      state.data = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTimeline.pending, (state, action) => {
      state.status = action.meta.requestStatus
    })
      .addCase(getTimeline.rejected, (state, action) => {
        state.status = action.meta.requestStatus
        let e = action.error.message?.split(' ')[action.error.message?.split(' ').length -1];
        state.code = e as unknown as number || 0;
      })
      .addCase(getTimeline.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = action.meta.requestStatus;
          const payloadResult: any = action.payload;
          state.data = payloadResult.data;
        }
      })
  }
})

let allRow: any[] = [];
const common = createSlice({
  name: 'common',
  initialState: {
    contentTabName: 'yourwork',
    allRow,
    listPopUpOpen: false,
    taskID: 0
  },
  reducers: {
    addRow: (state, action) => {
      state.allRow = action.payload;
    },
    updateContentTabName: (state, action) => {
      state.contentTabName = action.payload
    },
    updateListPopUpOpen: (state, action) => {
      state.listPopUpOpen = action.payload
    },
    updateTaskID: (state, action) => {
      state.taskID = action.payload
    }
  }
})
const auth = createSlice({
  name: 'authLogin',
  initialState: {
    token: '',
    isLogged: false,
    apiStatus: '',
    code: 0,
    number: 1
  },
  reducers: {
    setNumberIncrement: (state) => {
      state.number = state.number + 1
    },
    updateLogged: (state, action) => {
      if (action.payload) {
        state.isLogged = action.payload.logged;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(login.pending, (state, action) => {
      state.isLogged = false;
      state.apiStatus = action.meta.requestStatus;
    })
    builder.addCase(login.rejected, (state, action) => {
      state.isLogged = false;
      state.apiStatus = action.meta.requestStatus;
      
      let e = action.error.message?.split(' ')[action.error.message?.split(' ').length -1];
      state.code = e as unknown as number || 0;
    })
    builder.addCase(login.fulfilled, (state, action) => {
      const res = action.payload
      if (res.status === 200) {
        state.isLogged = true;
        state.code = res.status;
        state.apiStatus = action.meta.requestStatus;
        state.token = res.data.token;
      }
    })
  },
})

const getTask = createSlice({
  name: 'gtask',
  initialState: {
    promiseStatus: 'pending',
    code: 0,
    data: [{}]
  },
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(getTaskThunk.pending, (state, action) => {
      state.promiseStatus = action.meta.requestStatus;
    })
    builder.addCase(getTaskThunk.rejected, (state, action) => {
      state.promiseStatus = action.meta.requestStatus;
      let e = action.error.message?.split(' ')[action.error.message?.split(' ').length -1];
      state.code = e as unknown as number || 0;
    })
    builder.addCase(getTaskThunk.fulfilled, (state, action) => {
      state.promiseStatus = action.meta && action.meta.requestStatus;
      if (action.payload) {
        state.data = (action.payload.data)
      }
    })
  }
})
const deleteTask = createSlice({
  name: 'dtask',
  initialState: {
    promiseStatus: 'pending',
    code: 0,
    data: [{}]
  },
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(deleteTaskThunk.pending, (state, action) => {
      state.promiseStatus = action.meta.requestStatus;
    })
    builder.addCase(deleteTaskThunk.rejected, (state, action) => {
      state.promiseStatus = action.meta.requestStatus;
      let e = action.error.message?.split(' ')[action.error.message?.split(' ').length -1];
      state.code = e as unknown as number || 0;
    })
    builder.addCase(deleteTaskThunk.fulfilled, (state, action) => {
      state.promiseStatus = action.meta && action.meta.requestStatus;
      if (action.payload) {
        state.data = (action.payload.data)
      }
    })
  }
})
const reducers: any = combineReducers({
  baseReducer: getBaseDetails.reducer,
  runtimeHeaders: runtimeHeaders.reducer,
  timelineReducer: getTimelineDetails.reducer,
  common: common.reducer,
  authLogin: auth.reducer,
  gTasks: getTask.reducer,
  dTasks: deleteTask.reducer,
})



export const { updateLogged, setNumberIncrement } = auth.actions;
export const { updateContentTabName, addRow, updateListPopUpOpen, updateTaskID } = common.actions;
export const { content } = getTimelineDetails.actions;
export const { clicked, projects, apps, dashboard, filters, plans, teams } = runtimeHeaders.actions;
export default reducers;
