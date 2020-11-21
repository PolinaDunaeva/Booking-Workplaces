import React from 'react';
import Store from '../store/store.jsx';
import {BrowserRouter as Router} from 'react-router-dom';
import MainRouter from "./main/index.jsx";
import LoginPage from "../pages/login/index.jsx";
import {SnackbarProvider} from 'notistack';
import RequestInterceptor from '../helpers/request-interceptor';
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';

const theme = createMuiTheme({
	palette: {
		primary: {main: '#337ab7'},
		secondary: {main: '#DD0014'}
	}
});


function App() {
	const token = localStorage.getItem('key');
	if (!token) {
		return (
			<SnackbarProvider maxSnack={2}>
				<ThemeProvider theme={theme}>
					<LoginPage/>
				</ThemeProvider>
			</SnackbarProvider>
		)
	}
	return (
		<Store>
			<SnackbarProvider maxSnack={2}>
				<RequestInterceptor/>
				<ThemeProvider theme={theme}>
					<Router>
						<MainRouter/>
					</Router>
				</ThemeProvider>
			</SnackbarProvider>
		</Store>
	)
}


export default App;
