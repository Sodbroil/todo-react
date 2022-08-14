import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchTodo = createAsyncThunk('app/todo/fetchTodo', async () => {
  const { data } = await axios.get('/app/todo');
  return data;
});

export const fetchNewTodo = createAsyncThunk('app/todo/fetchNewTodo', async (params) => {
  const { data } = await axios.post('/app/todo', params);
  return data;
});

const initialState = {
  todo: {
    items: [],
    status: 'loading',
  },
  group: {
    items: [],
    status: 'loading',
  },
  comment: {
    items: [],
    status: 'loading',
  },
  status: {
    items: [],
    status: 'loading',
  },
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTodo.pending]: (state) => {
      state.todo.items = [];
      state.todo.status = 'loading';
    },
    [fetchTodo.fulfilled]: (state, action) => {
      state.todo.items = action.payload;
      state.todo.status = 'loaded';
    },
    [fetchTodo.rejected]: (state) => {
      state.todo.items = [];
      state.todo.status = 'error';
    },
    [fetchNewTodo.pending]: (state) => {
      state.todo.items = [];
      state.todo.status = 'loading';
    },
    [fetchNewTodo.fulfilled]: (state, action) => {
      state.todo.items = action.payload;
      state.todo.status = 'loaded';
    },
    [fetchNewTodo.rejected]: (state) => {
      state.todo.items = [];
      state.todo.status = 'error';
    },
  },
});

export const todoReducer = todoSlice.reducer;
