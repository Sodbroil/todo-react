import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchGroup = createAsyncThunk('app/groups/fetchGroup', async () => {
	const { data } = await axios.get('/app/groups')
	return data
})

export const fetchNewGroup = createAsyncThunk('app/groups/fetchNewGroup', async (params) => {
	const { data } = await axios.post('/app/groups', params)
	return data
})

export const fetchRemoveGroup = createAsyncThunk('app/groups/fetchRemoveGroup', async (id) => {
	await axios.delete(`/app/groups/${id}`)
})

const initialState = {
	group: {
		items: [],
		status: 'loading'
	}
}

const groupSlice = createSlice({
	name: 'group',
	initialState,
	reducers: {},
	extraReducers: {
		// Получение группы
		[fetchGroup.pending]: (state) => {
			state.group.items = []
			state.group.status = 'loading'
		},
		[fetchGroup.fulfilled]: (state, action) => {
			state.group.items = action.payload
			state.group.status = 'loaded'
		},
		[fetchGroup.rejected]: (state) => {
			state.group.items = []
			state.group.status = 'error'
		},
		// Создание новой группы
		[fetchNewGroup.pending]: (state) => {
			state.group.items = []
			state.group.status = 'loading'
		},
		[fetchNewGroup.fulfilled]: (state, action) => {
			state.group.items = action.payload
			state.group.status = 'loaded'
		},
		[fetchNewGroup.rejected]: (state) => {
			state.group.items = []
			state.group.status = 'error'
		},
		// Удаление группы
		[fetchRemoveGroup.pending]: (state, action) => {
			state.group.items = state.group.items.filter(obj => obj._id === action.payload)
		},
		[fetchRemoveGroup.rejected]: (state) => {
			state.group.status = 'error'
		}
	}
})

export const groupReducer = groupSlice.reducer
