import { configureStore } from '@reduxjs/toolkit';
import { todoReducer } from './slices/todo';
import { authReducer } from './slices/auth';
import { groupReducer } from './slices/group';

const store = configureStore({
	reducer: {
		todo: todoReducer,
		auth: authReducer,
		group: groupReducer,
	},
});

export default store;
