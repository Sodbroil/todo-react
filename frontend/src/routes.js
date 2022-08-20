import * as React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
// layouts
import DashboardLayout from './layouts/dashboard'
import LogoOnlyLayout from './layouts/LogoOnlyLayout'
//
import GroupOne from './pages/GroupOne'
import Group from './pages/Group'
import Todo from './pages/Todo'
import Login from './pages/Login'
import NotFound from './pages/Page404'
import Register from './pages/Register'
import TodoOne from './pages/TodoOne'

// ----------------------------------------------------------------------

export default function Router() {
	return useRoutes([
		// {
		//   path: '/dashboard',
		//   element: <DashboardLayout />,
		//   children: [
		//     { path: 'app', element: <DashboardApp /> },
		//     { path: 'user', element: <Todo /> },
		//     { path: 'products', element: <Products /> },
		//     { path: 'blog', element: <Blog /> },
		//   ],
		// },
		// {
		//   path: '/',
		//   element: <LogoOnlyLayout />,
		//   children: [
		//     { path: '/', element: <Navigate to="/dashboard/app" /> },
		//     { path: 'login', element: <Login /> },
		//     { path: 'register', element: <Register /> },
		//     { path: '404', element: <NotFound /> },
		//     { path: '*', element: <Navigate to="/404" /> },
		//   ],
		// },
		// { path: '*', element: <Navigate to="/404" replace /> },
		{
			path: '/',
			element: <Navigate to='/auth/login' replace />
		},
		{
			path: '/auth',
			element: <LogoOnlyLayout />,
			children: [
				{ path: 'login', element: <Login /> },
				{ path: 'register', element: <Register /> },
				{ path: '404', element: <NotFound /> }
			]
		},
		{
			path: '/app',
			element: <DashboardLayout />,
			children: [
				{ path: 'todo', element: <Todo /> },
				{ path: 'todo/:id', element: <TodoOne /> },
				{ path: 'groups', element: <Group /> },
				{ path: 'groups/:id', element: <GroupOne /> }
			]
		},
		{ path: '*', element: <Navigate to='/404' replace /> }
	])
}
