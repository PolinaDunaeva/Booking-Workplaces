import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {
	AppBar,
	Toolbar,
 	IconButton,
 	Typography,
	CircularProgress

} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {withSnackbar} from 'notistack';

import block from 'bem-cn-lite';

import './header.less';
import Dashboard from "../Admin-sidebar/index.jsx";
import Search from "./search/index.jsx";

const b = block('header');

function Header ({enqueueSnackbar, userState, usersState}) {

	const [searchValue, setSearchValue] = useState('');

	let logout = () => {
		localStorage.removeItem('key');
		document.location.href="/";
	};

	if (userState.loading || usersState.loading){
		return (
			<div className={b('loader')}>
				<CircularProgress/>
			</div>
		)
	}

	let admin_sidebar = '';

	if (userState.role === 'admin') {
		admin_sidebar = <Dashboard />;
	}

	return (
		<div className={b()}>
			<AppBar position="static">
				<Toolbar className={b()}>
					<Link to="/" className={b('link')}>
						<Typography variant="h5" className={b('title')}>
							Booking
						</Typography>
					</Link>
						{admin_sidebar}
					<div className={b('fill')}/>
					<Search usersState={usersState} searchValue={searchValue} setSearchValue={setSearchValue}/>
					<Typography className={b('userInfo')}>
						{userState.email}
					</Typography>
					<IconButton edge="end" className={b()} color="inherit" aria-label="logout" onClick={logout}>
						<ExitToAppIcon/>
					</IconButton>
				</Toolbar>
			</AppBar>

		</div>
	)
}


export default withSnackbar(Header);
