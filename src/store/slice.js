import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userInfo: null,
  tasks: null,
};

export const slice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { setUser, setTasks, setUserInfo } = slice.actions;

export default slice.reducer;
