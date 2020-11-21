import {Switch, Route} from 'react-router-dom';
import React, {useContext, useEffect} from 'react';
import moment from 'moment';
import Header from '../header/index.jsx';
import Home from '../../pages/home/index.jsx';
import Planner from '../../pages/planner/index.jsx';
import Bookings from "../../pages/bookings/index.jsx";
import AdminOffice from "../../pages/office-admin/index.jsx";
import UserOffice from "../../pages/office-user/index.jsx";
import actionTypesUser from '../../store/action-types/user';
import actionTypesUsers from '../../store/action-types/users';
import actionTypesBookings from '../../store/action-types/bookings';
import actionTypesOffices from '../../store/action-types/offices';
import {Context} from '../../store/store.jsx';
import {withSnackbar} from 'notistack';
import ListUsers from "../../pages/list-of-users/index.jsx";
import ChangeRole from "../../pages/change-role/index.jsx";
import UserHistory from "../user-history/index.jsx";
import {CircularProgress} from "@material-ui/core";

function MainRouter({enqueueSnackbar}) {
    const {userState, userDispatcher} = useContext(Context).userContext;
    const {usersState, usersDispatcher} = useContext(Context).usersContext;
    const {bookingsState, bookingsDispatcher} = useContext(Context).bookingsContext;
    const {officesState,officesDispatcher}=useContext(Context).officesContext;

    useEffect(() => {
        userDispatcher({type: actionTypesUser.checkUser, enqueueSnackbar});
        bookingsDispatcher({type: actionTypesBookings.get, enqueueSnackbar});
        officesDispatcher({type: actionTypesOffices.get, enqueueSnackbar});
    }, []);

    useEffect(() => {
        usersDispatcher({type: actionTypesUsers.get, enqueueSnackbar, role: userState.role});
    }, [userState.role]);


    if (userState.loading || usersState.loading || bookingsState.loading) {
        return (
            <div style={{textAlign: "center"}}>
                <CircularProgress/>
            </div>
        );
    }

    let admins,hrs;
    if(usersState.list && usersState.list.length !== 0 && userState.role === 'admin') {
        admins = usersState.list.filter((user) => user.roles.includes('admin') ? user : null);
        hrs = usersState.list.filter((user) => user.roles.includes('hr') ? user : null);
    } else {
        admins =[];
        hrs = [];
    }

    let bookings = [],history= [];
    const curDate = moment();
    let office,officeAddress='',officePlace = '', date ='';

    if(bookingsState.list && bookingsState.list.length !== 0 && officesState.list && officesState.list.length !== 0) {
        bookingsState.list.forEach((booking) => {
            officePlace = booking.deskId + " desk, " + booking.floor + " floor";
            date = booking.date.format('dddd, DD MMMM YYYY');
            //console.log(booking.date.prototype.toDateString());
            if(booking.date.isAfter(curDate)){
                office = officesState.list.find((office) => office.id === booking.officeId);
                officeAddress = office.name + ', ' + office.city + ', ' +office.country;
                bookings.push({...booking, address: officeAddress, place: officePlace,dateForShow:date});
            } else {
                office = officesState.list.find((office) => office.id === booking.officeId);
                officeAddress = office.name + ', ' + office.city + ', ' +office.country;
                history.push({...booking, address: officeAddress, place: officePlace,dateForShow:date});
            }
        });
    } else {
        bookings =[];
        history = [];
    }

    return (
        <div>
            <Header userState={userState} usersState={usersState}/>
            <Switch>
                <Route exact path='/' render={() => <Home/>}/>
                <Route exact path='/planner' render={() => <Planner/>}/>
                <Route exact path='/bookings' render={() => <Bookings bookings={bookings} bookingsDispatcher={bookingsDispatcher} title={"My Bookings"} expanded={true}/>}/>
                <Route exact path='/booking-history' render={() => <Bookings bookings={history} title = {"Bookings history"} expanded={false}/>}/>
                <Route path='/office/:id' render={(props) => userState.role === 'admin' ? <AdminOffice {...props}/> :
                    <UserOffice {...props}/>}/>
                <Route exact path='/change' render={() => <ChangeRole usersState={usersState} admins={admins} hrs={hrs} enqueueSnackbar={enqueueSnackbar}/>}/>
                <Route exact path='/users' render={() => <ListUsers usersState={usersState}/>}/>
                <Route exact path='/history/:email' render={(props) => <UserHistory {...props} userState={userState} usersState={usersState} officesState={officesState} enqueueSnackbar={enqueueSnackbar}/>}/>
                <Route exact render={() => <h1>404 page</h1>}/>
            </Switch>
        </div>
    );
}

export default withSnackbar(MainRouter);

