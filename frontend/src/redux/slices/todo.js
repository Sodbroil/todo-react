import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchTodo = createAsyncThunk('app/todo/fetchTodo', async () => {
	const { data } = await axios.get('/app/todo')
	return data
})

export const fetchNewTodo = createAsyncThunk('app/todo/fetchNewTodo', async (params) => {
	const { data } = await axios.post('/app/todo', params)
	return data
})

export const fetchRemoveTodo = createAsyncThunk('app/todo/fetchRemoveTodo', async (id) => {
	await axios.delete(`/app/todo/${id}`)
})

const initialState = {
	todo: {
		items: [],
		status: 'loading'
	},
	group: {
		items: [],
		status: 'loading'
	},
	comment: {
		items: [],
		status: 'loading'
	},
	status: {
		items: [],
		status: 'loading'
	}
}

const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {},
	extraReducers: {
		// Вывод задач
		[fetchTodo.pending]: (state) => {
			state.todo.items = []
			state.todo.status = 'loading'
		},
		[fetchTodo.fulfilled]: (state, action) => {
			state.todo.items = action.payload
			state.todo.status = 'loaded'
		},
		[fetchTodo.rejected]: (state) => {
			state.todo.items = []
			state.todo.status = 'error'
		},
		// Создание задачи
		[fetchNewTodo.pending]: (state) => {
			state.todo.items = []
			state.todo.status = 'loading'
		},
		[fetchNewTodo.fulfilled]: (state, action) => {
			state.todo.items = action.payload
			state.todo.status = 'loaded'
		},
		[fetchNewTodo.rejected]: (state) => {
			state.todo.items = []
			state.todo.status = 'error'
		},
		// Удаление задачи
		[fetchRemoveTodo.pending]: (state, action) => {
			state.todo.items = state.todo.items.filter(obj => obj._id === action.payload)
		},
		[fetchRemoveTodo.rejected]: (state) => {
			state.todo.status = 'error'
		}
	}
})

export const todoReducer = todoSlice.reducer
