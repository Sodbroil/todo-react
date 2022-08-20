import 'simplebar/src/simplebar.css'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import store from './redux/store'

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<HelmetProvider>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</HelmetProvider>
)
