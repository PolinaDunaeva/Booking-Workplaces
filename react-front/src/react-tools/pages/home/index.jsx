import React, {useContext, useEffect} from 'react';
import {Typography, CircularProgress} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Context} from '../../store/store.jsx';
import actionTypesOffices from "../../store/action-types/offices";
import {withSnackbar} from 'notistack';
import Toolbar from '@material-ui/core/Toolbar';
import HistoryIcon from '@material-ui/icons/History';
import BookIcon from '@material-ui/icons/Book';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Button from "@material-ui/core/Button";

import block from 'bem-cn-lite';
import './home.less';

const b = block('home');

let sections = [
    { title: 'My Bookings',icon: (<BookIcon className={b('icon')}/>), url: '/bookings' },
    { title: 'Booking history',icon: (<HistoryIcon className={b('icon')}/>), url: '/booking-history' }
];

/**
 * @return {boolean}
 */
function Home({enqueueSnackbar}) {

    const {officesState, officesDispatcher} = useContext(Context).officesContext;
    const {userState} =useContext(Context).userContext;

    useEffect(() => {
        officesDispatcher({type: actionTypesOffices.get, enqueueSnackbar});
    }, []);

    if (officesState.loading) {
        return <div className={b('loader')}>
            <CircularProgress/>
        </div>
    }

    if(userState.role === 'hr' && !sections[2]){
        sections.push({ title: 'My Subordinates',icon: (<PeopleAltIcon className={b('icon')}/>), url: '/users' });
    }

    return (
        <React.Fragment>
        <Toolbar component="nav" variant="dense" className={b('toolbar-secondary')}>
            {sections.map((section) => (
                <Link key={section.title} variant="body2" to={section.url} className={b('link')}>
                    <Button variant="outlined" className={b('button-toolbar')}> {section.title} {section.icon}  </Button>
                </Link>
            ))}
        </Toolbar>
        <div className={b('container')}>
            <Typography variant="h6" className={b('choose')}>Choose office</Typography>
            {officesState.list.map((item, index) => (
                <Link key={index} to={`/office/${item.id}`} className={b('link')}>
                    <div  className={b('office')} onClick={() => localStorage.setItem('officeId', item.id)}>{item.country}, {item.city}, {item.name}</div>
                </Link>
            ))}
        </div>
        </React.Fragment>
    )
}

export default withSnackbar(Home);