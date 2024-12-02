import { combineReducers, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { base, loginUser, timeline } from "../DB/api.ts";




interface ILogin {
  id: string, 
  password: string,
  status?: number,
  data?: any,
}
export const getBase = createAsyncThunk('base', async () => {
  let promise = await base();
  console.log(promise);
  
  return promise;
})
export const login = createAsyncThunk<ILogin, ILogin>('login', async (cred: ILogin) => {
  let promise = await loginUser(cred.id, cred.password);
  console.log(promise);
  
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
    data: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    console.log(getBase.settled);
    
    builder.addCase(getBase.pending, (state, action) => {
      state.status = action.meta.requestStatus;
      console.log(action.meta.requestStatus);
      
    })
    .addCase(getBase.rejected, (state, action) => {
      console.log(action);
      state.status = action.meta.requestStatus;
    })
    .addCase(getBase.fulfilled, (state, action) => {
        console.log(action.meta.arg, action.meta.requestStatus, action.payload);
        if (action.payload) {
          state.status = action.meta.requestStatus;
          const payloadResult: any = action.payload;
          state.data = payloadResult.data.data;
        }
      })
  }
});

const runtimeHeaders = createSlice({
  name: "headers",
  initialState: headerInitalState,
  reducers: {
    yourwork: (state, action) => void(state.projects.isClicked = action.payload),
    projects: (state, action) => void(state.projects.isClicked = action.payload),
    filters: (state, action) => void(state.filters.isClicked = action.payload),
    dashboard: (state, action) => void(state.dashboard.isClicked = action.payload),
    teams: (state, action) => void(state.teams.isClicked = action.payload),
    plans: (state, action) => void(state.plans.isClicked = action.payload),
    apps: (state, action) => void(state.apps.isClicked = action.payload),

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
      })
      .addCase(getTimeline.fulfilled, (state, action) => {
        console.log(action);
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
    allRow
  }, 
  reducers: {
    addRow: (state, action) => {
      state.allRow.push(action.payload);
    },
    updateContentTabName: (state, action) =>{
      console.log(action)
      state.contentTabName = action.payload
    }
  }
})
const auth = createSlice({
  name: 'authLogin',
  initialState: {
    token: '',
    isLogged: false,
    number: 1
  },
  reducers: {
    setNumberIncrement: (state) => {
      
      console.log(state.number);
      state.number = state.number + 1
      console.log(state.number);
    },
    updateLogged: (state, action) => {
      console.log(action.payload);
      if(action.payload) {
        state.isLogged = action.payload.logged;
      }
    },
    // updateToken : (state, action) => {
    //   console.log(action.payload);
    //   if(action.payload) {
    //     state.token = action.payload;
    //     state.isLogged = true;
    //   };
    // }
  }, 
  extraReducers(builder) {
    builder.addCase(login.pending, (state) => {state.isLogged = false;})
    builder.addCase(login.rejected, (state) => {state.isLogged = false;})
    builder.addCase(login.fulfilled, (state, action) => {
      const res = action.payload
      const date = new Date(
        new Date().getFullYear() + 1,
        new Date().getMonth(),
        new Date().getDate(),
        new Date().getHours() + 1,
        new Date().getMinutes()
      );
      if(res.status === 200){
        state.isLogged = true;
        document.cookie = `session_token=${res.data.token}; expires=${date}; SameSite=localhost; Secure;Max-Age=${date};`;
        state.token = res.data.token;
      }
    })
  },
})
const reducers = combineReducers({
  baseReducer: getBaseDetails.reducer,
  runtimeHeaders: runtimeHeaders.reducer,
  timelineReducer: getTimelineDetails.reducer, 
  common: common.reducer, 
  authLogin: auth.reducer
})



export const { updateLogged, setNumberIncrement } = auth.actions;
export const { updateContentTabName, addRow } = common.actions;
export const { content } = getTimelineDetails.actions;
export const { clicked, projects, apps, dashboard, filters, plans, teams } = runtimeHeaders.actions;
export default reducers;
