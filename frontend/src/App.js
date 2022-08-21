// routes
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAuthMe, selectIsAuth } from './redux/slices/auth'
import Router from './routes'
// theme
import ThemeProvider from './theme'
// components
import ScrollToTop from './components/ScrollToTop'

// ----------------------------------------------------------------------

export default function App() {
	const dispatch = useDispatch()
	const isAuth = useSelector(selectIsAuth)

	React.useEffect(() => {
		dispatch(fetchAuthMe())
	}, [])

	return (
		<ThemeProvider>
			<ScrollToTop/>
			<Router/>
		</ThemeProvider>
	)
}
